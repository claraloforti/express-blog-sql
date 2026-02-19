const express = require('express');
const app = express();
const port = 3000;

// Importo middleware di gestiore errore 500
const errorsHandler = require("./middlewares/errorsHandler");
//Importo middleware di gestione errore 404
const notFound = require("./middlewares/notFound");

// Importo router delle ricette
const recipesRouter = require('./routers/recipes');

// Attivo cartella public per uso file statici
app.use(express.static('public'));

// Registro il body-parser per "application/json"
app.use(express.json());

// Rotta home
app.get('/', (req, res) => {
    res.send("<h1>Home blog</h1>")
})

// Istanza delle rotte per risorsa ricette
app.use("/ricette", recipesRouter)

// Registro middlewares di gestione errori 404 e 500
app.use(errorsHandler);
app.use(notFound);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})