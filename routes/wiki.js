const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')

router.get('/', (req, res, next) => {
    res.send('got to GET /wiki/')
})

router.post('/', (req, res, next) => {
    res.json(req.body)
    res.send('got to POST /wiki/')

})

router.get('/add', async (req, res, next) => {
    try {
        res.send(addPage())
    } catch (error) {next(error)}
})

module.exports = router;