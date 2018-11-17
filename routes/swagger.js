const express = require('express')
const router = express.Router()
const path = require ('path')
const fs = require('fs')
const config = require('../config')

router.get('/', function(req, res) {
    const defpath = path.join(__dirname, '../')
    const fileDirectory = path.join(defpath, 'public/swagger-dist/')
    const newFilePath = fileDirectory + 'new-swagger.json'
    const staticPath = '/swagger-dist/'

    if (!fs.existsSync(newFilePath)) {
        const filePath = fileDirectory + 'swagger.json'
        const result = JSON.parse(fs.readFileSync(filePath));
        const host = req.hostname + (config.server.port ? `:${config.server.port}` : '')

        result.host = host
        result.basePath = config.api.basePath
        fs.writeFileSync(newFilePath, JSON.stringify(result));
    }

    res.render('swagger', { staticPath })
})

module.exports = router;
