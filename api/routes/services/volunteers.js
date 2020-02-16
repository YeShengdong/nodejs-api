const express = require('express')
const router = express.Router()
// const Volunteers = require('../../models/Volunteers')

router.get('/', function(req, res) {
    req.API.success({test: 'allen'});
    // const params = req.API.getParams()

    // Volunteers
    //     .list(params)
    //     .then(data => {
    //         req.API.success(data)
    //     })
    //     .catch(e => {
    //         req.API.error500(e)
    //     })
})

// router.get('/:volunteerID', function(req, res) {
//     const params = req.API.getParams()

//     Volunteers
//         .findById(params.volunteerID)
//         .then(data => {
//             req.API.success(data)
//         })
//         .catch(e => {
//             req.API.error500(e)
//         })
// })

module.exports = router
