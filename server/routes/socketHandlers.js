import ChatMessage from '../models/ChatMessage.js'; // Adjust the import path if necessary

const setupSocketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Fetch messages from the database and send to the client
    socket.on('fetchMessages', async () => {
      try {
        const messages = await ChatMessage.find().exec(); // Use async/await
        socket.emit('receiveMessages', messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    });

    // Handle incoming messages
    socket.on('sendMessage', async (message) => {
        const newMessage = new ChatMessage({
          text: message.text,
          sender: message.sender || 'anonymous',
          timestamp: new Date(),
        });
        await newMessage.save();
        io.emit('receiveMessage', newMessage);
      });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

export default setupSocketEvents;