const { InfluxDB } = require('@influxdata/influxdb-client')

// You can generate a Token from the "Tokens Tab" in the UI
const token = 'aoMcdBeQapJ00RwnP1MFS0sfKLjfDju7VFL5WYzi6RjJ7NoYp0rxM192tAOfwtF9FCMR7XXRtPFNbM4PqmcUug=='
const org = 'CIDIS-ESPOL'
const bucket = 'Inicial'

const client = new InfluxDB({ url: 'http://localhost:8086', token: token })

module.exports = {

    get_sensores(res) {
        sensores = []

        const queryApi = client.getQueryApi(org)

        const query = `import "influxdata/influxdb/schema"

        schema.measurementTagValues(
          bucket: "Inicial",
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
