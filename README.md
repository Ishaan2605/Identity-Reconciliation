

# 🧠 Identity Reconciliation API

This is a backend project designed to reconcile user identities across multiple sources using email and phone numbers. The goal is to intelligently group users that may have overlapping contact information and return a consolidated contact object with primary and secondary identifiers.

---

## 📌 Problem Statement

Modern applications often collect multiple contact details for the same person—across devices, apps, or forms. This leads to duplicate and fragmented identities.

> The goal is to reconcile these into a single primary contact while tracking all associated (secondary) entries.

---

## 📁 Project Folder Structure

```
IDENTITY-RECONCILIATION/
├── src/
│   ├── controllers/            # Handles request logic
│   ├── routes/                 # API routes
│   ├── services/               # Business logic
│   ├── utils/                  # Response formatting
│   └── app.ts                 # Express app entry point
│
├── prisma/
│   └── schema.prisma          # Prisma DB schema
│
├── dist/                      # Transpiled JS output
├── .env                       # Environment config (ignored in Git)
├── .env.example               # Example env file for setup
├── tsconfig.json              # TypeScript compiler config
├── package.json               # Project metadata & scripts
```

### Why this modular structure?

This structure makes debugging, testing, and scaling impossible in real-world engineering. This structure offers:

* **Scalability**: Easily add auth, validation, or caching later.
* **Separation of concerns**: Cleaner logic separation for better maintainability.
* **Reusability**: `services` and `utils` can be reused across multiple routes.
* **Best practices**: Follows modern backend architecture standards.

---

## ⚙️ Technologies Used

* **Node.js + Express** – REST API server
* **TypeScript** – Type safety
* **Prisma ORM** – Simplified DB access
* **PostgreSQL** (via **Supabase**) – Cloud-native relational DB
* **Render** – Full-stack deployment
* **Postman** – API testing and validation

---

## 🧪 Postman API Testing

### Endpoint

```
POST /identify
```

### Sample Request Format

```json
{
  "email": "example@gmail.com",
  "phoneNumber": "1234567890"
}
```

### Sample Response

```json
{
  "contact": {
    "primaryContactId": 5,
    "emails": [
      "example@gmail.com",
      "user1@gmail.com"
    ],
    "phoneNumbers": [
      "1234567890"
    ],
    "secondaryContactIds": [
      6, 7
    ]
  }
}
```


## 🚀 How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/identity-reconciliation.git
   cd identity-reconciliation
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file from example:

   ```bash
   cp .env.example .env
   ```

4. Add your **Supabase PostgreSQL URI** inside `.env`:

   ```
   DATABASE_URL="postgresql://postgres:<YOUR_PASSWORD>@<your-host>.supabase.co:5432/postgres"
   ```

5. Run migrations and generate Prisma client:

   ```bash
   npx prisma migrate dev
   ```

6. Start the server:

   ```bash
   npm run dev
   ```

---

## 🌐 Deployment on Render

* **Build Command**:

  ```bash
  npm install && npx prisma generate && npm run build
  ```

* **Start Command**:

  ```bash
  npm run start
  ```

* **Environment Variables**:

  * `DATABASE_URL` (same as in local)

---

## 📈 Design Decisions

* **Modular architecture** keeps the codebase maintainable and testable.
* **TypeScript** catches bugs early with static types.
* **Prisma** provides auto-generated types and powerful querying.
* **Supabase** gives a free hosted PostgreSQL instance with easy setup.
* **Render** allows simple Node+PostgreSQL deployments.

---

## 🧠 Why This Is the Best Approach

# Feature                   

| Scalable architecture       ✅             
| Clear separation of logic   ✅             
| Clean codebase              ✅             
| Easier debugging & testing  ✅             
| Best practices followed     ✅          

---

## 📮 Contact

Made with 💻 by **Ishaan Deshpande**

---

