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
                <input id="nombre" placeholder="Ej: Laptop Lenovo">
                <input id="precio" type="number" placeholder="Ej: 2500">
                <input id="stock" type="number" placeholder="Ej: 10">
                <button id="guardar" class="btn-green">💾 Guardar</button>
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
            <tbody id="productos-tbody">
                <!-- Productos se cargarán aquí -->
            </tbody>
            </table>
        </div>

        <footer>
            © 2026 Sistema de Inventario - Node.js + Express + SQLite3
        </footer>

        </div>

        <script>
            const API_URL = 'http://localhost:3000/productos';

            async function cargarProductos() {
                try {
                    const response = await fetch(API_URL);
                    const productos = await response.json();
                    const tbody = document.getElementById('productos-tbody');
                    tbody.innerHTML = '';
                    productos.forEach(prod => {
                        const row = document.createElement('tr');
                        row.innerHTML = \`
                            <td>\${prod.id}</td>
                            <td>\${prod.nombre}</td>
                            <td>\${prod.precio}</td>
                            <td>\${prod.stock}</td>
                            <td class="actions">
                                <button class="btn-yellow" onclick="editarProducto(\${prod.id}, '\${prod.nombre}', \${prod.precio}, \${prod.stock})">✏️ Editar</button>
                                <button class="btn-red" onclick="eliminarProducto(\${prod.id})">🗑 Eliminar</button>
                            </td>
                        \`;
                        tbody.appendChild(row);
                    });
                } catch (error) {
                    console.error('Error cargando productos:', error);
                }
            }

            async function guardarProducto() {
                const nombre = document.getElementById('nombre').value;
                const precio = document.getElementById('precio').value;
                const stock = document.getElementById('stock').value;
                if (!nombre || !precio || !stock) return alert('Completa todos los campos');
                try {
                    await fetch(API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nombre, precio: parseInt(precio), stock: parseInt(stock) })
                    });
                    document.getElementById('nombre').value = '';
                    document.getElementById('precio').value = '';
                    document.getElementById('stock').value = '';
                    cargarProductos();
                } catch (error) {
                    console.error('Error guardando producto:', error);
                }
            }

            function editarProducto(id, nombre, precio, stock) {
                document.getElementById('nombre').value = nombre;
                document.getElementById('precio').value = precio;
                document.getElementById('stock').value = stock;
                document.getElementById('guardar').onclick = () => actualizarProducto(id);
                document.getElementById('guardar').textContent = '💾 Actualizar';
            }

            async function actualizarProducto(id) {
                const nombre = document.getElementById('nombre').value;
                const precio = document.getElementById('precio').value;
                const stock = document.getElementById('stock').value;
                if (!nombre || !precio || !stock) return alert('Completa todos los campos');
                try {
                    await fetch(\`\${API_URL}/\${id}\`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nombre, precio: parseInt(precio), stock: parseInt(stock) })
                    });
                    document.getElementById('nombre').value = '';
                    document.getElementById('precio').value = '';
                    document.getElementById('stock').value = '';
                    document.getElementById('guardar').onclick = guardarProducto;
                    document.getElementById('guardar').textContent = '💾 Guardar';
                    cargarProductos();
                } catch (error) {
                    console.error('Error actualizando producto:', error);
                }
            }

            async function eliminarProducto(id) {
                if (!confirm('¿Eliminar producto?')) return;
                try {
                    await fetch(\`\${API_URL}/\${id}\`, { method: 'DELETE' });
                    cargarProductos();
                } catch (error) {
                    console.error('Error eliminando producto:', error);
                }
            }

            document.getElementById('guardar').onclick = guardarProducto;
            window.onload = cargarProductos;
        </script>
    </body>
    </html>
    `);
});

app.listen(3001, () => {
    console.log('🔥 Servidor frontend en http://localhost:3001');
});