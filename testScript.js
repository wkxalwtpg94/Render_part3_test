require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
console.log("MongoDB URI:", url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

    const noteSchema = new mongoose.Schema({
      content: String,
      important: Boolean
    }, { collection: 'notes' });

    const Note = mongoose.model('Note', noteSchema);

    Note.find({})
      .then(notes => {
        console.log("Notes retrieved from database:", notes);
        mongoose.connection.close();
      })
      .catch(err => {
        console.error("Error retrieving notes:", err);
        mongoose.connection.close();
      });
  })
  .catch(err => console.error("Error connecting to MongoDB:", err));