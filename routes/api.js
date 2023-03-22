const { response } = require('express');
var express = require('express');
const { route } = require('./users');
var router = express.Router();
var routes = require('../queries/queries');

router.get('/pub/show', routes.publicacao.getPublicacoes);
router.post('/pub/new', routes.publicacao.insertPublicacao);
router.get('/user/all', routes.user.getUsers);
router.post('/user/login', routes.user.login);
router.post('/conversa/view', routes.conversa.getConversa);

module.exports = router;
