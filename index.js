const express = require('express')
const app = express()
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize')
const CitaModel = require('./models/cita')

app.set('view engine', 'ejs')

const sequelize = new Sequelize ({ dialect: 'sqlite', storage: 'cita-database.db' })

const Citas = CitaModel(sequelize, DataTypes)

// falta llamar a depemdencia CORS

app.use(express.json())

// Mostrar lista de citas
app.get('/citas', async (req, res) => {
    const allCitas = await Citas.findAll();
    res.json({ Citas: allCitas})
})

// Mostrar Cita por ID
app.get('/citas/:id', async (req, res) => {
    const citaId = req.params.id
    const cita = await Citas.findByPk(citaId)

    res.json({ action: 'Mostrar Cita', Citas: cita})
})

// Criar Cita
app.post('/citas', async (req, res) => {
    const novacita = await Citas.create ({
        Name: req.body.Name,
        date: req.body.date,
        time: req.body.time,
        description: req.body.description
    })
   res.json({ novacita });
})

// Atualizar cita
app.put('/citas/:id', async (req, res) => {
    const citaId = req.params.id
    const lisCitas = await Citas.findByPk(citaId)
    lisCitas.update ({
        Name: req.body.Name,
        date: req.body.date,
        time: req.body.time,
        description: req.body.description
    }) 
    res.send({ lisCitas: lisCitas })
})
  
// Apagar Cita
app.delete('/citas/:id', async (req, res) => {
    const citaId = req.params.id
    const apagarCita = await Citas.destroy({ where: {id: citaId} })
  
    res.send({ action: 'Apagar cita', apagarCita: apagarCita})
})

app.listen(8080, () => {
    console.log('Iniciando o servidor')
})