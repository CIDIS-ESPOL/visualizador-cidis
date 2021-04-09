const { InfluxDB } = require('@influxdata/influxdb-client')

// You can generate a Token from the "Tokens Tab" in the UI
const token = 'ykfqgonxlAdQQO1XBoNJWkyC4xM3f0N8JHZg3_ezo1NVTYX4cE3US1TpY_-xuXXfPwd2vO9oQpAqa5PiMCk9uA=='
const org = 'ESPOL'
const bucket = 'Prueba 3'

const client = new InfluxDB({ url: 'http://localhost:8086', token: token })

module.exports = {

    get_sensores(res) {
        sensores = []

        const queryApi = client.getQueryApi(org)

        const query = `import "influxdata/influxdb/schema"

        schema.measurementTagValues(
          bucket: "Prueba 3",
          measurement: "central",
          tag: "sensor"
        )`
        queryApi.queryRows(query, {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                sensores.push(o._value)
            },
            error(error) {
                console.error(error)
                console.log('\\nFinished ERROR')
            },
            complete() {
                console.log('\\nFinished SUCCESS')
                res.json({
                    message: sensores
                })
            },
        })
    }

}