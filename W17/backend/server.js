const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from any origin

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define route to serve employee data
app.get('/api/emps', (req, res) => {
  // Read emp.json file
  fs.readFile(path.join(__dirname, 'emp.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Unable to read data' });
    }
    try {
      // Parse JSON data and send it as response
      const emps = JSON.parse(data);
      console.log(emps);
      res.json(emps);
    } catch (parseErr) {
      console.error('Failed to parse JSON:', parseErr);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// Define port for the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
