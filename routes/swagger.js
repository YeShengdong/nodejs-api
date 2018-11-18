const express = require('express')
const router = express.Router()
const path = require ('path')
const fs = require('fs')
const config = require('../config')

router.get('/', function(req, res) {
    const root = path.join(__dirname, '../')
    const version = config.swagger.version
    const fileDirectory = path.join(root, 'public/swagger-dist/')
    const newFilePath = `${fileDirectory}swagger-${version}.json`
    const staticPath = '/swagger-dist/'
    const jsonPath = `${staticPath}swagger-${version}.json`

    if (!fs.existsSync(newFilePath)) {
        const filePath = fileDirectory + 'swagger.json'
        const result = JSON.parse(fs.readFileSync(filePath));
        const host = req.hostname + (config.server.port ? `:${config.server.port}` : '')

        result.host = host
        result.basePath = config.api.basePath
        fs.writeFileSync(newFilePath, JSON.stringify(result));
    }

    res.render('swagger', { staticPath, jsonPath })
})

module.exports = router;
