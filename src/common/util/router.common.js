import config from './config'
import util from './util';

function getNavigator() {
    let navigator = null;
    return function() {
        if(navigator == null) {
          return navigator = weex.requireModule('navigator');
        }else {
            return navigator;
        }
    }
}

function push(path, params) {
    const platform = weex.config.env.platform.toLowerCase();
    const navigator = getNavigator()();
    let jumpUrl = config.JUMP_URL

    if(platform == 'ios' || platform == 'android') {
        jumpUrl = weex.config.bundleUrl.substring(0, weex.config.bundleUrl.lastIndexOf('/'));
        jumpUrl = /\/page/.test(jumpUrl) ? jumpUrl : `${jumpUrl}/page`;
    }

    jumpUrl = jumpUrl = `${jumpUrl}${path}.js`;

    if(platform == 'web') {
        jumpUrl = jumpUrl.match(/http.+:{1}[0-9]{4}\//)[0] + jumpUrl.match(/dist.+/)[0].replace(/dist\//, "").replace(/\.js$/, "") + ".html";
    }

    //跳转首页需要做处理
    if(path == '/index') {
        jumpUrl = jumpUrl.replace('/page', '');
    }

    if(path != '') {
        if(params != ''){
            jumpUrl += `?${util.encodedURL(params)}`;
        }

        navigator.push({
            url: jumpUrl,
        }, ()=> {})
    }else {
        throw new Error('path is not found')
    }

}

function back() {
    const navigator = getNavigator()();
    navigator.pop()
}

function query() {
    const str = weex.config.bundleUrl.split('?');
    const arr = str[1].split('&');
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        let paramArr = arr[i].split('=');
        obj[paramArr[0]] = paramArr[1];
    }

    return obj;
}

export default {
    push,
    back,
    query
}