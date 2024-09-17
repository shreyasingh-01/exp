// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="post">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form submission and save data to a file
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  const formData = { name, email };
  
  // Define file path to save form data
  const filePath = path.join(__dirname, 'formData.json');
  
  // Write data to file
  fs.writeFile(filePath, JSON.stringify(formData, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing file');
    }
    res.send('Form data saved successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
