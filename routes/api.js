var express = require('express');
var router = express.Router();
var routes = require('../queries/queries');

router.get('/pub/show', routes.publicacao.getPublicacoes);
router.post('/pub/new', routes.publicacao.insertPublicacao);
router.post('/user/all', routes.user.getUsers);
router.get('/user/view', routes.user.getUser);
router.post('/user/login', routes.user.login);
router.post('/user/new', routes.user.newUser);
router.post('/conversa/view', routes.conversa.getConversa);
router.post('/conversa/listaMensagens', routes.conversa.getAllMensagens);
router.post('/conversa/new', routes.conversa.insertMensagem);

module.exports = router;
