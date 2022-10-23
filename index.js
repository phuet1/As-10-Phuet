const express = require('express')
const app = express()
const fs = require('fs');
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
 
const books = require('./db')
 
const saveBook = (data) => {
  let results = JSON.stringify(data);
  fs.writeFileSync("db.json", results)
}
 
app.get('/books', (req, res) => {
  res.send(books)
})
 
app.get('/books/:id', (req, res) => {
  res.send(books.find(x => x.id == req.params.id))
})
app.post('/books', (req, res) => {
  books.push(req.body)
  saveBook(books)
  res.status(201).json(req.body)
})
app.put('/books/:id', (req, res) => {
  const updateIndex = books.findIndex(X => X.id == req.params.id)
  Object.assign(books[updateIndex], req.body)
  saveBook(books)
  res.status(200).send()
})
app.delete('/books/:id', (req, res) => {
  const deleteIndex = books.findIndex(X => X.id == req.params.id)
  books.splice(deleteIndex, 1)
  saveBook(books)
  res.status(204).send()
})
app.listen(3000, () => {
  console.log('Start server at port 3000.')
})
