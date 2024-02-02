const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/productsRoutes');
const cartsRoutes = require('./routes/cartsRoutes');
const viewsRoutes = require('./routes/viewsRoutes');

const app = express();

app.use(bodyParser.json());

// Conexión a la base de datos
mongoose.connect('tu_url_de_conexion_a_mongo', { useNewUrlParser: true, useUnifiedTopology: true });

// Rutas
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/views', viewsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


