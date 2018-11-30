import {isIOS, isAndroid, isWeb} from './tool.js'
import config from './config'
function loadImage(path) {
    if(isIOS()) {
        return `${config.IOS_IMG_URL}${path}`
    }else if(isAndroid()) {
        return `${config.ANDROID_IMG_URL}${path}`
    }else if(isWeb()){
        return `${config.WEB_IMG_URL}${path}`
    }
}

export default loadImage