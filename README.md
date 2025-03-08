# Tech Debt Tracker

Welcome to **Tech Debt Tracker**, a full-stack CRUD application for managing technical debt in your projects! This app is designed to help development teams log, prioritize, and address technical debt efficiently.

---

## ✨ Features

- **Complete CRUD Functionality:**  
  Easily create, read, update, and delete tech debt entries.
  
- **Real-Time Updates:**  
  See your changes reflected instantly.

- **Tech Stack:**  
  - **Backend:** Node.js, Express, lowdb (for a lightweight JSON-based database), nodemon for auto-reloading  
  - **Frontend:** React with React-Bootstrap
---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/YourUsername/tech-debt-tracker.git
   cd tech-debt-tracker
   ```

2. **Backend Setup**

   Install backend dependencies from the project root:

   ```bash
   npm install
   ```

3. **Frontend Setup**

   Navigate to the frontend directory and install its dependencies:

   ```bash
   cd frontend
   npm install
   ```

4. **Configure the Database**

   Ensure that the `backend/db.json` file exists and contains valid JSON. For example, create or update `backend/db.json` with:

   ```json
   {
     "debts": []
   }
   ```

---

## 🔧 Running the Application

### Start the Backend

From the project root, run:

```bash
npm run dev
```

This command starts the backend server on port **5000** using nodemon.

### Start the Frontend

Open a new terminal, navigate to the `frontend` directory, and run:

```bash
npm start
```

This starts the React development server on port **3000** and should automatically open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

