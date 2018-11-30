
// cm.chooseImage({
//     sourceType: 'camera',
//     edit: {
//         boxMove: true,
//         boxResize: true,
//         boxRatio: '1'
//     }
// })

// cm.phoneCall('13420311953')

const moduleList = {
    event: 'event',
    BCServiceModule: 'BCServiceModule',
    ShareServiceModule: 'ShareServiceModule',
    CMWXProgressHUDModule: 'CMWXProgressHUDModule',
    CMMapModule: 'CMMapModule'
}


function getModule(moduleName) {
    return weex.requireModule(moduleName)
}

function isRegisteredModule() {
    const isExist = weex.isRegisteredModule('event')
    if(!isExist) toast('event module is not exist')

    return isExist;
}

function isRegisteredMethod(moduleName, methodName){
    const isExist = weex.isRegisteredModule(moduleName, methodName)
    if(!isExist) toast(`${methodName} method is not exist`)

    return isExist;
}

function toast(msg) {
    weex.requireModule('modal').toast({
        message: msg,
        duration: 1
    })
}

export default {
    /**
     * 选择图片
     * @param {*} op 
     */
    chooseImage(op) {
        return new Promise((resolve, reject)=> {
            const sourceType = op.sourceType || 'camera'
    
            if(!isRegisteredModule(moduleList.event)) reject({msg: `${moduleList.event} 模块未定义`});
            if(sourceType === 'camera') {
                if(!isRegisteredMethod(moduleList.event, 'photographWithParameter')) reject({msg: `photographWithParameter 方法未定义`});
            }else if(sourceType === 'album') {
                if(!isRegisteredMethod(moduleList.event, 'selectPhotoFromPhotoAlbum')) reject({msg: `selectPhotoFromPhotoAlbum 方法未定义`});
            }
    
            let modal = getModule(moduleList.event);
    
            const edit = op.edit ? true : false
            let boxMove, boxRatio, boxResize;
            toast(edit ? 'YES' : 'NO')
            if (edit) {
                boxMove = op.edit.boxMove || false;
                boxResize = op.edit.boxResize || false;
                boxRatio = op.edit.boxRatio || "1"
            }
            const num = op.num || 1
            if (sourceType === 'camera') {
                modal.photographWithParameter({
                    edit: edit ? 'YES' : 'NO',
                    movableCropBox: boxMove ? 'YES' : 'NO',
                    movableCropBoxEditSize: boxResize ? 'YES' : 'NO',
                    movableCropBoxCustomRatio: boxRatio
                }, (data)=> {
                    resolve(data)
                })
    
            } else if (sourceType === 'album') {
                modal.selectPhotoFromPhotoAlbum({
                    num: num,
                    edit: edit ? 'YES' : 'NO',
                    movableCropBox: boxMove ? 'YES' : 'NO',
                    movableCropBoxEditSize: boxResize ? 'YES' : 'NO',
                    movableCropBoxCustomRatio: boxRatio
                },data=> {
                    resolve(data)
                })
            }
        })
    },
    /**
     * 打电话
     * @param {*} phone 
     */
    makePhoneCall(phone) {
        if(!isRegisteredModule(moduleList.event)) return;
        if(!isRegisteredMethod(moduleList.event, 'call')) return;
        if(!phone) {
            toast('phoneNumber must exist')
            return;
        }  

        let modal = getModule(moduleList.event);

        modal.call(phone)
    },
    /**
     * 进入地图选择定位
     */
    chooseLocation() {
        return new Promise((resolve, reject)=> {
            if(!isRegisteredModule(moduleList.CMMapModule)) reject({msg: `${moduleList.CMMapModule} 模块未定义`});
            if(!isRegisteredMethod(moduleList.CMMapModule, 'pushToCtrlGetLocation')) reject({msg: `pushToCtrlGetLocation 方法未定义`});

            getModule(moduleList.CMMapModule).pushToCtrlGetLocation(data=> {
                resolve(data)
            })
        })
    },
    /**
     * 直接获取当前位置
     */
    getLocation() {
        return new Promise((resolve, reject)=> {
            if(!isRegisteredModule(moduleList.event)) reject({msg: `${moduleList.event} 模块未定义`});
            if(!isRegisteredMethod(moduleList.event, 'getLocation')) reject({msg: `getLocation 方法未定义`});
            
            getModule(moduleList.event).getLocation(data=> {
                resolve(data)
            })
        })
    },
    /**
     * 调起扫一扫
     */
    scanCode() {
        return new Promise((resolve, reject)=> {
            if(!isRegisteredModule(moduleList.event)) reject({msg: `${moduleList.event} 模块未定义`});
            if(!isRegisteredMethod(moduleList.event, 'scanQR')) reject({msg: `scanQR 方法未定义`});
    
            getModule(moduleList.event).scanQR(data=> {
                resolve(data)
            })
        })
    },
    /**
     * 获取蓝牙列表--持续监听只能用回调
     */
    getBluetoothDevices(func) {
            if(!isRegisteredModule(moduleList.event)) return;
            if(!isRegisteredMethod(moduleList.event, 'beginScanPerpheral')) return;
    
            getModule(moduleList.event).beginScanPerpheral(data=> {
                func(data)
            });
    },
    /**
     * 自动连接最后一次连接的蓝牙
     */
    autoConnectBlueTooth() {
        return new Promise((resolve, reject)=> {
            if(!isRegisteredModule(moduleList.event)) reject({msg: `${moduleList.event} 模块未定义`});
            if(!isRegisteredMethod(moduleList.event, 'autoConnectLastPeripheral')) reject({msg: `autoConnectLastPeripheral 方法未定义`});
    
            getModule(moduleList.event).autoConnectLastPeripheral(data=> {
                resolve(data)
            })
        })
    },
    /**
     * 连接蓝牙, 通过 getBluetoothDevices 获取到列表的下标
     */
    connectBlueTooth(index) {
        return new Promise((resolve, reject)=> {
            if(!isRegisteredModule(moduleList.event)) reject({msg: `${moduleList.event} 模块未定义`});
            if(!isRegisteredMethod(moduleList.event, 'connectPeripheral')) reject({msg: `connectPeripheral 方法未定义`});
            if(index == '' || index == 'undefined') reject({msg: '请传入蓝牙标识'});
    
            getModule(moduleList.event).connectPeripheral(index, (data)=> {
                resolve(data)
            })
        })
    },
    /**
     * 蓝牙打印小票, 传入json字符串
     */
    bluetoothPrinte(jsonStr) {
        return new Promise((resolve, reject)=> {
            if(!isRegisteredModule(moduleList.event)) reject({msg: `${moduleList.event} 模块未定义`});
            if(!isRegisteredMethod(moduleList.event, 'bluetoothPrinte')) reject({msg: `bluetoothPrinte 方法未定义`});
            if(jsonStr == '' || jsonStr == 'undefined') reject({msg: '请传入json字符串'});
    
            getModule(moduleList.event).bluetoothPrinte(jsonStr, (data)=> {
                resolve(data)
            })
        })
    },
    /**
     * 跳转到第三方app
     * @param {*} schemes 
     */
    navigateToApp(schemes) {
        return new Promise((resolve, reject)=> {
            if(!isRegisteredModule(moduleList.event)) reject({msg: `${moduleList.event} 模块未定义`});
            if(!isRegisteredMethod(moduleList.event, 'openThirdApplication')) reject({msg: `openThirdApplication 方法未定义`});
            if(schemes == '' || schemes == 'undefined') reject({msg: '请传入 url schemes'});

            getModule(moduleList.event).openThirdApplication(schemes,(data)=> {
                if(data == 'fail') {
                    reject({msg: '请先安装 APP'})
                }else {
                    resolve()
                }

            })
            
        })
    },
    /**
     * 显示 loading
     * @param {*} text 
     */
    showLoading(text) {
        return new Promise((resolve, reject)=> {
            if(!isRegisteredModule(moduleList.CMWXProgressHUDModule)) reject({msg: `${moduleList.CMWXProgressHUDModule} 模块未定义`});
            if(!isRegisteredMethod(moduleList.CMWXProgressHUDModule, 'showHUDWithParams')) reject({msg: `showHUDWithParams 方法未定义`});
    
            const status = text ? 'normal' : 'show'
    
            getModule(moduleList.CMWXProgressHUDModule).showHUDWithParams({
                status: status,
                content: text
            })
            resolve()
        })
    },
    /**
     * 隐藏 loading
     */
    hiddenLoading() {
        return new Promise((resolve, reject)=> {
            if(!isRegisteredModule(moduleList.CMWXProgressHUDModule)) reject({msg: `${moduleList.CMWXProgressHUDModule} 模块未定义`});
            if(!isRegisteredMethod(moduleList.CMWXProgressHUDModule, 'showHUDWithParams')) reject({msg: `showHUDWithParams 方法未定义`});
    
            getModule(moduleList.CMWXProgressHUDModule).showHUDWithParams({
                status: 'dismiss',
            })
            resolve()
        })
    },
    /**
     * 显示带状态的 toast 弹窗
     * @param {*} op 
     */
    showStatusToast(op) {
        return new Promise((resolve, reject)=> {
            if(!isRegisteredModule(moduleList.CMWXProgressHUDModule)) reject({msg: `${moduleList.CMWXProgressHUDModule} 模块未定义`});
            if(!isRegisteredMethod(moduleList.CMWXProgressHUDModule, 'showHUDWithParams')) reject({msg: `showHUDWithParams 方法未定义`});
            if(['success', 'error', 'info'].indexOf(op.status) <= -1) reject({msg: '请传入正确的状态值'})
    
            getModule(moduleList.CMWXProgressHUDModule).showHUDWithParams({
                status: op.status,
                content: op.content
            })
            resolve()
        })
    }
}