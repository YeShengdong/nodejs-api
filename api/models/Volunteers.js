'use strict'

const _ = require('lodash')
const Promise = require('bluebird')
const crypto = require('crypto')
const mongoose = require('../db')
const cllectionName = 'volunteers'
const Schema = mongoose.Schema
const Model = require('./Model')

const volunteersSchema = new Schema({
    userID: {
        type: String,
        required: true,
        index: true
    },
    volunteerID: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        enum: ['男', '女']
    },
    phoneAndEmail: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    serviveThisYear: {
        type: String,
        default: '0.0'
    },
    serviveLastYear: {
        type: String,
        default: '0.0'
    },
    serviveTotalTime: {
        type: String,
        default: '0.0'
    },
    registerTime: {
        type: Date,
        default: Date.now
    }
})

const model = mongoose.model('Volunteers', volunteersSchema, cllectionName)

class VolunteersModel extends Model {
    save (params) {
        return new Promise((resolve, reject) => {
            let fields = {}
            const password = params['password']
            const hasher = crypto.createHash('md5')
            hasher.update(password, 'utf8')
            fields.password = hasher.digest('hex')

            const instance = new Model(fields)

            instance.save().then((doc) => {
                resolve(doc)
            }).catch((e) => {
                reject(e)
            })
        })
    }

    list(params) {
        const projection = { '_id': 0 }
        const options = {}

        if (params.limit) {
            const paging = this.paging(params.page, params.limit)

            options.skip = paging.skip
            options.limit = paging.limit
        }

        return new Promise((resolve, reject) => {
            Promise
                .all([
                    model.countDocuments(),
                    model.find(null, projection, options)
                ])
                .then(([count, list]) => {
                    resolve({ count, list })
                })
                .catch(e => {
                    reject(e)
                })
        })
    }
}

module.exports = new VolunteersModel()
