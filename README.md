# 📚 Library Management System

## <a name="introduction">🎉 Introduction</a>

The **Library Management System** is a web-based application designed to efficiently manage a library's collection. Administrators can add books with detailed information, including their exact locations within the library. Users can search for books to find their availability and location.

> 🛠️ **Note:** This project was developed during my military service period without any internet access. I contributed to both the **frontend** and **backend** development, utilizing Bootstrap for the UI and LiteSQL for data management.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Backend:**
  - Node.js
  - Express.js
  - LiteSQL

- **Frontend:**
  - EJS (Embedded JavaScript Templates)
  - HTML/CSS
  - JavaScript
  - Bootstrap

- **Environment Management:**
  - dotenv

## <a name="features">🔋 Features</a>

👉 **Admin Login:**
- Single admin login using credentials defined in the `.env` file.
- No password creation or password hashing – admin username and password are hardcoded for simplicity.

👉 **Book Management:**
- Add new books with details like title, author, genre, and exact location within the library.
- Edit or delete existing book entries.
- View a comprehensive list of all books in the library.

👉 **Search Functionality:**
- Search for books by title, author, or genre.
- Quickly locate books and check their availability.

👉 **Dashboard Overview:**
- Visual representation of library statistics.
- Quick access to recent activities and alerts.

## <a name="prerequisites">🔧 Prerequisites</a>

Ensure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## <a name="installation">🚀 Installation</a>

1. **Clone the repository:**
    ```bash
    git clone https://github.com/YousifMHelal/Library.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd Library
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Configure environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```env
    PORT=5000
    DATABASE_URL=your_litesql_database_path
    ADMIN_USERNAME=your_admin_username
    ADMIN_PASSWORD=your_admin_password
    ```

5. **Start the application:**
    ```bash
    npm start
    ```

6. **Access the application:**

    Open your browser and navigate to `http://localhost:5000`

## <a name="usage">📘 Usage</a>

- **Admin Dashboard:**
  - Log in using the admin credentials stored in the `.env` file.
  - Navigate through the dashboard to manage books and view library statistics.

- **Book Management:**
  - Add new books with detailed information.
  - Edit or delete existing book entries.
  - View a comprehensive list of all books in the library.

- **Search Functionality:**
  - Search for books by title, author, or genre.
  - Quickly locate books and check their availability.

---

## <a name="note">📌 Important Note</a>

This project was created under unique circumstances—during my military service—with **no internet access** or external help. I independently worked on both the **frontend** and **backend** of the system, utilizing **Bootstrap** for the UI and **LiteSQL** for data management. This experience honed my skills in self-reliance, problem-solving, and full-stack development.
