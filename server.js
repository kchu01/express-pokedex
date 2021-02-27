/* Required Modules and Variables */
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')

const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = process.env.PORT || 3000

// Middleware and config
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

/* Controllers */
app.use('/users', require('./controllers/userController.js'))
app.use('/pokemons', require('./controllers/pokemonController.js'))

/* Routes */
// GET /
app.get('/', async (req, res) => {
    try {
        const pokeURL = 'https://pokeapi.co/api/v2/pokemon?limit=150'
        const responce = await axios.get(pokeURL)
        const pokemons = responce.data.results

        res.render('index', { pokemons: pokemons })
    } catch (error) {
        console.log(error)
        res.render('index', { pokemons: [] })
    }
})



app.listen(PORT, () => {
    rowdyResults.print()
})
