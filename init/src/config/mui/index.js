const  toast = (msg,duration,type) => {
    msg= msg || ''
    duration= duration || 'long'
    type= type || 'div'
    mui.toast('登陆成功',{ duration:'long', type:'div' }) 
}

export default toast