// Importo il file di connessione al database
const connection = require('./../data/db');
// Importo dati delle ricette
const recipesList = require('./../data/posts');


// GET 
function index(req, res) {
    // Preparo la query
    const sql = 'SELECT * FROM posts';

    // Eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}


// GET ottengo una ricetta
function show(req, res) {

    // Errore di prova per middleware errorsHandler
    // ciao();

    // Cerco la ricetta tramite ID
    const ricetta = recipesList.find(ricetta => ricetta.id === parseInt(req.params.id));

    // Se non trovo la ricetta
    if (!ricetta) {

        // Forzo lo stato di risposta a 404
        res.status(404);

        // Rispondo con oggetto di errore
        return res.json({
            error: "Not Found",
            message: "Ricetta non trovata"
        })
    }

    res.json(ricetta);
}


// POST creo nuova ricetta
function store(req, res) {
    const newId = Date.now();

    // Creo nuovo oggetto ricetta
    const newRecipe = {
        id: newId,
        title: req.body.title,
        image: req.body.image,
        tags: req.body.tags,
    }

    // Aggiungo la nuova ricetta alla lista ricette
    recipesList.push(newRecipe);


    // Restituisco status Created e la nuova ricetta
    res.status(201);
    res.json(newRecipe);
}


// PUT modifica integrale della ricetta
function update(req, res) {
    const ricetta = recipesList.find(ricetta =>
        ricetta.id === parseInt(req.params.id)
    )

    if (!ricetta) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Ricetta non trovata"
        })
    }

    // Aggiorno ricetta
    ricetta.title = req.body.title;
    ricetta.image = req.body.image;
    ricetta.tags = req.body.tags;

    res.json(ricetta);
}


// PATCH modifica parziale della ricetta
function modify(req, res) {
    const ricetta = recipesList.find(ricetta =>
        ricetta.id === parseInt(req.params.id)
    )

    if (!ricetta) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Ricetta non trovata"
        })
    }

    /* Aggiorno ricetta iterando sulle proprietà
    const properties = ['title', 'image', 'content', 'tags']
    properties.forEach(propertie => {
        if (req.body[propertie]) { // Se nella richiesta c'è quel campo
            ricetta[propertie] = req.body[propertie]; // sostituiscilo con quello presente
        }
    })*/

    // Altro modo che evita di creare l'array di proprietà
    for (let key in req.body) {
        ricetta[key] = req.body[key];
    }

    res.json(ricetta);
}


// DELETE rimuovo la ricetta
function destroy(req, res) {

    // Cerco ricetta tramite ID
    const ricetta = recipesList.find(pizza => pizza.id === parseInt(req.params.id));

    if (!ricetta) {
        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "Pizza non trovata"
        })
    }

    // Rimuovo ricetta dalla lista
    // Elimino il primo elemento a partire dall'indice
    recipesList.splice(recipesList.indexOf(ricetta), 1);

    // Forzo status No Content
    res.sendStatus(204)
}

// Esporto le funzioni del controller per poterle usare in router
module.exports = { index, show, store, update, modify, destroy }