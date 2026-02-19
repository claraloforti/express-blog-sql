// Richiamo istanza di framework Express
const express = require('express')
// Creo istanza dell'oggetto rotte di Express
const router = express.Router();

// Import del controller delle ricette
const recipeController = require('./../controllers/recipeController');

// Rotte di CRUD
// Index
router.get('/', recipeController.index);

// Show
router.get('/:id', recipeController.show);

// Store
router.post('/', recipeController.store);

// Update
router.put('/:id', recipeController.update);

// Modify
router.patch('/:id', recipeController.modify);

// Destroy
router.delete('/:id', recipeController.destroy);

// Esporto l'istanza delle rotte
module.exports = router;