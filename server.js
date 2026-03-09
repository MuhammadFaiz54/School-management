const app = require('./app');
const mongoose = require('mongoose');
const { connectMySQL } = require('./config/mysql');
require('dotenv').config();


// MongoDB connect karo
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.log('Error:', err));
connectMySQL()
// Server start karo
app.listen(5000, () => {
  console.log('Server port 5000 pe chal raha hai');
});
