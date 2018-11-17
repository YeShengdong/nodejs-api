'use strict'

const zlib = require('zlib')
const Promise = require('bluebird')
const config = require('../../config')
const logger = require('log4js').getLogger('api')
const Fn = require('./Fn.class')
const code = require('./httpStatusCode')

class API {
    constructor (req, res) {
        this.req = req
        this.res = res
        this.method = req.method.toUpperCase()
        this.log = ''
        this.startTime = Fn.getTimestamp()
        this.headers = {
            'Access-Control-Allow-Origin': config.api.allowOrigin,
            'Access-Control-Allow-Methods': config.api.allowMethods,
            'Access-Control-Allow-Headers': config.api.allowHeaders
        }
    }

    getParams () {
        const reqUrl = this.req.originalUrl
        let data = {}
        // let reg = /\/api\/\w+\/\w+\//

        switch (this.method) {
            case 'GET':
            case 'DELETE':
                data = this.req.query
                break
            case 'POST':
            case 'PUT':
            case 'PATCH':
                data = this.req.body
                break
            default:
        }

        data = Object.assign(data, this.req.params)

        this.log = this.method + ' ' + reqUrl + '\r\nParams: ' + JSON.stringify(data) + '\r\n'

        return data
    }

    quickResponse (httpStatus = code.SUCCESS) {
        this.res.set(this.headers).sendStatus(httpStatus)
    }

    response (info, httpStatus, errorCode = 0) {
        const _this = this
        const isRequestError = httpStatus >= 300 ? true : false
        let gzip = false
        let jsonData = {}

        if (!isRequestError) {
            jsonData.errorCode = errorCode
            jsonData.data = info
        }

        jsonData = JSON.stringify(jsonData)

        new Promise((resolve, reject) => {
            if (_this.req.acceptsEncodings('gzip')) {
                try {
                    zlib.gzip(jsonData, (err, buffer) => {
                        if (err) {
                            resolve(jsonData)
                        } else {
                            gzip = true
                            resolve(buffer)
                        }
                    })
                } catch (e) {
                    resolve(jsonData)
                }
            } else {
                resolve(jsonData)
            }
        })
        .then((output) => {
            _this.headers['Content-Type'] = 'application/json; charset=utf-8'
            _this.headers['Content-Length'] = output.length

            if (gzip) {
                _this.headers['Content-Encoding'] = 'gzip'
            }

            _this.log += 'httpStatus: ' + httpStatus + '\r\n'
            _this.log += 'Cost: ' + Fn.getCostTime(_this.startTime) + '\r\n'
            _this.log += 'Response: \r\n'
            _this.log += '------------------------\r\n'
            
            if (isRequestError) {
                _this.log += info + '\r\n'
                logger.error(_this.log)
            } else {
                _this.log += jsonData + '\r\n'
                logger.info(_this.log)
            }

            _this.res.status(httpStatus).set(_this.headers).send(output)
        })
        .catch((e) => {
            logger.error(e)
            _this.res.status(code.INTERNAL_SERVER_ERROR).set(_this.headers).send()
        })
    }

    success(data, errorCode = 0) {
        this.response(data, code.SUCCESS, errorCode)
    }

    created(data) {
        this.response(data, code.CREATED)
    }

    accepted(data) {
        this.response(data, code.ACCEPTED)
    }

    error404(e) {
        this.response(e, code.NOT_FOUND)
    }

    error500(e) {
        this.response(e, code.INTERNAL_SERVER_ERROR)
    }
}

module.exports = API
