// Part 2: Express

// Question 1
// Create an Express route that returns a list of all users in a MongoDB collection as a JSON response.
router.get('/users', (req, res) => {
  const users = User.find() // assume `User` model map the MongoDB collection
  res.json(users)
})

// Question 3
// Create an Express route that allows a user to upload a file to the server and save it to a specified directory.
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully' })
})
