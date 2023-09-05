const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const path = require('path');
const folderPath = 'E:'; 


// Middleware to create the 'text-files' folder if it doesn't exist
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

/**
 * Endpoint to create a text file with the current timestamp in the specified folder.
 * @route POST /createTextFile
 * @returns {string} - A success message or an error message.
 */
app.post('/createTextFile', (req, res) => {
  try {
    const currentTimestamp = new Date().toISOString();
    const fileName = `${currentTimestamp}.txt`;
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, currentTimestamp);

    res.status(201).json({ message: 'Text file created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Endpoint to retrieve a list of all text files in the specified folder.
 * @route GET /getTextFiles
 * @returns {string[]} - An array of text file names.
 */
app.get('/getTextFiles', (req, res) => {
  try {
    const textFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.txt'));
    res.status(200).json({ files: textFiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
