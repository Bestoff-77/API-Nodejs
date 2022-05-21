const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());
app.use(cors());

// body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes'));


app.listen(3001, () => {
    console.log(`Express on port 3001`);
  });


  //  Reto final es generar la conxion entre mi back y mi base de datos
  
  // Repositorio de proyecto personal con la esctructura ya vista de el modulo back con node