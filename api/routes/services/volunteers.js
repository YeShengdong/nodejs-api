const express = require('express')
const router = express.Router()
const Volunteers = require('../../models/Volunteers')

router.get('/', function(req, res) {
    const params = req.API.getParams()

    Volunteers
        .list(params)
        .then(data => {
            req.API.success(data)
        })
        .catch(e => {
            req.API.error500(e)
        })
})

module.exports = router
