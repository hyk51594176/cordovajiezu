
let imgList={}
addImg('A')
addImg('B')

function addImg(key){
    for(let i=1;i<11;i++){
        addstatusImg(key,i)
    }
}
function addstatusImg(key,index){
    let j; 
    if(index<10){
        j = '0'+index
    }else{
        j = index
    }
    imgList[key+index]={}
    for(let i=1;i<7;i++){
        imgList[key+index]['status'+i]= require(`../assets/mapareaImg/bigmap-status${i}-${key.toLocaleLowerCase()+j}.png`)
    }
}
 
export default imgList