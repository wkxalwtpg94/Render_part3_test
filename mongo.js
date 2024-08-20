const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("give password as argument")
    process.exit(1)

}


const password = process.argv[2]

const url = 
`mongodb+srv://wkxalwtpg94:${password}@cluster0fso.gnlueui.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0fso`

mongoose.set("strictQuery", false)


mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model("Note", noteSchema)



Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })




/*
const note = new Note({
    content: "Why is this not working hmm",
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })

*/