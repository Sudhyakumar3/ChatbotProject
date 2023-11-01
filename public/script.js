// JavaScript code
const chat = document.getElementById('chat');
const userMessageInput = document.getElementById('user-message');
const sendButton = document.getElementById('send');
const typingIndicator = document.getElementById('typing-indicator');

typingIndicator.style.display = 'none';

appendMessage('Gordon Ramsey','Hey, Mate! Enter an assignment to get started!', 'chatgpt-message'); 

document.getElementById('chatForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const userInput = userMessageInput.value;

        // Show the typing indicator when the user sends a message
        typingIndicator.style.display = 'inline-block';


    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput })
    });

    const data = await response.json();
    // Hide the typing indicator when the response is received
    typingIndicator.style.display = 'none';

    appendMessage('You', userInput, 'user-message');
    appendMessage('Gordon Ramsey', data.message, 'chatgpt-message');
    userMessageInput.value = '';
});

function appendMessage(sender, message, messageClass) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', messageClass);
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chat.appendChild(messageDiv);
}


