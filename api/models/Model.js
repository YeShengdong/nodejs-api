'use strict'

const Promise = require('bluebird')

module.exports = class Model {
    constructor() {

    }

    paging(page = 1, limit = 10) {
        page = parseInt(page)
        limit = parseInt(limit)

        if (page <= 0) {
            page = 1
        }

        const skip = limit * (page - 1)

        return { skip, limit }
    }
}
