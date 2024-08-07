const express = require('express');
const initDbConnection = require('./db');

const app = express();
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    req.db = await initDbConnection();
    next();
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed', error: err });
  }
});

// CRUD Operations

// GET Customers
app.get('/customers', async (req, res) => {
  const [rows] = await req.db.execute('SELECT * FROM customers');
  res.json(rows);
});

// POST Customer
app.post('/customers', async (req, res) => {
  const { name, email, phone, address } = req.body;
  const [result] = await req.db.execute('INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)', [name, email, phone, address]);
  res.json({ message: 'Customer added successfully', id: result.insertId });
});

// PUT Customer
app.put('/customers/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  await req.db.execute('UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE customers_id = ?', [name, email, phone, address, id]);
  res.json({ message: 'Customer updated successfully' });
});

// DELETE Customer
app.delete('/customers/:id', async (req, res) => {
  const { id } = req.params;
  await req.db.execute('DELETE FROM customers WHERE customers_id = ?', [id]);
  res.json({ message: 'Customer deleted successfully' });
});

// GET Employees
app.get('/employees', async (req, res) => {
  const [rows] = await req.db.execute('SELECT * FROM employees');
  res.json(rows);
});

// POST Employee
app.post('/employees', async (req, res) => {
  const { name, email, phone, job_title } = req.body;
  const [result] = await req.db.execute('INSERT INTO employees (name, email, phone, job_title) VALUES (?, ?, ?, ?)', [name, email, phone, job_title]);
  res.json({ message: 'Employee added successfully', id: result.insertId });
});

// PUT Employee
app.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, job_title } = req.body;
  await req.db.execute('UPDATE employees SET name = ?, email = ?, phone = ?, job_title = ? WHERE employees_id = ?', [name, email, phone, job_title, id]);
  res.json({ message: 'Employee updated successfully' });
});

// DELETE Employee
app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  await req.db.execute('DELETE FROM employees WHERE employees_id = ?', [id]);
  res.json({ message: 'Employee deleted successfully' });
});

// GET Tasks
app.get('/tasks', async (req, res) => {
  const [rows] = await req.db.execute('SELECT * FROM tasks');
  res.json(rows);
});

// POST Task
app.post('/tasks', async (req, res) => {
  const { description, status, customer_id, employee_id, start_date, due_date } = req.body;
  const [result] = await req.db.execute('INSERT INTO tasks (description, status, customer_id, employee_id, start_date, due_date) VALUES (?, ?, ?, ?, ?, ?)', [description, status, customer_id, employee_id, start_date, due_date]);
  res.json({ message: 'Task added successfully', id: result.insertId });
});

// PUT Task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { description, status, customer_id, employee_id, start_date, due_date } = req.body;
  await req.db.execute('UPDATE tasks SET description = ?, status = ?, customer_id = ?, employee_id = ?, start_date = ?, due_date = ? WHERE tasks_id = ?', [description, status, customer_id, employee_id, start_date, due_date, id]);
  res.json({ message: 'Task updated successfully' });
});

// DELETE Task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await req.db.execute('DELETE FROM tasks WHERE tasks_id = ?', [id]);
  res.json({ message: 'Task deleted successfully' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
