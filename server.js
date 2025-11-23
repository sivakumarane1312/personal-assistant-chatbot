require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');

// --- 1. CONFIGURATION ---
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Serve the index.html from the public folder
app.use(express.static('public')); 

// --- 2. FIREBASE SETUP ---
// NOTE: Ensure your serviceAccountKey.json is in the root folder!
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// --- 3. GEMINI API SETUP ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// FINAL MODEL FIX: gemini-2.5-flash
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});


// --- 4. CHAT ROUTE (Saves and Replies) ---
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).send({ error: "Message is required" });
    }
    
    console.log("--- Sending request to Gemini... ---");
    console.log("User Message:", userMessage);

    try {
        // Step A: Generate AI Response using Gemini
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const botReply = response.text();

        console.log("Gemini Reply:", botReply);

        // Step B: Save conversation to Firebase
        await db.collection('chats').add({
            user_message: userMessage,
            bot_response: botReply,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });

        // Step C: Send response to frontend
        res.json({ reply: botReply });

    } catch (error) {
        // --- DETAILED ERROR LOGGING ---
        console.error("!!! GEMINI API ERROR !!!");
        console.error("Status:", error.status); 
        console.error("Details:", error.response ? JSON.stringify(error.response, null, 2) : error.message);
        
        res.status(500).send({ error: "AI Error: Check Terminal for details" });
    }
});


// --- 5. HISTORY ROUTE (Loads Past Chats) ---
app.get('/history', async (req, res) => {
    try {
        const snapshot = await db.collection('chats')
            .orderBy('timestamp', 'desc') // Get most recent first
            .limit(10)                    // Limit to last 10 messages
            .get();

        const history = [];
        snapshot.forEach(doc => {
            history.push(doc.data());
        });

        // Reverse the array to display oldest message at the top
        res.json(history.reverse());
    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).send({ error: "Failed to fetch chat history" });
    }
});


// --- 6. START SERVER ---
app.listen(port, () => {
    console.log(`Gemini Chatbot running at http://localhost:${port}`);
});