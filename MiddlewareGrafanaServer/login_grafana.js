
const http = require("http")

const api_key = 'eyJrIjoiTGxRdHVNM0Y2dk9JbzR3WkpKM21SRkxreXhYMjlQczciLCJuIjoiV2ViIEFQSSAyIiwiaWQiOjF9'

module.exports = {

    login_grafana(data, res) {

        mensaje = ''

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
            //console.log(`statusCode: ${res.statusCode}`)

            respuesta.on('data', d => {
                result = JSON.parse(d)

                console.log(result)

                mensaje = result.message === 'Logged in' ? 'Logged In' : 'Access Denied'

                if(mensaje === 'Logged In'){
                
                    jsonStr = respuesta.headers['set-cookie'][0].split(';')

                    sesion = jsonStr[0].split('=')

                    res.json({
                        message: mensaje,
                        token: sesion[1],
                        apikey: api_key,
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
            mensaje = 'Error al enviar peticion de grafana'
            res.json({
                message: mensaje
            })
        })

        request.write(data)
        request.end()


    }

}