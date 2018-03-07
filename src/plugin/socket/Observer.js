// import Emitter from './Emitter'

export default class {

    constructor(connection, store) {
        if (store) this.store = store;
       this.reconnect(connection)
    }
    reconnect (connection){
        this.Socket = new WebSocket(connection);
         this.Socket.onclose = ()=>{
            this.reconnect(connection)
        }
        this.Socket.onerror = e => {
            // this.reconnect(connection)
        }
        this.onEvent()
    }
    onEvent() {
        let _this = this;
        let linsiters = []
        let msgList = []
        let isconnect = false
        this.Socket.on = (value, fn) => {
            linsiters.push({ msgType: value, fn: fn })
        }

        this.Socket.emit = (msgType, data={}) => {
             let msgData ;
            if(typeof msgType === 'number'){
                msgData=JSON.stringify({ msgType: msgType, ...data })
            }else{
                msgData=JSON.stringify(msgType)
            }
            if (isconnect) {
                this.Socket.send(msgData)
            } else {
                msgList.push(msgData)
            }
        }
      
        this.Socket.onopen = e => {
                isconnect = true
                msgList.forEach((data,index) => {
                    this.Socket.send(data)
                    msgList.splice(index,1)
                })
            this.Socket.onmessage = (event) => {
                let data = JSON.parse(event.data || {})
                if (_this.store) _this.commitStore('SOCKET_' + data.msgType, data)
                linsiters.forEach((obj) => {
                    if (obj.msgType == data.msgType) {
                        obj.fn(data)
                    }
                });
            };
        }
    }
    commitStore(type, payload) {
        if (this.store._mutations[type]) {
            this.store.commit(type, payload)
        }
    }

}
