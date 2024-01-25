import mongoose from 'mongoose';
const MONGODB_URI =  'mongodb+srv://dishijain:0XFSpF35ZBZNkOR6@cluster0.rmg499r.mongodb.net/intellify?retryWrites=true&w=majority';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }
  
  let cachedConnection = null;
  
  export default async function dbConnect() {
    if (cachedConnection) {
      return cachedConnection;
    }
  
    if (!mongoose.connections[0]?.readyState) {
      await mongoose.connect(MONGODB_URI);
    }
  
    cachedConnection = mongoose.connection;
    return cachedConnection;
  }