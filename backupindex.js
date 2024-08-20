require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

const password = process.argv[2]

app.use(cors())
app.use(express.json())
app.use(express.static("dist"))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)


  const url = process.env.MONGODB_URI;
  console.log(process.env.MONGODB_URI); 
  
  mongoose.set('strictQuery',false)
  
  //mongoose.connect(url)
  
  mongoose.connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));
  
  
  
  
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
  }, { collection: 'notes' });
  
  noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


  const Note = mongoose.model('Note', noteSchema, "notes")
 



app.get("/", (request, response)=> {
    response.send("<h1>Hello World!</h1>")
})



app.get('/api/notes', (request, response) => {
  Note.find({}).then(result => {
    console.log(result)
    response.json(result);
    console.log("what is going on")
  }).catch(err => {
    console.error("Error retrieving notes:", err);
    response.status(500).json({ error: 'Internal server error' });
  });
});



app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
    response.json(note)
    } else {
    response.status(404).end()
    }
  })

 app.delete("/api/notes/:id", (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
 }) 

const generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => Number(n.id))) 
  : 0
  return String(maxId + 1)
}

app.post("/api/notes", (request, response) => {
  const body = request.body
  
  if (!body.content) {
    return response.status(400).json({
      error: "content missing"
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)
  console.log(note)
  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

