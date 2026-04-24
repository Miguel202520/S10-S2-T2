const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Sistema de Inventario V</title>
        <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #f5f7fa;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 1100px;
            margin: auto;
        }

        h1 {
            text-align: center;
            margin-bottom: 5px;
        }

        .subtitle {
            text-align: center;
            color: #777;
            margin-bottom: 30px;
        }

        .card {
            background: #fff;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 25px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .card h2 {
            margin-bottom: 15px;
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr auto;
            gap: 10px;
            align-items: end;
        }

        input {
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #ccc;
        }

        button {
            padding: 10px 15px;
            border: none;
            border-radius: 8px;
            color: white;
            cursor: pointer;
        }

        .btn-green { background: #16a34a; }
        .btn-yellow { background: #facc15; color: black; }
        .btn-red { background: #dc2626; }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            background: #e5e7eb;
            padding: 10px;
        }

        td {
            padding: 10px;
            border-bottom: 1px solid #eee;
            text-align: center;
        }

        .actions button {
            margin: 2px;
        }

        footer {
            text-align: center;
            margin-top: 20px;
            color: #888;
        }
        </style>
    </head>

    <body>
        <div class="container">

        <h1>📦 Sistema de Inventario</h1>
        <p class="subtitle">Gestiona tus productos de manera fácil y rápida</p>

        <!-- FORMULARIO -->
        <div class="card">
            <h2>🟢 Nuevo Producto</h2>
            <div class="form-grid">
                <input placeholder="Ej: Laptop Lenovo">
                <input placeholder="Ej: 2500">
                <input placeholder="Ej: 10">
                <button class="btn-green">💾 Guardar</button>
            </div>
        </div>

        <!-- TABLA -->
        <div class="card">
            <h2>🔵 Lista de Productos</h2>
            <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Laptop Lenovo</td>
                <td>2500.00</td>
                <td>10</td>
                <td class="actions">
                    <button class="btn-yellow">✏️ Editar</button>
                    <button class="btn-red">🗑 Eliminar</button>
                </td>
            </tbody>
            </table>
        </div>

        <footer>
            © 2026 Sistema de Inventario - Node.js + Express + SQLite3
        </footer>

        </div>
    </body>
    </html>
    `);
});

app.listen(3000, () => {
    console.log('🔥 Servidor en http://localhost:3000');
});