const router = require('express').Router()
const db = require('../models')
const axios = require('axios')

// INDEX (read all) route - GET /pokemons
router.get('/', async (req, res) => {
    try {
        const pokemons = await db.pokemon.findAll({ raw: true })
        // console.log(pokemons)

        res.render('pokemon/index', { pokemons: pokemons })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

// POST /pokemons
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const [newPokemon, created] = await db.pokemon.findOrCreate({
            where: { name: req.body.name }
        })
        // console.log(newPokemon)
        // console.log(created)

        res.redirect('/pokemons')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

// GET /pokemons/:name
router.get('/:name', async (req, res) => {
    try {
        const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${req.params.name}`;
        const responce = await axios.get(pokeUrl)
        const pokemon = responce.data
        // console.log('pika pika', pokemons.data)
        res.render('pokemon/show', { pokemon: pokemon })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;