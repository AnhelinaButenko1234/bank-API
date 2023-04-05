'use strict';
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = 8000

const clients = []

//get 

app.get('/clients', (req, res) => {
   res.json(clients)
})

//new client

app.post("/clients", (req, res) => {
   console.log(req.body)

   var client_ = {
      "id": 0,
      "name":"",
      "surname":"",
      "card":[]
   }

   client_.id = req.body.id
   client_.name = req.body.name
   client_.surname = req.body.surname

   clients.push(client_)
   res.json({message: `New clients ${client_.id}`})
})

//new card

app.post("/clients/card", (req, res) => {
   console.log(req.body)

   const index_client = clients.findIndex((c) => c.id === req.body.userId)
   console.log(index_client)

   var card_ = {
      "id": 0,
      "balance": 0.0
   }

   card_.id = req.body.id
   card_.balance = req.body.balance

   clients[index_client].card.push(card_)

   res.json({message: `New card ${card_.id} for clients ${index_client+1}`})
 })

// change balance

 app.post("/clients/balance", (req, res) => {
   console.log(req.body)

   const index_client_balance = clients.findIndex((c) => c.id === req.body.userId)
   const index_card_balance = clients[index_client_balance].card.findIndex((c) => c.id === req.body.cardId)

   var balance = req.body.balance
   clients[index_client_balance].card[index_card_balance].balance = balance

   res.json({message: `New balance for card ${index_card_balance} for clients ${index_client_balance} is ${balance}`})
 })

 // summ balance

 app.get('/clients/summ', (req, res) => {
   let summ = 0.0

   clients.forEach((money) => {
      var card_ = money["card"]
      card_.forEach((bal) => {
         var bal_ = bal["balance"]
         summ = summ + bal_
      });
   });

   res.json({message: `Summ balance: ${summ}`})
 })


app.listen(port, () => {
   console.log(`Server running at ${port}/`)
})