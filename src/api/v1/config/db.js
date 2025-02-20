// const mongoose = require("mongoose");
// db = mongoose.connect(
//   "mongodb+srv://salman:salman@cluster0.hlhs9.mongodb.net/cupouchPets?retryWrites=true&w=majority",
//   (err) => {
//     console.log("Database connected");
//     if (err) {
//       console.log(err);
//     }
//   }
// );
// module.exports = { db };


// mongodb+srv://root:<db_password>@cluster0.qgqtao5.mongodb.net/
// cluster0.hlhs9.mongodb.net


const Sequelize = require("sequelize");

const db=new Sequelize('tidycarhire','root',null,{
    host:'127.0.0.1',port:'3306',dialect:'mysql'
});



// Test the database connection
db.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:');
    });

module.exports = db;
global.sequelize = db;




