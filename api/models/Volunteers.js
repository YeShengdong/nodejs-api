'use strict'

const _ = require('lodash')
const Promise = require('bluebird')
const crypto = require('crypto')
const mongoose = require('../db')
const cllectionName = 'volunteers'
const Schema = mongoose.Schema
const Model = require('./Model')

const volunteersSchema = new Schema({
    userID: { type: String, required: true, index: true },
    volunteerID: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ['男', '女'] },
    phoneAndEmail: { type: String, default: '' },
    location: { type: String, default: '' },
    serviveThisYear: { type: Number, default: 0 },
    serviveLastYear: {
        type: Number,
        default: 0
    },
    serviveTotalTime: {
        type: Number,
        default: 0
    },
    registerTime: {
        type: Date,
        default: Date.now
    }
})

const model = mongoose.model('Volunteers', volunteersSchema, cllectionName)

class VolunteersModel extends Model {
    constructor() {
        super()
    }

    findById(volunteerID) {
        return model.find({volunteerID}, this.projection)
    }

    list(params) {
        const options = {}

        if (params.limit) {
            const paging = this.paging(params.page, params.limit)

            options.skip = paging.skip
            options.limit = paging.limit
        }

        if (params.sort) {
            options.sort = {}
            options.sort[params.sort] = -1
        }

        return new Promise((resolve, reject) => {
            Promise
                .all([
                    model.countDocuments(),
                    model.find({serviveTotalTime: { $gte: 0 }}, this.projection, options)
                ])
                .then(([count, list]) => {
                    resolve({ count, list })
                })
                .catch(e => {
                    reject(e)
                })
        })
    }

    dataConversion() {
        model.find().then((doc) => {
            for (let i = 0; i < doc.length; i++) {
                const item = doc[i]
                const setData = {
                    $set: {
                        serviveTotalTime: parseFloat(item.serviveTotalTime),
                        serviveLastYear: parseFloat(item.serviveLastYear),
                        serviveThisYear: parseFloat(item.serviveThisYear),
                        age: parseFloat(item.age)
                    }
                }

                model
                    .updateOne({'volunteerID': item.volunteerID}, setData)
                    .then((doc) => {
                        console.log('success')
                    }).catch(e => {
                        console.log(e)
                    });
            }
        }).catch((e) => {
            console.log(e);
        });
    }
}

module.exports = new VolunteersModel()
