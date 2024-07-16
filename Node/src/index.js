import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {pool} from "./db.js"

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'No se proporcionó un token' });
  }

  jwt.verify(token, 'tu_secreto_jwt', (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Token inválido' });
    }
    req.userId = decoded.id_usuario;
    next();
  });
};

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hola mundo </h1>')
})

app.get('/ping', async (req, res) => {
    const result = await pool.query('SELECT "hello world" as RESULT');
    console.log(result)
    res.status(200).send('<h1>Hola mundo 2</h1>')
})

  app.get('/getprestatarios', verifyToken, async (req, res) => { //Obtiene los prestatarios de un usuario por su token
    try {
      // SQL query para obtener todos los prestatarios del usuario autenticado
      const query = 'SELECT * FROM prestatario WHERE id_prestamista = ?';
      const [rows] = await pool.execute(query, [req.userId]);
  
      res.status(200).json({ prestatarios: rows });
    } catch (err) {
      console.error('Error al obtener los prestatarios:', err); // Imprime el error en la consola para depuración
      res.status(500).json({ error: 'Error al obtener los prestatarios', details: err.message });
    }
  });

  app.post('/getPrestamos', verifyToken, async (req, res) => { //Obtiene los prestamos de cada prestatario por su ID
    const { idPrestatario } = req.body;
  
    try {
      // SQL query para obtener todos los préstamos del prestatario
      const query = 'SELECT * FROM prestamo WHERE id_prestatario = ?';
      const [rows] = await pool.execute(query, [idPrestatario]);
  
      res.status(200).json({ prestamos: rows });
    } catch (err) {
      console.error('Error al obtener los préstamos:', err); // Imprime el error en la consola para depuración
      res.status(500).json({ error: 'Error al obtener los préstamos', details: err.message });
    }
  });

  app.delete('/prestatario/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    let connection;
  
    try {
      // Obtenemos una conexión de la pool
      connection = await pool.getConnection();
  
      // Iniciamos la transacción
      await connection.beginTransaction();
  
      // Primero, eliminamos todos los préstamos asociados al prestatario
      const deletePrestamosQuery = 'DELETE FROM prestamo WHERE id_prestatario = ?';
      const [prestamosResult] = await connection.execute(deletePrestamosQuery, [id]);
  
      console.log(`Se eliminaron ${prestamosResult.affectedRows} préstamos asociados al prestatario.`);
  
      // Luego, eliminamos al prestatario
      const deletePrestatarioQuery = 'DELETE FROM prestatario WHERE id_prestatario = ?';
      const [prestatarioResult] = await connection.execute(deletePrestatarioQuery, [id]);
  
      if (prestatarioResult.affectedRows > 0) {
        // Si todo salió bien, confirmamos la transacción
        await connection.commit();
        res.status(200).json({ 
          message: 'Prestatario eliminado exitosamente',
          prestamosEliminados: prestamosResult.affectedRows
        });
      } else {
        // Si no se encontró el prestatario, revertimos la transacción
        await connection.rollback();
        res.status(404).json({ error: 'Prestatario no encontrado' });
      }
    } catch (err) {
      console.error('Error al eliminar el prestatario:', err);
      // Si ocurre cualquier error, revertimos la transacción
      if (connection) await connection.rollback();
      res.status(500).json({ error: 'Error al eliminar el prestatario', details: err.message });
    } finally {
      // Siempre liberamos la conexión al final
      if (connection) connection.release();
    }
  });
  
  app.post('/prestatario', verifyToken, async (req, res) => { //inserta un prestatario de el usuario tomandolo del token
    const { nombre, apellido, usuario, email, contrasena, telefono, Direccion, nota, imagen } = req.body;
  
    // Validaciones básicas
    if (!nombre || !apellido || !usuario || !email || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    try {
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(contrasena, 10);
  
      // SQL query para insertar el nuevo prestatario
      const query = `
        INSERT INTO prestatario (nombre, apellido, usuario, email, contrasena, telefono, Direccion, nota, imagen, id_prestamista, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;
      const values = [nombre, apellido, usuario, email, hashedPassword, telefono, Direccion, nota, imagen, req.userId];
  
      // Obtener una conexión del pool y ejecutar la consulta
      const [result] = await pool.execute(query, values);
  
      res.status(201).json({ message: 'Prestatario creado exitosamente', id_prestatario: result.insertId });
    } catch (err) {
      console.error('Error al crear el prestatario:', err); // Imprime el error en la consola para depuración
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'El usuario o el email ya existen' });
      }
      res.status(500).json({ error: 'Error al crear el prestatario', details: err.message });
    }
  });

  app.post('/crearprestamo', verifyToken, async (req, res) => {
    const { id_prestatario, tipo_prestamo, valor, intereses, cuotas, pago, fecha_prestamo, nota } = req.body;
  
    // Validaciones básicas
    if (!id_prestatario || !tipo_prestamo || !valor || !intereses || !cuotas || !pago || !fecha_prestamo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    try {
      // SQL query para insertar el nuevo préstamo
      const query = `
        INSERT INTO prestamo (id_usuario, id_prestatario, tipo_prestamo, valor, intereses, cuotas, pago, fecha_prestamo, nota, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `;
      const values = [req.userId, id_prestatario, tipo_prestamo, valor, intereses, cuotas, pago, fecha_prestamo, nota];
  
      // Obtener una conexión del pool y ejecutar la consulta
      const [result] = await pool.execute(query, values);
  
      res.status(201).json({ message: 'Préstamo creado exitosamente', id_prestamo: result.insertId });
    } catch (err) {
      console.error('Error al crear el préstamo:', err); // Imprime el error en la consola para depuración
      res.status(500).json({ error: 'Error al crear el préstamo', details: err.message });
    }
  });

app.post('/registro', async (req, res) => { //Recibe los datos de usuario y los inserta en la BD
    const { nombre, apellido, usuario, email, contrasena, imagen } = req.body;
  
    // Validaciones básicas
    if (!nombre || !apellido || !usuario || !email || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    try {
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(contrasena, 10);
  
      // SQL query para insertar el nuevo usuario
      const query = 'INSERT INTO usuario (nombre, apellido, usuario, email, contrasena, imagen, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())';
      const values = [nombre, apellido, usuario, email, hashedPassword, imagen];
  
      // Obtener una conexión del pool y ejecutar la consulta
      const [result] = await pool.execute(query, values);
  
      res.status(201).json({ message: 'Usuario creado exitosamente', id_usuario: result.insertId });
    } catch (err) {
      console.error('Error al crear el usuario:', err); // Imprime el error en la consola para depuración
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'El usuario o el email ya existen' });
      }
      res.status(500).json({ error: 'Error al crear el usuario', details: err.message });
    }
  });

  app.post('/login', async (req, res) => { //Verifica los datos de usuario y crea el token
    const { usuario, contrasena } = req.body;
  
    // Validaciones básicas
    if (!usuario || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    try {
      // SQL query para obtener el usuario por el nombre de usuario
      const query = 'SELECT * FROM usuario WHERE usuario = ?';
      const [rows] = await pool.execute(query, [usuario]);
  
      if (rows.length === 0) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
      }
  
      const user = rows[0];
  
      // Comparar la contraseña proporcionada con el hash almacenado
      const isMatch = await bcrypt.compare(contrasena, user.contrasena);
  
      if (!isMatch) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }
  
      // Generar un token JWT (puedes usar el payload que necesites)
       const token = jwt.sign(
         { id_usuario: user.id_usuario, usuario: user.usuario },
         'tu_secreto_jwt', // Reemplaza esto con una clave secreta segura
         { expiresIn: '30d' } // Token expira en 1 hora
       );
  
      res.status(200).json({ message: 'Login exitoso', token });
      //res.status(200).json({ message: 'Login exitoso'}); // Poner el de arriba cuando configure el token
    } catch (err) {
      console.error('Error en el login:', err); // Imprime el error en la consola para depuración
      res.status(500).json({ error: 'Error en el login', details: err.message });
    }
  });

  app.get('/usuario', verifyToken, async (req, res) => { //Verifica el token y manda los datos del perfil del usuario
    try {
      const query = 'SELECT nombre, usuario, email FROM usuario WHERE id_usuario = ?';
      const [rows] = await pool.execute(query, [req.userId]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error('Error al obtener los datos del usuario:', err);
      res.status(500).json({ error: 'Error al obtener los datos del usuario', details: err.message });
    }
  });



app.use((req, res) => {
    res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})