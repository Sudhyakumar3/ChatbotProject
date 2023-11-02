// Import required packages using npm
const express = require('express');
const app = express();
const OpenAI = require('openai');

// Initialize OpenAI with your API key
const openai = new OpenAI({ apiKey: 'API Key'}); // Replace 'API Key' with your API key

// Configure Express middleware
app.use(express.json());
app.use(express.static('public'));

// Handle POST requests to the '/api/chat' endpoint
app.post('/api/chat', async (req, res) => {
    const userInput = req.body.userInput;
    
    // Create a chat conversation with OpenAI
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a mean Gordon Ramsey." },
            { role: "user", content: userInput }
        ],
    });

    // Send the chatbot's response as a JSON object
    res.json({ message: response.choices[0].message.content });
});

// Define the port for the server to listen on
const PORT = 3000;

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
