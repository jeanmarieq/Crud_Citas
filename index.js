const express = require('express')
const app = express()
const { Sequelize, DataTypes } = require('sequelize')
app.set('view engine', 'ejs')

const sequelize = new Sequelize ({ dialect: 'sqlite', storage: 'cita-database.db' })

app.use(express.json())

app.listen(8080, () => {
    console.log('Iniciando o servidor')
})