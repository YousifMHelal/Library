const addRecordForm = document.getElementById("addRecordFormId");
const addBookButton = document.getElementById("addBookButtonId");
const overlayDiv = document.getElementById("overlayDivId");
const closeAddRecordFormButton = document.getElementById(
  "closeAddRecordFormButtonId"
);
const bookCategoryInput = document.getElementById("bookCategoryInputId");
const bookShelfSelect = document.getElementById("bookShelfSelectId");
const bookStandSelect = document.getElementById("bookStandSelectId");
const submitAddButton = document.getElementById("submitAddButtonId");
const bookQtyInput = document.getElementById("bookQtyInputId");
const bookNameInput = document.getElementById("bookNameInputId");
const booksTableBody = document.getElementById("booksTableBodyId");
const bookSerialInput = document.getElementById("bookSerialInputId");
const searchInput = document.getElementById("searchInputId");
const actionTd = document.getElementById("actionTdId");

const updateRecordForm = document.getElementById("updateRecordFormId");
const closeUpdateRecordFormButton = document.getElementById(
  "closeUpdateRecordFormButtonId"
);
const updateBookNameInput = document.getElementById("updateBookNameInputId");
const updateBookCategoryInput = document.getElementById(
  "updateBookCategoryInputId"
);
const updateBookStandSelect = document.getElementById(
  "updateBookStandSelectId"
);
const updateBookShelfSelect = document.getElementById(
  "updateBookShelfSelectId"
);
const updateBookSerialInput = document.getElementById(
  "updateBookSerialInputId"
);
const updateBookQtyInput = document.getElementById("updateBookQtyInputId");
const updateBookIdSpan = document.getElementById("updateBookIdSpanId");
const submitUpdateButton = document.getElementById("submitUpdateButtonId");

var params = {};

closeAddRecordFormButton.addEventListener("click", toggleAddRecordForm);
closeUpdateRecordFormButton.addEventListener("click", toggleUpdateRecordForm);
submitUpdateButton.addEventListener("click", submitUpdateBook);
addBookButton.addEventListener("click", () => {
  loadBookStandsSelectOptions(bookStandSelect);
  loadBookShelfsSelectOptions(bookShelfSelect);
  toggleAddRecordForm();
});

document.addEventListener("DOMContentLoaded", async () => {
  fillBooksTable();
});

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.trim();
  params.keyword = keyword === "" ? undefined : keyword;
  return fillBooksTable();
});

function toggleAddRecordForm() {
  resetFrom();
  addRecordForm.classList.toggle("d-none");
  overlayDiv.classList.toggle("d-none");
}

function toggleUpdateRecordForm() {
  updateRecordForm.classList.toggle("d-none");
  overlayDiv.classList.toggle("d-none");
}

submitAddButton.addEventListener("click", () => {
  const name = bookNameInput.value.trim();
  const category = bookCategoryInput.value.trim();
  const standId = bookStandSelect.options[bookStandSelect.selectedIndex].value;
  const shelfId = bookShelfSelect.options[bookShelfSelect.selectedIndex].value;
  const serial = bookSerialInput.value;
  const qty = bookQtyInput.value;

  if (name.length === 0) {
    return alert("اسم الكتاب فارغ");
  }

  if (category.length === 0) {
    return alert("التصنيف فارغ");
  }

  if (serial.length === 0) {
    return alert("المسلسل فارغ");
  }

  if (qty.length === 0) {
    return alert("الكمية فارغة");
  }

  axios
    .post("/api/book", { name, category, standId, shelfId, serial, qty })
    .then(() => {
      fillBooksTable();
      toggleAddRecordForm();
    })
    .catch(error => {
      console.log(error.message);
    });
});

async function fillBooksTable() {
  const role = await axios.get("/api/profile").then((response) => {
    return response.data.data.role;
  });

  role !== "admin" && addBookButton.classList.add("d-none");
  role !== "admin" && actionTd.classList.add("d-none");

  axios
    .get("/api/books", { params })
    .then((response) => {
      const books = response.data.data;
      booksTableBody.innerHTML =
        books.length === 0
          ? '<tr><td colspan="7">لا يوجد بيانات</td></tr>'
          : books.reduce((body, book) => {
              const record = `
            <tr>
                <td>${book.name}</td>
                <td>${book.category}</td>
                <td>${book.stand_name}</td>
                <td>${book.shelf_name}</td>
                <td>${book.serial}</td>
                <td>${book.qty}</td>
                ${
                  role === "admin"
                    ? `<td>
                  <i title="حذف" onclick="deleteRecordOnClick(${book.id})" class="bi bi-trash-fill ms-3 text-danger" style="cursor: pointer"></i>
                  <i title="تعديل" onclick="updateRecordOnClick(${book.id})" class="bi bi-pencil-square pointer ms-3 text-light" ></i>
                </td>`
                    : ""
                }
            </tr>`;
              return `${body}\n${record}`;
            }, "");
    })
    .catch(error => {
      console.log(error.message);
    } );
}

// function handleError(error) {
//   alert(error.response.data.message);
// }

function resetFrom() {
  bookNameInput.value = "";
  bookSerialInput.value = "";
  bookQtyInput.value = "";
  bookCategoryInput.value = "";
}

function submitUpdateBook() {
  const id = updateBookIdSpan.innerHTML;
  const name = updateBookNameInput.value.trim();
  const category = updateBookCategoryInput.value.trim();
  const shelfId =
    updateBookShelfSelect.options[updateBookShelfSelect.selectedIndex].value;
  const standId =
    updateBookStandSelect.options[updateBookStandSelect.selectedIndex].value;
  const serial = updateBookSerialInput.value.trim();
  const qty = updateBookQtyInput.value.trim();

  if (name.length === 0) {
    return alert("اسم الكتاب فارغ");
  }

  if (category.length === 0) {
    return alert("التصنيف فارغ");
  }

  if (serial.length === 0) {
    return alert("المسلسل فارغ");
  }

  if (qty.length === 0) {
    return alert("الكمية فارغة");
  }

  axios
    .put(`/api/book/${id}`, { name, category, shelfId, standId, serial, qty })
    .then(() => {
      fillBooksTable();
      updateRecordOnClick();
    })
    .catch((error) => console.log(error.message));
}

function deleteRecordOnClick(id) {
  axios.delete(`/api/book/${id}`).then(fillBooksTable).catch(error => {
    console.log(error.message);
  });
}

function updateRecordOnClick(id) {
  axios
    .get(`/api/book/${id}`)
    .then((response) => {
      const book = response.data.data;
      toggleUpdateRecordForm();
      (updateBookIdSpan.innerHTML = book.id),
        (updateBookNameInput.value = book.name),
        (updateBookCategoryInput.value = book.category),
        loadBookShelfsSelectOptions(
          updateBookShelfSelect,
          undefined,
          undefined,
          book.shelf_id
        );
      loadBookStandsSelectOptions(
        updateBookStandSelect,
        undefined,
        undefined,
        book.stand_id
      );
      (updateBookSerialInput.value = book.serial),
        (updateBookQtyInput.value = book.qty);
    })
    .catch(error => {
      console.log(error.message);
    });
}
