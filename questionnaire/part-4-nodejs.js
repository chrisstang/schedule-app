// Part 4: Node.js

// Question 1
// Write a Node.js script that reads a CSV file and inserts the data into a MongoDB collection.
const fs = require('fs')
const csv = require('csv-parser')
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient('MONGGODB_CONNECTION_STRING')

client.connect(function (err) {
  const db = client.db('DB_NAME')
  const collection = db.collection('COLLECTION_NAME')

  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', function (row) {
      collection.insertOne(row, function (err, result) {
        if (err) throw err
        console.log('Inserted document successfully')
      })
    })
    .on('end', function () {
      client.close()
    })
})

// Question 3
// Write a Node.js function that takes a string as input and returns the number of words in the string.
function countWords(str) {
  const words = str.match(/\b\w+\b/g)
  return words ? words.length : 0
}
