
function isIOS() {
    const { platform } = weex.config.env;
    return platform.toLowerCase() === "ios";
}
function isWeb() {
    const { platform } = weex.config.env;
    return typeof window === "object" && platform.toLowerCase() === "web";
}

function isAndroid() {
    const { platform } = weex.config.env;
    return platform.toLowerCase() === "android";
}

function isIphoneX() {
    const { deviceHeight } = weex.config.env;
    if (isWeb()) {
        return (
            typeof window !== undefined &&
            window.screen &&
            window.screen.width &&
            window.screen.height &&
            parseInt(window.screen.width, 10) === 375 &&
            parseInt(window.screen.height, 10) === 812
        );
    }
    return isIOS() && deviceHeight === 2436;
}

function isIphoneXSMax() {
    const { deviceHeight } = weex.config.env;
    if (isWeb()) {
        return (
            typeof window !== undefined &&
            window.screen &&
            window.screen.width &&
            window.screen.height &&
            parseInt(window.screen.width, 10) === 414 &&
            parseInt(window.screen.height, 10) === 896
        );
    }
    return isIOS() && deviceHeight === 2688;
}

function isIPhoneXR() {
    const { deviceHeight } = weex.config.env;
    if (isWeb()) {
        return (
            typeof window !== undefined &&
            window.screen &&
            window.screen.width &&
            window.screen.height &&
            parseInt(window.screen.width, 10) === 414 &&
            parseInt(window.screen.height, 10) === 896
        );
    }
    return isIOS() && deviceHeight === 1792;
}

function getStatusHeight() {
    if(isIphoneX() || isIPhoneXR() || isIphoneXSMax()) {
        return 64
    }

    if(isIOS()) {
        return 40
    }

    return 0
}

module.exports = {
    isAndroid,
    isWeb,
    isIOS,
    isIphoneX,
    isIPhoneXR,
    isIphoneXSMax,
    getStatusHeight
}