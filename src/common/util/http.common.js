
import config from './config'
import util from './util'

//获取stream单例
function getStream() {
    let stream = null;
    return function () {
        if(stream == null) {
            return stream = weex.requireModule('stream')
        }
        return stream;
    }
}

function Http() {}

Http.prototype.post = function (url, op = {}) {
    const stream = getStream()();
    if(config.IS_ENCRYPT) {
        op = util.toRc4(JSON.stringify(op))
    }else {
        op = JSON.stringify(op)
    }
    return new Promise((resolve, reject)=> {
        stream.fetch({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: `${config.BASE_URL}${url}`,
            body: op
        }, function(ret) {
            if(ret.ok) {
                let obj;
                if(config.IS_ENCRYPT) {
                    obj = JSON.parse(config.decRc4(ret.data))
                }else {
                    obj = JSON.parse(ret.data)
                }

                if(obj.code == config.SUCCESS_CODE) {
                    resolve(obj.data)
                }else {
                    reject({msg: obj.msg, code: obj.code})
                }
            }else {
                reject({msg: '网络错误', code: 500})
            }
        })
    })
}

Http.prototype.get = function (url, op = '') {
    const stream = getStream()();
    if(op != '') {
        url = `${config.BASE_URL}${url}?${util.encodedURL(op)}`
    }
    return new Promise((resolve, reject)=> {
        stream.fetch({
            method: "GET",
            url: url
        }, function(ret) {
            if(ret.ok) {
                let obj;
                if(config.IS_ENCRYPT) {
                    obj = JSON.parse(util.decRc4(ret.data))
                }else {
                    obj = JSON.parse(ret.data)
                }

                if(obj.code == config.SUCCESS_CODE) {
                    resolve(obj.data)
                    
                }else {
                    reject({msg: obj.msg, code: obj.code})
                }
            }else {
                reject({msg: '网络错误', code: 500})
            }
        })
    })
}

export default new Http()