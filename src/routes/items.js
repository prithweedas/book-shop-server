import express from 'express';

export const router = express.Router();

// GET: /items
router.get('/', (req, res, next) => {
    res.send(['item1', 'item2', 'item3']);
});