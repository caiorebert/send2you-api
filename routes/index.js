const { response } = require('express');
var express = require('express');
const { route } = require('./users');
var router = express.Router();
var db = require('../queries/queries');

router.get('/pub/show', db.getPublicacoes);
router.post('/pub/new', db.insertPublicacao);
router.post('/login', db.login);

module.exports = router;
