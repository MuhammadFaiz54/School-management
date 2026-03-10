const app = require('./app');
const mongoose = require('mongoose');
const { connectMySQL, sequelize } = require('./config/mysql');
require('dotenv').config();


// MongoDB connect karo
// mongoose.connect(process.env.MONGO_URI, {
//   serverSelectionTimeoutMS: 5000
// })
//   .then(() => console.log('MongoDB connected ✅'))
//   .catch((err) => console.log('Error:', err));
connectMySQL()
// mysql
const tables = require('./models');
const seed_role_user_permission_data = require('./seeder/user_role_perm');
sequelize.sync({alter:true})
.then(async()=>{
  console.log('tables Ready')
 await seed_role_user_permission_data()
})
.catch(()=>console.log('Error in making table'))
// Server start karo
app.listen(5000, () => {
  console.log('Server port 5000 pe chal raha hai');
});
