const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// FreshSales API configuration
const CRM_BASE_URL = 'https://nil1-744143548239753289.myfreshworks.com/crm/sales/api/contacts';
const CRM_API_KEY = 'v6ys-8l38_GW5A4finluOA';
const CRM_HEADERS = {
  'Authorization': `Token token=${CRM_API_KEY}`,
  'Content-Type': 'application/json'
};

// MySQL configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kmlk@1969',
  database: 'contact_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Endpoint to create a new contact
app.post('/contacts', async (req, res) => {
  const { first_name, last_name, email, mobile_number, data_store } = req.body;

  if (data_store === 'CRM') {
    try {
      const response = await axios.post(CRM_BASE_URL, {
        contact: {
          first_name,
          last_name,
          email,
          mobile_number
        }
      }, { headers: CRM_HEADERS });
      res.status(201).json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  } else if (data_store === 'DATABASE') {
    const sql = 'INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, email, mobile_number], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: result.insertId, first_name, last_name, email, mobile_number });
    });
  } else {
    res.status(400).send('Invalid data_store value.');
  }
});

// Endpoint to retrieve a contact
app.get('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { data_store } = req.query;

  if (data_store === 'CRM') {
    try {
      const response = await axios.get(`${CRM_BASE_URL}/${id}`, { headers: CRM_HEADERS });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  } else if (data_store === 'DATABASE') {
    const sql = 'SELECT * FROM contacts WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).send('Contact not found.');
      res.status(200).json(results[0]);
    });
  } else {
    res.status(400).send('Invalid data_store value.');
  }
});

// Endpoint to update a contact
app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { new_email, new_mobile_number, data_store } = req.body;

  if (data_store === 'CRM') {
    try {
      const response = await axios.put(`${CRM_BASE_URL}/${id}`, {
        contact: {
          email: new_email,
          mobile_number: new_mobile_number
        }
      }, { headers: CRM_HEADERS });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  } else if (data_store === 'DATABASE') {
    const sql = 'UPDATE contacts SET email = ?, mobile_number = ? WHERE id = ?';
    db.query(sql, [new_email, new_mobile_number, id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send('Contact updated successfully.');
    });
  } else {
    res.status(400).send('Invalid data_store value.');
  }
});

// Endpoint to delete a contact
app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { data_store } = req.query;

  if (data_store === 'CRM') {
    try {
      await axios.delete(`${CRM_BASE_URL}/${id}`, { headers: CRM_HEADERS });
      res.status(204).send();
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  } else if (data_store === 'DATABASE') {
    const sql = 'DELETE FROM contacts WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(204).send();
    });
  } else {
    res.status(400).send('Invalid data_store value.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
