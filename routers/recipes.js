// Richiamo istanza di framework Express
const express = require('express')
// Creo istanza dell'oggetto rotte di Express
const router = express.Router();

// Import del controller dei post
const postController = require('./../controllers/postController');

// Rotte di CRUD
// Index
router.get('/', postController.index);

// Show
router.get('/:id', postController.show);

// Store
router.post('/', postController.store);

// Update
router.put('/:id', postController.update);

// Modify
router.patch('/:id', postController.modify);

// Destroy
router.delete('/:id', postController.destroy);

// Esporto l'istanza delle rotte
module.exports = router;