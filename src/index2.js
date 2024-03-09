require("dotenv").config();
 
const port = process.env.PORT;
 
const express = require('express'); 
const app = express();
app.use(express.json());
	
app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

