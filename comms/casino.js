const Discord = require('discord.js');

function casino(message,args,Membed){
    if(args[0]=='' || args[0]==undefined){
        Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
        .addFields({ name: 'Seleccione un juego: ', value: 'Blackjack\n', inline: true },);

        message.channel.send({embeds: [Membed]});
    }else{
        switch (args[0]){
            case 'blackjack':
                try {
                    black(message,Membed);   
                } catch (error) {
                    message.channel.send(error);
                }
                break;
        }
    }
}

function black(message,Membed){
    var cartas=[{n:'A♠',value:11},{n:'A♣',value:11},{n:'A♦',value:11},{n:'A♥',value:11},
        {n:'2♠',value:2},{n:'2♣',value:2},{n:'2♦',value:2},{n:'2♥',value:2},
        {n:'3♠',value:3},{n:'3♣',value:3},{n:'3♦',value:3},{n:'3♥',value:3},
        {n:'4♠',value:4},{n:'4♣',value:4},{n:'4♦',value:4},{n:'4♥',value:4},
        {n:'5♠',value:5},{n:'5♣',value:5},{n:'5♦',value:5},{n:'5♥',value:5},
        {n:'6♠',value:6},{n:'6♣',value:6},{n:'6♦',value:6},{n:'6♥',value:6},
        {n:'7♠',value:7},{n:'7♣',value:7},{n:'7♦',value:7},{n:'7♥',value:7},
        {n:'8♠',value:8},{n:'8♣',value:8},{n:'8♦',value:8},{n:'8♥',value:8},
        {n:'9♠',value:9},{n:'9♣',value:9},{n:'9♦',value:9},{n:'9♥',value:9},
        {n:'10♠',value:10},{n:'10♣',value:10},{n:'10♦',value:10},{n:'10♥',value:10},
        {n:'J♠',value:10},{n:'J♣',value:10},{n:'J♦',value:10},{n:'J♥',value:10},
        {n:'Q♠',value:10},{n:'Q♣',value:10},{n:'Q♦',value:10},{n:'Q♥',value:10},
        {n:'K♠',value:10},{n:'K♣',value:10},{n:'K♦',value:10},{n:'K♥',value:10},
    ];

    var cant=5,jugadores=[],jugadorestext='';

    Membed.setColor('#0099ff').setTimestamp().setFooter({text: 'CIVUS', iconURL: message.guild.iconURL()})
    .addFields({ name: 'BlackJack: ', value: jugadores.length+'/'+cant+' jugadores', inline: true },)
    .addFields({ name: 'Jugadores: ', value: '-', inline: false },)
    .addFields({ name: 'Tiempo de espera: ', value: '12s', inline: false },);
    
    message.channel.send({embeds: [Membed],
        components: [
            {type: 1, components: [
                    {type: 2, label: "Unirse", style: 'SUCCESS', custom_id: "unirse"},
            ]},
        ]
    });

    const filter = l => l.customId === 'unirse';
    const collector = message.channel.createMessageComponentCollector({ filter, time: 12000 });

    collector.on('collect', async l => {
        if(l.customId=='unirse'){
            var esta=false;

            jugadores.forEach(element => {
                if(element.id==l.user.id){
                    esta=true;
                }
            });

            if(esta==false){
                jugadores.push({id:l.user.id, mano:'', puntos:0, name:l.user.username, As:0, out:false});
                jugadorestext+=`${'<@'+l.user.id+'>'} `;
            }

            Membed.fields[0] = { name: 'BlackJack: ', value: jugadores.length+'/'+cant+' jugadores', inline: true };
            Membed.fields[1]={ name: 'Jugadores: ', value: jugadorestext, inline: false };

            l.update({embeds: [Membed]});
        }
    });

    var cartaI=52;
    
    collector.on('end', async l => {
        
        if(jugadores.length>0){
            const embed = new Discord.MessageEmbed();

            var puntosD=0, manoD='', AsD=0;
            var i=Math.floor(Math.random()*cartaI);
            cartaI--;

            manoD+=cartas[i].n;
            puntosD+=cartas[i].value;
            if(cartas[i].value==11){
                AsD++;
            }
            if(cartas[i].value==11 && puntosD>21){
                puntosD-=10;
                AsD--;
            }           

            cartas.push(cartas.splice(i, 1)[0]);

            embed.setColor('#0099ff').setTimestamp().setFooter({text: 'CIVUS', iconURL: message.guild.iconURL()})
            .addFields({ name: 'Dealer : ', value: manoD+' = '+puntosD },);
            
            jugadores.forEach(element => {

                for (let j=0; j<2;j++) {
                    i=Math.floor(Math.random()*cartaI);
                    cartaI--;
                        
                    element.mano+=' '+cartas[i].n;
                    if(cartas[i].value==11){
                        element.As=element.As+1;
                    }
                    if(cartas[i].value==11 && (element.puntos+cartas[i].value)>21){
                        element.puntos-=10;
                        element.As=element.As-1;
                    }else{
                        element.puntos+=cartas[i].value;
                    }
                    cartas.push(cartas.splice(i, 1)[0]);
                }
                
                embed.addFields({ name: element.name+' :', value: element.mano+' = '+element.puntos },)
            });
            embed.addFields({ name: 'Log :', value: 'Turno de '+jugadores[0].name},)
    
            message.channel.send({embeds: [embed],
                components: [
                    {type: 1, components: [
                            {type: 2, label: "Pedir", style: 'PRIMARY', custom_id: "sig"},
                            {type: 2, label: "Quedarse", style: 'PRIMARY', custom_id: "quedar"},
                            {type: 2, label: "Salir", style: 'DANGER', custom_id: "salir"},
                    ]},
                ]
            });

            const filtro = x => x.customId === 'sig'||'quedar'||'salir';
            const collector2 = message.channel.createMessageComponentCollector({ filtro, time: 60000 });

            var turno=0, outs=0, terminar=false;
            collector2.on('collect', async x => {
                collector2.resetTimer();
                if(turno<jugadores.length){
                    if(x.user.id==jugadores[turno].id && jugadores[turno].out==false){
                        switch (x.customId) {
                            case 'sig':
                                var i=Math.floor(Math.random()*cartaI);
                                cartaI--;
            
                                jugadores[turno].mano+=' '+cartas[i].n;
                                jugadores[turno].puntos+=cartas[i].value

                                embed.fields[turno+1]={ name: jugadores[turno].name+' :', value: jugadores[turno].mano+' = '+jugadores[turno].puntos };

                                if(cartas[i].value==11){
                                    jugadores[turno].As+=1;
                                }
                                if(jugadores[turno].puntos>21){
                                    if(jugadores[turno].As>0){
                                        jugadores[turno].As=jugadores[turno].As-1;
                                        jugadores[turno].puntos-=10;
                                        embed.fields[turno+1]={ name: jugadores[turno].name+' :', value: jugadores[turno].mano+' = '+jugadores[turno].puntos }
                                    }else{
                                        jugadores[turno].out=true;
                                        outs++;
                                        embed.fields[turno+1]={ name: jugadores[turno].name+' (Perdio):', value: jugadores[turno].mano+' = '+jugadores[turno].puntos }
                                        turno++;
                                    }
                                }
                                cartas.push(cartas.splice(i, 1)[0]);

                            break;
                            case 'quedar':
                                embed.fields[turno+1]={ name: jugadores[turno].name+' (Plantado):', value: jugadores[turno].mano+' = '+jugadores[turno].puntos }
                                jugadores[turno].out=true;
                                turno++;
                            break;
                            case 'salir':
                                jugadores.splice(turno,1);
                                outs++;
                                turno++;
                            break;
                        }
                    }
                }

                if(outs==jugadores.length){
                    embed.fields[jugadores.length+1]={ name: 'Log :', value: 'Gana la casa'};

                    terminar=true;
                }else if(turno>=jugadores.length){
                    do{
                        i=Math.floor(Math.random()*cartaI);
                        cartaI--;
                        
                        manoD+=cartas[i].n;

                        if(cartas[i].value==11){
                            AsD++;
                        }
                        if((puntosD+cartas[i].value)>21 && AsD>0){
                            puntosD+=1;
                            AsD--;
                        }else{
                            puntosD+=cartas[i].value;
                        } 

                        cartas.push(cartas.splice(i, 1)[0]);
                    }while(puntosD<16);

                    embed.fields[0]={ name: 'Dealer : ', value: manoD+' = '+puntosD };
                    terminar=true;

                }else if(turno<jugadores.length){
                    embed.fields[jugadores.length+1]={ name: 'Log :', value: 'Turno de '+jugadores[turno].name};
                }
                if(outs!=jugadores.length && terminar==true){
                    var ganadores='Ganador/s ', cont=0;

                    jugadores.forEach(element => {
                        if(element.puntos>puntosD && element.puntos<22){
                            ganadores+=element.name+' ';
                            cont++;
                        }
                    });
                    if(cont==0){
                        embed.fields[jugadores.length+1]={ name: 'Log :', value: 'Gana la casa'};
                    }else{
                        embed.fields[jugadores.length+1]={ name: 'Log :', value: ganadores};
                    }
                }

                x.update({embeds: [embed]});

                if(terminar==true){
                    collector2.stop();
                }
            });

            collector2.on('end', async x => {

            });
        }
    });
}

module.exports={casino};