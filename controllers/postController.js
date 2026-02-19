// Importo il file di connessione al database
const connection = require('../data/db');
// Importo dati dei post
const postsList = require('../data/posts');


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


// GET ottengo un post
function show(req, res) {
    const id = parseInt(req.params.id)

    const sql = 'SELECT * FROM posts WHERE id = ?';

    // Preparo la query per i tag
    const tagsSql = `
    SELECT T.*
    FROM tags T
    JOIN post_tag PT ON T.id = PT.tag_id
    WHERE PT.post_id = ?
  `;

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });

        // Recupero il post
        const post = results[0];

        // faccio partire la seconda query di join se la prima ha avuto successo
        connection.query(tagsSql, [id], (err, tagsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // Aggiungo i tag al post
            post.tags = tagsResults;
            res.json(post);
        });

    });
}


// POST creo nuovo post
function store(req, res) {
    const newId = Date.now();

    // Creo nuovo oggetto post
    const newPost = {
        id: newId,
        title: req.body.title,
        image: req.body.image,
        tags: req.body.tags,
    }

    // Aggiungo il nuovo post alla lista
    recipesList.push(newPost);


    // Restituisco status Created e il nuovo post
    res.status(201);
    res.json(newPost);
}


// PUT modifica integrale del post
function update(req, res) {
    const post = postsList.find(post =>
        post.id === parseInt(req.params.id)
    )

    if (!post) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    // Aggiorno post
    post.title = req.body.title;
    post.image = req.body.image;
    post.tags = req.body.tags;

    res.json(post);
}


// PATCH modifica parziale del post
function modify(req, res) {
    const post = postsList.find(post =>
        post.id === parseInt(req.params.id)
    )

    if (!post) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    /* Aggiorno post iterando sulle proprietà
    const properties = ['title', 'image', 'content', 'tags']
    properties.forEach(propertie => {
        if (req.body[propertie]) { // Se nella richiesta c'è quel campo
            post[propertie] = req.body[propertie]; // sostituiscilo con quello presente
        }
    })*/

    // Altro modo che evita di creare l'array di proprietà
    for (let key in req.body) {
        post[key] = req.body[key];
    }

    res.json(post);
}


// DELETE rimuovo il post
function destroy(req, res) {

    // Recupero l'ID dall'URL
    const id = parseInt(req.params.id)

    const sql = 'DELETE FROM posts WHERE id = ?';

    // Elimino il post                  
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    });

}

// Esporto le funzioni del controller per poterle usare in router
module.exports = { index, show, store, update, modify, destroy }