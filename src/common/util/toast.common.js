function getModal() {
    let modal = null;
    return ()=> {
        if(modal == null) {
           return modal = weex.requireModule('modal')
        }
        return modal
    }
}
function toast(msg) {
    const modal = getModal()();
    modal.toast({
        message: msg,
        duration: 1
    })
}

export default toast
