

---


# 🛍️ FindProducts (product store.app)

A full-stack MERN (MongoDB, Express, React, Node) web application that allows users to browse, add, make deal if soldable product are the with the owner associated with that product and manage products. Users can log in via Google and manage their own products securely.

### 🔗 Live Demo
👉 [Visit the site](https://findproducts-2.onrender.com/)

---

## 🚀 Features

- 🔐 Google Authentication (OAuth)
- ✅ JWT-based user sessions
- 🛒 Product CRUD operations
- 🧑‍💼 Users can manage only their own products
- 🎨 Clean React.js frontend (Vite)
- 🌐 Deployed on Render

---

## 📁 Project Structure

```
Findproducts/
├── backend/              # Node.js + Express API
├── frontend/             # React.js client (Vite)
├── .env                  # Environment variables
├── package.json          # Root package file
└── node_modules/
```

---

## ⚙️ Tech Stack

- **Frontend:** React.js, Vite, Axios, Tailwind CSS (if used)
- **Backend:** Node.js, Express, Mongoose
- **Auth:** Google OAuth 2.0 + JWT
- **Database:** MongoDB Atlas
- **Deployment:** Render

---

## 🛠️ Installation & Setup

1. **Clone the repo**
```bash
git clone https://github.com/tilahungoito/Findproducts.git
cd Findproducts
```

2. **Setup the backend**
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Then run the server:
```bash
npm run dev
```

3. **Setup the frontend**
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Make sure your `.env` file in the backend contains:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
```

---

## 📦 API Endpoints

- `POST /api/auth/google` – Google login
- `GET /api/products` – Get all products
- `POST /api/products` – Create product (auth required)
- `PUT /api/products/:id` – Update product (auth required)
- `DELETE /api/products/:id` – Delete product (auth required)

---

## 📌 Todo / Future Features

- Image upload (Cloudinary, etc.)
- Pagination & filtering
- Admin dashboard
- User profiles

---

## 🧑 Author

Made with ❤️ by [Tilahun Goitom](https://github.com/tilahungoito)

---

## 🪪 License

This project is licensed under the MIT License.
```



