
const http = require("http")

const { URL } = require('url');
const PORT = 4000
const server = http.createServer()

const express = require('express');
const cors = require('cors');
const crypto = require('crypto-js')

const secret_key = "c35c0607957d96fd4d8fd53b0840d3b4b7f44ea4854c2b4efa118f635ce5998a*UFfw_GxF-mZyiE9tJmIBeQ*A7lcT_k5ZARxs77FeEmAae5D_yG0htqHEJiDycBstOaKLdoekcjYA0BBpDELBge-I_CA9KNRwjAiRs_2ciOP-Sic6iJ49KYXCnCXxhpuk7s**e71b626fc41725ff8e809d5b09212234a886c6cf9c231281b1efb4745f5d6c1e*yScoJL0j3vmknhFFKJcShCvcsFgpU23XAaRnv4QSC7M"
const app = express();
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.post('/login', (req, res) => {

  decrypted = crypto.AES.decrypt(req.body.raw, secret_key).toString(crypto.enc.Utf8)

  user_info = JSON.parse(decrypted)

  const data = JSON.stringify({
    user: user_info.user,
    password: user_info.password
  })
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }
  
  const request = http.request(options, respuesta => {
    console.log(`statusCode: ${res.statusCode}`)
  
    respuesta.on('data', d => {
      result = JSON.parse(d)
      
      mensaje = result.message === 'Logged in' ? 'Logged In' : 'Access Denied'
      
      if(result.message === 'Logged in')
      {
        res.json({
          message: mensaje
        })
      }
      else
      {
        res.json({
          message: mensaje
        })
      }
      
    })
  })
  
  request.on('error', error => {
    console.error(error)
    res.json({
      message: 'error'
    })
  })
  
  request.write(data)
  request.end()

});

app.listen(PORT, () => {
  console.log('server is listening on port ' + PORT);
});


