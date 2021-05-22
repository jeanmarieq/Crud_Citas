const express = require('express')
/* const { validationResult } = require('express-validator')*/
const bodyParser = require('body-Parser')
const app = express()
const cors = require('cors')
const { Sequelize, DataTypes, Error } = require('sequelize')
const CitaModel = require('./models/cita')


app.use(cors())
app.set('view engine', 'ejs')

const sequelize = new Sequelize ({ dialect: 'sqlite', storage: 'cita-database.db' })

const Citas = CitaModel(sequelize, DataTypes)

//depemdencia CORS

app.use(express.json());

//depemdencia CORS
app.use(cors());


// Mostrar lista de citas
app.get('/citas', async (req, res) => {
    const allCitas = await Citas.findAll();
    res.json({ Citas: allCitas})
})

// Mostrar Cita por ID
app.get('/citas/:id', async (req, res) => {
    try{
        const citaId = req.params.id
        const cita = await Citas.findByPk(citaId)
        cita.get({
            Name: req.body.Name,
            date: req.body.date,
            time: req.body.time,
            description: req.body.description
        });
        return res.status(200).send(cita)
    }catch(err) {
        return res.status(400).send({ error: err});
   
    } // res.json({Citas: cita})
})

// Criar Cita FUNCIONA
/* app.post('/citas', async (req, res) => {
       const novacita = await Citas.create ({
        Name: req.body.Name,
        date: req.body.date,
        time: req.body.time,
        description: req.body.description
    })
   res.json({ novacita });
})   */
// teste Con envio do error 
app.post('/citas', async (req, res) => {
    try {
        const { Name, date, time, description } = req.body;
        const FECHA = await Citas.findOne({
            where: {
                date: req.body.date,
                time: req.body.time
            }
        });
        if (FECHA !=null) {
            return res.status(400).send({error: 'já existe uma marcação nesse horario'}) 
        }
       console.log(FECHA)


        const novacita = await Citas.create ({
            Name: req.body.Name,
            date: req.body.date,
            time: req.body.time,
            description: req.body.description
        });
        return res.status(200).send(novacita)
    } catch(err) {
        console.log(err)
        return res.status(400).send({ error: err});
    }   
    
 //  res.json({ novacita });
})  

// prueba con validacion NO FUNCIONA
/* app.post('/citas', [
    check('Name').isAlpha({min:3}),
    // body('date').isDate(),
    check('description').isAlphanumeric({max:20}),
], async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).send({ mesage: errors})
        } 

        try {
            const novacita = await Citas.create({
                Name: req.body.Name,
                date: req.body.date,
                time: req.body.time,
                description: req.body.description,
            });
            return res.status(201).send({message:'Cita cadastrada'});
        } catch(e) {
            return res.status(500).send({mesage:'falha ao cadastrar cita'});
        }
    res.send({ novacita });
})  */

// Atualizar cita 
app.put('/citas/:id', async (req, res) => {
    try {
        const citaId = req.params.id
        const lisCitas = await Citas.findByPk(citaId)
        lisCitas.update ({
            Name: req.body.Name,
            date: req.body.date,
            time: req.body.time,
            description: req.body.description
        });
        return res.status(200).send(lisCitas)
    } catch(err) {
        return res.status(400).send({ error: err});
    }   
    // res.send({ lisCitas: lisCitas })
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