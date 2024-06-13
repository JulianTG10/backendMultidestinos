const mysql = require('mysql2/promise');

async function connect() {
  try {
    const connection = await mysql.createConnection({
        host: 'localhost', 
      user: 'root', 
      password: "", 
      database: 'multidestinos_express', 
    });
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
}

module.exports = connect;
