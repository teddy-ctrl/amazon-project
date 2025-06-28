# 🛍️ Amazon Clone with Firebase

A full-stack clone of Amazon built using **React**, **Firebase**, and **Stripe** for payments. This project is ideal for learning how to build an e-commerce application using Firebase as the backend and authentication system.

> ⚠️ Disclaimer: This is a personal/educational project and not affiliated with Amazon or its subsidiaries in any way.

## 🔧 Features

- Firebase Authentication (Email/Password, Google Sign-In)
- Product listing and browsing
- Product search and filtering
- Shopping cart functionality
- Wishlist support
- Checkout simulation (with Stripe integration)
- Responsive design (mobile-friendly)
- Firebase Firestore for data storage
- Firebase Cloud Storage for image uploads

## 🛠️ Technologies Used

### Frontend
- React.js
- Redux Toolkit / Context API (for state management)
- Tailwind CSS / Material UI / Styled Components

### Backend / Services
- Firebase (Firestore, Auth, Cloud Storage)
- Stripe (optional for real payment flow)

### Tools & Libraries
- React Router v6
- Firebase SDK
- Axios or Fetch API
- dotenv for environment variables

## 📦 Project Structure

```
amazon-clone/
├── public/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── context/         # Firebase context setup
│   ├── utils/           # Helper functions
│   ├── App.js
│   └── main.js
├── README.md
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- npm or yarn
- Firebase project set up (with Firestore, Auth, Cloud Storage enabled)
- Stripe account (optional)
- Code editor (VSCode recommended)

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/teddy-ctrl/amazon-project.git
cd amazon-clone
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:

Create a Firebase project at [Firebase Console](https://console.firebase.google.com), then enable **Authentication**, **Firestore**, and **Cloud Storage**.

Generate a `firebaseConfig` object from **Project Settings > General > Your apps**.

Create a `.env` file in the root directory:
```env
# .env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in terminal) to view the app in your browser.

## 🧪 Testing

You can use tools like Jest or Cypress for testing. To run tests:
```bash
npm test
```
