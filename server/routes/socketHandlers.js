import ChatMessage from '../models/ChatMessage.js'; // Adjust the import path if necessary

let storedEmail = ''; // Use `let` to update the email value

const setupSocketEvents = (io) => {
  io.on('connection', (socket) => {
    // console.log('A user connected');

    // Handle storing the email when the user connects
    socket.on('storeEmail', ({ email }) => {
      storedEmail = email;
      // console.log('Email received and stored:', email);
    });

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
      // Use the stored email as the sender
      const sender = storedEmail;
      // console.log('Sender used in sendMessage:', sender);

      const newMessage = new ChatMessage({
        text: message.text,
        sender: sender, // Use the email as the sender
        timestamp: new Date(),
      });

      try {
        await newMessage.save();
        io.emit('receiveMessage', newMessage);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      // console.log('A user disconnected');
    });
  });
};

export default setupSocketEvents;
