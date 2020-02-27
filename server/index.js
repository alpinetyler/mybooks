const path = require('path')
const express = require('express')
require('dotenv/config')
const massive = require('massive')
const session = require('express-session')
// const twilio = require('twilio');


const SERVER_PORT = 80
const ExpenseCtrl = require('./controllers/expenses')
const CategoryCtrl = require('./controllers/categories')
const MonthCtrl = require('./controllers/months')

const app = express()

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('the db is now connected!')
})

app.use(express.json())

//information to point to hosting server
app.use( express.static( `${__dirname}/../build` ) );



app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))

app.listen(SERVER_PORT, () => {
    console.log('we are now listening on port', SERVER_PORT)
})

// Full CRUD for managing expenses
app.post('/api/expenses', ExpenseCtrl.create)//create expense
app.get('/api/expenses', ExpenseCtrl.read)//read expense
app.put('/api/expenses/:id', ExpenseCtrl.update)//update expense
app.delete('/api/expenses/:id', ExpenseCtrl.delete)//delete expense

// Create, Read, Delete categories
app.post('/api/categories', CategoryCtrl.create)//create category
app.get('/api/categories', CategoryCtrl.read)//read categories
app.delete('/api/categories/:id', CategoryCtrl.delete)//delete category

// Create, Read, Delete months
app.post('/api/monthlist', MonthCtrl.create)//create month
app.get('/api/monthlist', MonthCtrl.read)//read months
app.delete('/api/monthlist/:id', MonthCtrl.delete)//delete month