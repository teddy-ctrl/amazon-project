# initial vite set up
npm create vite@latest
npm install
npm run dev

npm install react-bootstrap

# Header
npm install react-icons --save

# Carousel
npm i react-responsive-carousel



# Create firebase account 
npm install firebase




rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // This rule allows anyone with your Firestore database reference to view, edit,
    // and delete all data in your Firestore database. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Firestore database will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // all client requests to your Firestore database will be denied until you Update
    // your rules
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 6, 27);
    }
  }
}




rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Allow read/write if user is authenticated and owns the document
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Add other collections/rules as needed
  }
}