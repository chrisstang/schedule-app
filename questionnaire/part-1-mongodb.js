// Part 1: MongoDB

// Question 1
// Write a MongoDB query to find all documents in a collection where the "age" field is greater than 25.
db.users.find({ age: { $gt: 25 } })

// Question 2
// Write a MongoDB query to update the &quot;email&quot; field of a document with a specific ID.
db.users.updateOne({ _id: 1 }, { $set: { email: 'newemail@example.com' } })
