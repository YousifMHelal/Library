import * as logger from "../../../utils/console.logger.js";
import { run } from "../../../utils/database.utils.js";
import { defined, greaterThanEqualOrThrow, notEmptyOrThrow } from '../../../utils/validation.utils.js';

export const viewLibraryPage = (_, response) => {
  response.render("../src/modules/library/views/library.view.ejs");
};

export const getCategories = (_, response) => {
  run("SELECT * FROM categories")
    .then((categories) => {
      return response.status(200).json({ success: true, data: categories });
    })
    .catch((error) => {
      logger.error(error.message);
      return response
        .status(500)
        .json({ success: false, message: error.message });
    });
};

export const getShelfs = (_, response) => {
  run("SELECT * FROM shelfs")
    .then((categories) => {
      return response.status(200).json({ success: true, data: categories });
    })
    .catch((error) => {
      logger.error(error.message);
      return response
        .status(500)
        .json({ success: false, message: error.message });
    });
};

export const getStands = (_, response) => {
  run("SELECT * FROM stands")
    .then((categories) => {
      return response.status(200).json({ success: true, data: categories });
    })
    .catch((error) => {
      logger.error(error.message);
      return response
        .status(500)
        .json({ success: false, message: error.message });
    });
};

export const addBook = (request, response) => {
  const { name, category, standId, shelfId, serial, qty } = request.body;
  run(
    "INSERT INTO books (name, category, stand_id, shelf_id, qty, serial) VALUES (?, ?, ?, ?, ?, ?)",
    [name, category, standId, shelfId, qty, serial]
  )
    .then(() => {
      response.status(200).json({
        success: true,
        message: "The book has been added successfully.",
      });
    })
    .catch((error) => {
      logger.error(error);
      response
        .status(500)
        .json({ success: false, message: "Internal server error." });
    });
};

export const deleteBooks = async (request, response) => {
  const { id } = request.params;

  run("DELETE FROM books WHERE id = ?", [id])
    .then(() => {
      response.status(200).json({ success: true, message: "" });
    })
    .catch((error) => {
      logger.error(error.message);
      response
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
};

export const getBooks = (request, response) => {
  const { keyword, category } = request.query;

  const andConditions = [];

  let params = [];
  let whereStatement = "";
  let paginationStatement = "";

  try {
    if (defined(keyword)) {
      notEmptyOrThrow(keyword, "Invalid keyword");
      andConditions.push({
        column: "b.name",
        operator: "LIKE",
        value: `CONCAT('%', ?, '%') OR b.category LIKE CONCAT('%', ?, '%')`,
        params: [keyword, keyword],
      });
    }
  } catch (error) {
    logger.error(error.message);
    return response
      .status(400)
      .json({ success: false, message: error.message });
  }

  if (andConditions.length > 0) {
    whereStatement = andConditions.reduce((statement, condition, index) => {
      const prefix = index === 0 ? "" : "AND";
      params = params.concat(condition.params);
      return `${statement} ${prefix} ${condition.column} ${condition.operator} ${condition.value}`;
    }, "WHERE");
  }

  const query = `SELECT b.id, b.name, b.category, b.qty, b.serial, s.name AS stand_name, sh.name AS shelf_name FROM books AS b
    INNER JOIN stands AS s ON s.id = b.stand_id
    INNER JOIN shelfs AS sh ON sh.id = b.shelf_id`;

  const selectStatement = `${query} ${whereStatement} ${paginationStatement}`;

  Promise.all([run(selectStatement, params)])
    .then(([books]) => {
      response.status(200).json({ success: true, message: "", data: books });
    })
    .catch((error) => {
      logger.error(error.message);
      response
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
};

export const getBook = (request, response) => {
  const { id } = request.params;

  run("SELECT * FROM books WHERE id = ?", [id])
    .then((books) => {
      response.status(200).json({ success: true, data: books[0] });
    })
    .catch((error) => {
      response.status(500).json({ success: false, message: error.message });
    });
};

export const updateBook = async (request, response) => {
  const { id } = request.params;
  const { name, category, shelfId, standId, serial, qty } = request.body;

  const changes = [];

  try {
    greaterThanEqualOrThrow(id, 1, "Missing or invalid book ID");
    const [{ count }] = await run("SELECT COUNT(*) AS count FROM books WHERE id = ?", [id]);
    if (count === 0) throw new Error("book not found");

    if (defined(name)) {
      notEmptyOrThrow(name, "Missing or invalid name");
      changes.push({ column: "name", value: "?", params: [name] });
    }

    if (defined(category)) {
      notEmptyOrThrow(category, "Missing or invalid category");
      changes.push({ column: "category", value: "?", params: [category] });
    }

    if (defined(shelfId)) {
      greaterThanEqualOrThrow(shelfId, 1, "Missing or invalid shelf ID");
      const shelfs = await run( "SELECT COUNT(*) AS count FROM shelfs WHERE id = ?", [shelfId]);
      if (shelfs.length === 0) throw new Error("shelf not found");
      changes.push({ column: "shelf_id", value: "?", params: [shelfId] });
    }

    if (defined(standId)) {
      greaterThanEqualOrThrow(standId, 1, "Missing or invalid stand ID");
      const stands = await run(
        "SELECT COUNT(*) AS count FROM stands WHERE id = ?",
        [standId]
      );
      if (stands.length === 0) throw new Error("stand not found");
      changes.push({ column: "stand_id", value: "?", params: [standId] });
    }

    if (defined(serial)) {
      notEmptyOrThrow(serial, "Missing or invalid serial");
      changes.push({ column: "serial", value: "?", params: [serial] });
    }

    if (defined(qty)) {
      greaterThanEqualOrThrow(qty, 1, "Missing or invalid qty");
      changes.push({ column: "qty", value: "?", params: [qty] });
    }

    if (changes.length === 0) throw new Error("No changes found");
  } catch (error) {
    logger.error(error.message);
    return response
      .status(400)
      .json({ success: false, message: error.message });
  }

  let params = [];
  const updateStatement = changes.reduce((statement, change, index) => {
    const prefix = index === 0 ? "" : ", ";
    params = params.concat(change.params ?? []);
    return `${statement} ${prefix} ${change.column} = ${change.value ?? "?"}`;
  }, "UPDATE books SET");

  params.push(id);
  run(`${updateStatement} WHERE id = ?`, params)
    .then(() => {
      response.status(200).json({ success: true, message: "" });
    })
    .catch((error) => {
      logger.error(error.message);
      response
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
};
