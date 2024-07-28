const express = require('express');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/upload-book', authMiddleware, bookController.uploadBook);
router.get('/all-books', bookController.getAllBooks);
router.patch('/book/:id', authMiddleware, bookController.updateBook);
router.delete('/book/:id', authMiddleware, bookController.deleteBook);
router.get('/book/:id', bookController.getBookById);

module.exports = router;
