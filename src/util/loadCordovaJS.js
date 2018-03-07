export default function(){
    let head= document.getElementsByTagName('head')[0]; 
    let script= document.createElement('script'); 
    script.async =true
    script.type= 'text/javascript'; 
    script.src= process.env.NODE_ENV === 'production'?'./cordova.js':'./static/cordova/cordova.js'
    head.appendChild(script);
}