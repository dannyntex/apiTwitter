const express = require('express'),
    path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    uuidv4 = require('uuid/v4');

const app = express()

const DATA_FILE = path.join(__dirname, 'data.json')

app.set('port', (process.env.PORT || 3000))




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0'),
        next()
})

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/api/tweets', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        res.setHeader('Cache-Control', 'no-cache')
        res.json(JSON.parse(data))
    })
})

app.get('/api/tweets/:id', (req, res) => {

    fs.readFile(DATA_FILE, (err, data) => {
        res.setHeader('Cache-Control', 'no-cache')
        let notas = JSON.parse(data);
        notas.forEach((nota) => {
            if (nota.id === req.params.id) {
                res.json(nota)
            }
        })
    })
})


app.put('/api/marcarfavorito/:id', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        let notas = JSON.parse(data);
        notas.forEach((nota) => {
            if (nota.id === req.params.id) {
                nota.favorito = true
                res.json(nota)
            }
        })
        fs.writeFile(DATA_FILE, JSON.stringify(notas, null, 4, () => {
            res.json({})
        }))
    })
})

app.get('/api/verfavorito', (req, res) => {

    fs.readFile(DATA_FILE, (err, data) => {
        res.setHeader('Cache-Control', 'no-cache')
        let notas = JSON.parse(data)
        notas.forEach((nota) => {
            if (nota.favorito == true) {
                res.json(nota)
            }
        })
        })
})

app.post('/api/newtweet', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        const tweets = JSON.parse(data)
        const newTweet = {
            usuario: req.body.usuario,
            nota: req.body.nota,
            favorito: false,
            id: uuidv4()
        }
        tweets.push(newTweet)
        fs.writeFile(DATA_FILE, JSON.stringify(tweets, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache')
            res.json(tweets)
        })
    })
})

app.listen(app.get('port'), () => {
    console.log(`Conexión extablecida a: http://localhost:${app.get('port')}/`)
})