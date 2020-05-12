var express = require('express');
var router = express.Router();

/* Liste des différents flipbooks */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Valorant' });
});

/* Retourne en JSON les données du flipbook dont l'id est dnas l'url */
router.get('/:id', function (req, res, next) {
  console.log(req.params.id)
  res.json({
    title: 'Mon flipbook',
    pages: [
      {contenu: 'Page 1'},
      {contenu: 'Page 2'},
    ],
    description: 'Descriptiuon',
    publisher: 'Auteur du flipbook',
    publisherDate: '11/05/2020'
  })
});

module.exports = router;
