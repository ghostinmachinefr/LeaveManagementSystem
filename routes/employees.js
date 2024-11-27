const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all employees
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM employees';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get employee by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM employees WHERE id = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(row);
    });
});

// Create new employee
router.post('/', (req, res) => {
    const { name, position, salary } = req.body;
    const sql = 'INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)';
    db.run(sql, [name, position, salary], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            id: this.lastID,
            message: 'Employee added successfully'
        });
    });
});

// Update employee
router.put('/:id', (req, res) => {
    const { name, position, salary } = req.body;
    const sql = 'UPDATE employees SET name = ?, position = ?, salary = ? WHERE id = ?';
    db.run(sql, [name, position, salary, req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Employee updated successfully'
        });
    });
});

// Delete employee
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM employees WHERE id = ?';
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Employee deleted successfully'
        });
    });
});

module.exports = router;