export const baseURL=  process.env.NODE_ENV === 'production'
        ?'http://211.253.27.204/iface/app/api'
        :'/iface/app/api'
export const socketConf=  process.env.NODE_ENV === 'production'
?'ws://211.253.27.204/iface/app/api/custService.ws'
:'ws://211.253.27.204/iface/app/api/custService.ws'