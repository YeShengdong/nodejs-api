'use strict'

const express = require('express')
const router = express.Router()
const config = require('../../config')
const SERVICES_PATH = './services/'

module.exports = function (app) {
    router.use(require('../middlewares/api'))
    router.use('/volunteers', require(`${SERVICES_PATH}volunteers`))

    app.use(config.api.basePath, router)    // API basePath
}
