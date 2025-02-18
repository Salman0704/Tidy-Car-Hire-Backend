const mongoose = require("mongoose");
db = mongoose.connect(
  "mongodb+srv://salman:salman@cluster0.hlhs9.mongodb.net/cupouchPets?retryWrites=true&w=majority",
  (err) => {
    console.log("Database connected");
    if (err) {
      console.log(err);
    }
  }
);
module.exports = { db };


// mongodb+srv://root:<db_password>@cluster0.qgqtao5.mongodb.net/
// cluster0.hlhs9.mongodb.net