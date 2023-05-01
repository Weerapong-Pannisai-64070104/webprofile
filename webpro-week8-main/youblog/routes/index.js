const express = require('express')
const router = express.Router()
var article = require('../article-db')

router.get('/', function(req, res, next) {
    var searchQuery = req.query.search
    var filterResult = article.filter(val => (val.title).toLowerCase().includes((searchQuery?searchQuery:"").toLowerCase()))
    // console.log( filterResult.length)
    res.render('index', { title: 'Express', article:filterResult})
})
router.get('/blog/:id', function(req, res, next) {
    if (article.find(article => article.id === req.params.id) ){
        // var data = { title: 'Express', article: article.find(article => article.id === req.params.id) }
        res.render('detail', {article: article.find(article => article.id === req.params.id) })
    }
    else res.render('detail', {title: 'Express', article:"notfound"})
})
 
module.exports = router