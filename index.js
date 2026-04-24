const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//base de datos
const db = new sqlite3.Database('./Inventario.db', (err) => {
    if (err) console.error(err.message);
    else console.log('conectado a SQLITE');
});

//crear tabla
db.run(`CREATE TABLE IF NOT EXISTS productos ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    precio INTEGER,
    stock INTEGER
)`);

//------Crud-----

//Create

app.post(`/productos`, (req, res) => {
    const { nombre, Precio, stock} = req.body;
    db.run(
        'INSERT INTO productos (nombre, Precio, stock) VALUES (?, ?, ?)',
        [nombre, Precio, stock],
        function(err) {
            if(err) return res.status(500).send(err.message);
            res.send('producto registrado');
        }
    );
});

//READ
app.get(`/productos`, (req, res) => {
    db.all('SELECT * FROM productos',[], (err, rows) =>{
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

app.put(`/productos/:id`, (req, res) => {
    const { nombre, Precio, stock} = req.body;
    db.run(
        'UPDATE productos SET nombre=?, Precio=?, stock=? WHERE id=?',
        [nombre, Precio, stock, req.params.id],
        function(err){
            if (err) return res.status(500).send(err.message);
            res.send('producto actualizado')
        }
    );
});

//DELETE
// DELETE corregido
app.delete(`/productos/:id`, (req, res) => {
    db.run('DELETE FROM productos WHERE id=?', [req.params.id], function(err) {
        if(err) return res.status(500).send(err.message);
        res.send('Producto eliminado'); 
    });
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});

