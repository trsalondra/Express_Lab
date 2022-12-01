const port = 3000

const express = require('express')
const fs = require('fs')
const recipes = require('./models/recipes.js')
const books = require('./models/books.js')
const app = express()

app.set('views', './views') // specify the views directory


app.engine('madeline', (filePath, options, callback) => { // 
    fs.readFile(filePath, (err, content) => {
      if (err) return callback(err)

      const rendered = content.toString()
        .replace('#title#', '<title>' + options.title + '</title>')
        .replace('#title#', '<h1>' + options.title + '</h1>')
        .replace('#subtitle#', '<h2>' + options.subtitle + '</h2>')
        .replace('#image#', '<img src="' + options.imageLink + '">')
        .replace('#description#', '<h3>' + options.description + '</h3>')
        .replace('#servingTime#', '<h3>Serving Time: ' + options.servingTime + '</h3>')
        .replace('#level#', '<h3>Level: ' + options.level + '</h3>')
        .replace('#ingredients#','<h3>Ingredients</h3><ul><li>'+ options.ingredients.join('</li><br><li>') + '</li><br></li></ul>')
        .replace('#supplies#','<h3>What youll need</h3><ul><li>'+ options.supplies.join('</li><br><li>') + '</li><br></li></ul>')
        .replace('#steps#','<h3>Directions</h3><ol><li>'+ options.steps.join('</li><br><li>') + '</li><br></li></ol>')


        // .replace('#author#', '<h2>' + options.author + '</h2>')
        // .replace('#genres#', '<h3>Serving Time: ' + options.genres + '</h3>')
        // .replace('#characters#', '<h3>Level: ' + options.characters + '</h3>')
        // .replace('#settings#','<h3>Ingredients</h3><ul><li>'+ options.settings + '</li><br></li></ul>')
        // .replace('#reviews#','<h3>What youll need</h3><ul><li>'+ options.reviews + '</li><br></li></ul>')

      return callback(null, rendered)
    })
  })

  app.set('view engine', 'madeline') 


app.get('/recipes', (req, res) => {
    res.send(recipes)
})

app.get('/books', (req, res) => {
  res.send(books)
})

app.get('/recipes/:indexOfRecipesArray', (req, res) => {
    res.render('recipe-page', {
        title: recipes[req.params.indexOfRecipesArray].title,
        subtitle: recipes[req.params.indexOfRecipesArray].subtitle,
        description: recipes[req.params.indexOfRecipesArray].description,
        imageLink: recipes[req.params.indexOfRecipesArray].imageLink,
        servingTime: recipes[req.params.indexOfRecipesArray].servingTime,
        level: recipes[req.params.indexOfRecipesArray].level,
        ingredients: recipes[req.params.indexOfRecipesArray].ingredients,
        supplies: recipes[req.params.indexOfRecipesArray].supplies,
        steps: recipes[req.params.indexOfRecipesArray].steps
    })
})

// app.get('/books/:indexOfBooksArray', (req, res) => {
//   res.render('book-page', {
//       title: books[req.params.indexOfBooksArray].title,
//       author: books[req.params.indexOfBooksArray].author,
//       imageLink: books[req.params.indexOfBooksArray].imageLink,
//       genres: books[req.params.indexOfBooksArray].genres,
//       characters: books[req.params.indexOfBooksArray].characters,
//       settings: books[req.params.indexOfBooksArray].settings,
//       reviews: books[req.params.indexOfBooksArray].reviews
//   })
// })

// Tell the app to listen on port 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})