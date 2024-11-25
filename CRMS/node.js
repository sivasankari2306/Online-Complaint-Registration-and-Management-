const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/complaint_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Complaint schema
const complaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  complaint: String,
  status: { type: String, default: 'Pending' }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

// Middleware
app.use(bodyParser.json());

// Register a complaint
app.post('/register-complaint', (req, res) => {
  const { name, email, complaint } = req.body;
  const newComplaint = new Complaint({ name, email, complaint });
  newComplaint.save()
    .then(complaint => res.json(complaint))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get all complaints
app.get('/get-complaints', (req, res) => {
  Complaint.find()
    .then(complaints => res.json(complaints))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});




