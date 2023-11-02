// JavaScript code

// Get references to HTML elements
const chat = document.getElementById('chat');
const userMessageInput = document.getElementById('user-message');
const sendButton = document.getElementById('send');
const typingIndicator = document.getElementById('typing-indicator');

// Hide the typing indicator initially
typingIndicator.style.display = 'none';

// Initialize the conversation with a greeting message
appendMessage('Gordon Ramsey', 'Hey, mate! What questions do you have for me?', 'chatgpt-message');

// Add a submit event listener to the chat form
document.getElementById('chatForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get the user's input message
    const userInput = userMessageInput.value;

    // Clear the user's input field
    userMessageInput.value = '';

    // Display the user's message in the chat
    appendMessage('You', userInput, 'user-message');

    // Show the typing indicator when the user sends a message
    typingIndicator.style.display = 'inline-block';

    // Send the user's message to the server for a response
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput })
    });

    // Get the response from the server
    const data = await response.json();
    
    // Hide the typing indicator when the response is received
    typingIndicator.style.display = 'none';

    // Display the chatbot's response in the chat
    appendMessage('Gordon Ramsey', data.message, 'chatgpt-message');
});

// Function to append a message to the chat container
function appendMessage(sender, message, messageClass) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', messageClass);
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chat.appendChild(messageDiv);
}
