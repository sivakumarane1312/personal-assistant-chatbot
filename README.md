

# 🤖 Personal Assistant Chatbot

An Express.js server-based chatbot powered by the **Gemini API** for AI responses and **Google Cloud Firestore** (via Firebase) for persistent conversation history. This project provides a full-stack, scalable foundation for building a modern web assistant.

---

## ✨ Features

* **Real-time AI Responses:** Uses the powerful `gemini-2.5-flash` model for fast, high-quality answers.
* **Persistent History:** Conversation history is securely saved to and retrieved from **Cloud Firestore** using the Firebase Admin SDK.
* **Modern UI:** Clean, responsive, and bubble-style chat interface built with pure HTML/CSS/JavaScript, branded as a "Personal Assistant."
* **Secure Configuration:** Uses environment variables (`.env`) to safely manage API keys and credentials.

---

## 🛠️ Technologies Used

* **Backend:** Node.js, Express.js
* **AI Model:** Google Gemini API (`@google/generative-ai` SDK)
* **Database:** Google Cloud Firestore (via `firebase-admin` SDK)
* **Configuration:** `dotenv`
* **Frontend:** HTML5, CSS3, JavaScript (Fetch API)



## Setup and Installation

### Prerequisites

You must have the following accounts/software installed locally:

* **Node.js** (v18+)
* **npm** (Node Package Manager)
* A **GitHub** account
* A **Google AI Studio** API Key
* A **Firebase Project** with a Cloud Firestore database enabled.

### Step 1: Clone the Repository

Clone this repository to your local machine:

```bash
git clone YOUR_REPOSITORY_URL_HERE
cd personal-assistant-chatbot
Step 2: Install Dependencies
Install the required Node.js packages:

Bash

npm install express body-parser cors dotenv firebase-admin @google/generative-ai
Step 3: Configure Environment Variables
Create a file named .env in the root of your project folder and add your Gemini API Key:

Code snippet

# Get your key from Google AI Studio
GEMINI_API_KEY=AIzaSy...your_gemini_api_key...
NOTE: Do NOT commit this file to GitHub! It is ignored by .gitignore.

Step 4: Configure Firebase Service Account
Go to your Firebase Console → Project settings → Service accounts tab.

Click "Generate new private key."

Rename the downloaded JSON file to serviceAccountKey.json and place it in the root of your project folder. NOTE: This file is also ignored by .gitignore and must not be committed.

Step 5: Start the Server
Run the application using Node.js:

Bash

node server.js
The server will start at http://localhost:3000.



💻 Usage

Open your browser and navigate to http://localhost:3000.

The application will automatically fetch and display your last 10 conversations from Firestore.

Type a message and hit Send. The server will: a. Call the gemini-2.5-flash model. b. Save the exchange to Firestore. c. Send the reply back to the UI.



💡 Future Enhancements

User Authentication: Implement Firebase Authentication to secure and separate chat history for individual users.

Streaming API: Update the /chat route to use the Gemini streaming API for a faster, more engaging typing effect in the UI.

Multimodal Input: Allow users to upload images, which can be sent to the Gemini model for analysis.

Custom Persona: Add a system instruction parameter to the Gemini API call to define a specific persona or knowledge base for the assistant.