'use strict'

/**
 *  Common functions
 *
 */
class Fn {
    isset (v) {
        if (typeof v === 'undefined') {
            return false
        } else {
            return true
        }
    }

    getTimestamp () {
        return new Date().getTime()
    }

    getCostTime (startTime) {
        return ((this.getTimestamp() - startTime) / 1000) + 's'
    }

    getDate (type = '') {
        const date = new Date()
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        if (month >= 1 && month <= 9) {
            month = '0' + month
        }

        if (day >= 0 && day <= 9) {
            day = '0' + day
        }

        switch (type) {
            case 'year':
                return year
            case 'month':
                return month
            case 'day':
                return day
            default:
                return year + '-' + month + '-' + day
        }
    }

    getRandom (n) {
        let v = ''

        for (let i = 0; i < n; i++) {
            v += Math.floor(Math.random() * 10)
        }

        return v
    }

    randomNum (min, max) {
        const range = max - min
        const rand = Math.random()
        const num = min + Math.floor(rand * range)

        return num
    }
}

module.exports = new Fn()
