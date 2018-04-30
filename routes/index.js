var express = require('express');
const Sequelize = require('sequelize');

var router = express.Router();
const { models } = require("../models/index")


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Quiz' });
});

// GET home page.
router.get('/author', (req, res, next) => {
  res.render('author');
});

// Página de créditos
router.get('/credits', (req, res, next) => {
  res.render('credits')
})

router.get('/quizzes', (req, res, next) => {
  aux = ""
  response = ""
  n = 0
  models.quiz.findAll()
    .each(quiz => {
      aux = `Pregunta Número ${quiz.id}: ${quiz.question}`
      aux = aux.concat(aux)
      response = JSON.stringify(aux)
      console.log("Dentro de each"+response)
  })
  .then((response, n) => {
   
    response = JSON.stringify(response)
    //var count = Object.keys(response).length;
    //console.log(`EL VALO DE N ES ${count}`)
    console.log("Dentro de then(response) => "+response)
    //for (var i = 0; i < count; i++){
    //  JSON.stringify(response["id"][i])
    //}
    res.send('<!DOCTYPE html>'
      +'<html>'
      +'<head>'
      +    '<meta charset="utf-8" />'
      +    '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
      +    '<title>Quizzes</title>'
      +     '<meta name="viewport" content="width=device-width, initial-scale=1">'
      +     '<link rel="stylesheet" href="/stylesheets/style.css" />'
      + '</head>'
      + '<body>'
      +        '<h1>Quiz</h1>'
      +         response
      + '</body>'
      + '</html>'
            )
  })

 
})


module.exports = router;