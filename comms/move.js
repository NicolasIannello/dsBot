function move(muevo, id,args){
    var canales=['479806401338933262',  //eskere
                '684237944831213624',   //dois
                '706349634708045854',   //virgolos
                '875076057210970212'    //rincon
    ];
    //. 707609075235422298
    try{
        
        if(id!='707609075235422298'){
            switch (args) {
                case 'eskere':
                    muevo.voice.setChannel(canales[0]);    
                    return 'movido';
                    break;
                case 'dois':
                    muevo.voice.setChannel(canales[1]);
                    return 'movido';
                    break;    
                case 'virgolos':
                    muevo.voice.setChannel(canales[2]);
                    return 'movido';
                    break;
                case 'rincon':
                    muevo.voice.setChannel(canales[3]);
                    return 'movido';
                    break;
                default:
                    var cont=0;
                    canales.forEach(element=>{ 
                        if(id == element){
                            canal=cont+1;
                        }else{
                            cont++;
                        }
                    });
                    if(canal>3){
                        canal=0;
                    }
                    muevo.voice.setChannel(canales[canal]);
                    return 'movido';
                    break;
                break;
            }
        }else{
            return "No se lo puede mover del canal";
        }
    }catch(error){
        return "Argumentos inválidos virgil :(";
    }
}
module.exports = {move}