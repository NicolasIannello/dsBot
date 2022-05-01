const { Client, MessageAttachment, Permissions ,Intents,MessageActionRow, MessageButton} = require('discord.js');
const Discord = require('discord.js');
const inspector = require('inspector');
const permissions = new Permissions(BigInt(41090560));
const allIntents = new Intents(32767);
const client = new Client({ intents: allIntents });
require('dotenv').config();
const desc = ["Nacho, el niño virgo", "Barco, el bocho", "Alejo, la gorda", "Fer, el niño de cristal", "Yano, el autista", "Lotzo, el hippie", "Morgan <3", "Alva, El chichi Peralta", "Nacho, el simp", "Eroncho, ¿Jugó Platini?"];
const comandos = ".peron\n.virgo\n.masgrande\n.lumpen\n.svinfo\n.frase\n.tetona\n.move @user <canal>\n.mute @user <segundos>\n.deaf @user <segundos>\n.play <cancion>\n.playlist\n.ttt\n.ttt2\.brawl"
const frase = ["Ño Ño", "MUY pelotudo!", "Per di da zo", "Este tipo está quemado", "Dea dea", "No me la container", "No da más de pelotudo", "Sí nene", "Dale negrito", "Se va muteado", "Bien muteado", "Bien muerto", "Olvidafter", "Niño de cristal", "Poco huevo", "Naaaashe", "Ido", "MOOOY PICUSO", "EL REY"];
const boca = ["https://imgur.com/MW4zdiA.png", "https://imgur.com/riL4WUY.png", "https://imgur.com/Qbvaevv.png", "https://imgur.com/cJRRTgA.png", "https://imgur.com/XiM7gGc.png", "https://imgur.com/iCs5PQU.png", "https://imgur.com/PBElkZ0.png", "https://imgur.com/3frkUvM.png", "https://imgur.com/nbAuGtd.png", "https://imgur.com/aG0BPWa.png"]
const prefix = ".";
const Playlist=require('./comms/playlist.js');
const play=require('./comms/play.js');
const brawlhalla=require('./comms/brawlhalla.js');
const { joinVoiceChannel,createAudioPlayer,createAudioResource,entersState,StreamType,AudioPlayerStatus,VoiceConnectionStatus, } = require('@discordjs/voice');
const playcommandos='.playlist crear <nombre de playlist>\n.playlist añadir "nombre playlist" <nombre cancion>\n.playlist play <nombre playlist>\n.playlist shuffle <nombre playlist>\n.playlist publica/privada <nombre playlist>\n.playlist info <nombre playlist>\n.playlist eliminar <nombre playlist>'

client.on('ready', () =>{
    console.log("Connected as " + client.user.tag)
    client.user.setActivity('a BocaOOOAAAAAOAOAOAOAAO', { type: 'WATCHING' })//.then(presence=>console.log(`Activity set to ${presence.activities[0].name}`)).catch(console.error);

    client.on('messageCreate',async message => {
        const Membed = new Discord.MessageEmbed();

        if(message.content === prefix + 'peron'){
            const attach = new MessageAttachment("https://imgur.com/GUVB93l.png")
            message.channel.send(attach);
        }
        if(message.content === prefix + 'virgo'){
            const attach = new MessageAttachment("https://imgur.com/0kMQabL.png")
            message.channel.send(attach);
        }
        if(message.content == prefix + 'cristal'){
            message.channel.send("El top se actualizo!")
            message.channel.send("Top 5 niños de cristal: \n 1) Eroncho.\n 2) Fernan floo.\n 3) Lotzo.\n 4) Luxipoo.\n 5) Alejo \"Tetona\" Marquez.  ");
        }
        if(message.content === prefix + 'alejo'){
            let alejoTetona = new Discord.MessageEmbed()
                .attachFiles(["https://media.giphy.com/media/r9J271atbOz0sHYhr5/giphy.gif"]);
            message.channel.send(alejoTetona);
        }

        if (message.content === prefix + 'lumpen') {
            var randomValue = desc[Math.floor(Math.random() * desc.length)];
            message.channel.send(randomValue);
        } 
        if(message.content == prefix + 'svinfo'){
            var serverIcon = message.guild.iconURL();
            const infosv = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Informacion del servidor')
                .setAuthor('Civus')
                .setDescription('La cueva de los virgos')
                .addField("Dueño", `${message.guild.owner}`, true)
                .addField('Miembros', '`' + message.guild.memberCount + '`', true)
                .setImage(serverIcon)
                .setFooter('CIVUS',serverIcon)
                .setTimestamp()
            message.channel.send(infosv);
        }
        if(message.content === prefix + 'comandos'){
            Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
            .addFields({ name: 'comandos: ', value: comandos, inline: true },);

            message.channel.send({embeds: [Membed]});
        }
        if(message.content === prefix + 'tetona'){
            const attach = new MessageAttachment("https://imgur.com/q5FFURg.png")
            message.channel.send(attach);
        }
        if(message.content === prefix + 'frase'){
            var randomValue = frase[Math.floor(Math.random() * frase.length)];
            message.channel.send(randomValue);
        }
        if(message.content === prefix + 'gorda'){
            message.channel.send("Entró la gorda tetona", {tts: true});
        }
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
        //const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const args = message.content.split(/ +/g);
        const comm = args.shift().toLowerCase();

        /*if(comm.match(/^\.(play|playlist|pool|mute|deaf|move|peron|virgo|masgrande|lumpen|svinfo|frase|tetona|comandos|disconnect|test|ttt||ttt2)/g)!=null){
            message.channel.send('Comando equivocado');
        }*/

        if(comm==='.move'){
            console.log(comm+' || '+Date()+` || ${message.author.username}`);
            var canales=['479806401338933262',  //eskere
                        '684237944831213624',   //dois
                        '706349634708045854',   //virgolos
                        '875076057210970212'    //rincon
            ];
            //. 707609075235422298
            try{
                var muevo=message.mentions.members.first();
                if(muevo.voice.channel.id!='707609075235422298'){
                    switch (args[1]) {
                        case 'eskere':
                            muevo.voice.setChannel(canales[0]);    
                            message.channel.send(`${message.author} movio a ${muevo} del canal `+muevo.voice.channel.name+' al canal '+args[1]);
                            break;
                        case 'dois':
                            muevo.voice.setChannel(canales[1]);
                            message.channel.send(`${message.author} movio a ${muevo} del canal `+muevo.voice.channel.name+' al canal '+args[1]);
                            break;    
                        case 'virgolos':
                            muevo.voice.setChannel(canales[2]);
                            message.channel.send(`${message.author} movio a ${muevo} del canal `+muevo.voice.channel.name+' al canal '+args[1]);
                            break;
                        case 'rincon':
                            muevo.voice.setChannel(canales[3]);
                            message.channel.send(`${message.author} movio a ${muevo} del canal `+muevo.voice.channel.name+' al canal '+args[1]);
                            break;
                        case undefined:
                            var cont=0;
                            canales.forEach(element=>{ 
                                if(muevo.voice.channel.id == element){
                                    canal=cont+1;
                                }else{
                                    cont++;
                                }
                            });
                            if(canal>3){
                                canal=0;
                            }
                            muevo.voice.setChannel(canales[canal]);
                            message.channel.send(`${message.author} movio a ${muevo} del canal `+muevo.voice.channel.name+' al siguiente canal');
                            break;
                        default:
                            message.channel.send("Canal no encontrado stupid :(");
                        break;
                    }
                }else{
                    message.channel.send("No se lo puede mover del canal");
                }
            }catch(error){
                message.channel.send("Argumentos inválidos virgil :(");
            }
        }
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
        if(comm==='.mute' || comm==='.deaf'){
            console.log(comm+' || '+Date()+` || ${message.author.username}`);

            try{
                var i=0, canal=message.member.voice.channel, si=0, no=0, users=[], segundos=parseInt(args[1])*1000, 
                gil=false, spam=false, muteo=message.mentions.members.first();
                

                for(let member of canal.members){
                    var objeto = { miembro:member[1].id,voto:false}
                    users.push(objeto);
                    i++;
                    console.log(member[1].id);
                }
                i=(i+1)*0.6;
                i=Math.trunc(i);

                Membed.setColor('#0099ff')/*.setAuthor(`${message.author.username}`, message.author.avatarURL())*/.setThumbnail(message.author.avatarURL())
                .addFields(
                    { name: "Votos a favor", value: si+'/'+i, inline: true },
                    { name: 'Votos en contra', value: no+'/'+i, inline: true },
                ).setTimestamp().setFooter('CIVUS', message.guild.iconURL());
                
                if(typeof args[1] == "string" && isNaN(segundos)==false){
                    if(parseInt(args[1])<=60){   
                        if(comm==="mute"){
                            Membed.setTitle('Quiere mutear a:');   
                        }else{
                            Membed.setTitle('Quiere ensordecer a:');  
                        }
                        Membed
                        .setDescription(`${muteo} por `+args[1]+'s');
                    }else{
                        gil=true;
                        Membed.setTitle('Se fue al choto')
                        if(comm==="mute"){
                            Membed.setDescription(`Muteenlo por `+args[1]+'s'); 
                        }else{
                            Membed.setDescription(`Ensordecer por `+args[1]+'s');
                        }
                    }
                }else{
                    throw "jejox";
                }
             
                message.channel.send({embeds: [Membed]}).then(embdReact => {
                    embdReact.react('🟩');
                    embdReact.react('🟥');
                    embdReact.react('⛔');

                    const filter = (reaction, user) => {
                        return ['🟩','🟥','⛔'].includes(reaction.emoji.name) && user.id;
                    };

                    const collector = embdReact.createReactionCollector(filter);

                    setTimeout(()=>{ 
                        Membed.addFields({ name: `----------------------------------------`, value: 'Termino el tiempo de la votacion', inline: false },);
                        embdReact.edit({embeds: [Membed]});
                        collector.stop();
                    },60000);


                    collector.on('collect',(reaction,user)=>{
                        users.forEach(users => {
                            if(users.miembro==user && users.voto==false && reaction.emoji.name!='⛔'){
                                users.voto=true;
                                if(reaction.emoji.name==='🟩'){
                                    si++;
                                    if(gil==true){
                                        Membed.fields[0] = { name: "Votos a favor", value: si+'/'+i, inline: true };
                                        embdReact.edit({embeds: [Membed]});
                                    }else{
                                        Membed.fields[0] = { name: "Votos a favor", value: si+'/'+i, inline: true };
                                        embdReact.edit({embeds: [Membed]});
                                    }
                                }else if(reaction.emoji.name==='🟥'){
                                    no++;
                                    if(gil==true){
                                        Membed.fields[1] = { name: 'Votos en contra', value: no+'/'+i, inline: true };
                                        embdReact.edit({embeds: [Membed]});
                                    }else{
                                        Membed.fields[1] = { name: 'Votos en contra', value: no+'/'+i, inline: true };
                                        embdReact.edit({embeds: [Membed]});
                                    }
                                }
                                if(si>=i){
                                    if(gil==true){
                                        Gil();
                                    }else{
                                        Mutear();
                                    }
                                    collector.stop();
                                }else if(no>=i){
                                    Membed.addFields({ name: `----------------------------------------`, value: `${muteo} safo, cagones`, inline: false },);
                                    embdReact.edit({embeds: [Membed]});
                                    collector.stop();
                                }
                            }else if(users.miembro==user && users.voto==true && reaction.emoji.name!='⛔'){
                                reaction.users.remove(user);
                                message.channel.send(`Quiere votar dos veces EL HIJO DE PUTA DE ${user}`);
                            }else if(reaction.emoji.name==='⛔' && user==users.miembro){
                                if(gil==true && spam==false){
                                    message.channel.send(`Quiere cancelar la votacion el cagon de ${user}`);
                                    spam=true;
                                }else if(gil==false){
                                    Membed.addFields({ name: "Se cancelo la votacion", value: 'CAGON', inline: false },);
                                    embdReact.edit({embeds: [Membed]});
                                    collector.stop();
                                }
                            }
                        }); 
                    })
                    function Mutear(){
                        if(comm==="mute"){
                            muteo.voice.setMute(true);
                            setTimeout(()=>{ 
                                muteo.voice.setMute(false);
                            },segundos);
                            Membed.addFields({ name:`----------------------------------------`, value: `${muteo} se fue mutea3, fucking virgil`, inline: false },);
                        }else{
                            muteo.voice.setDeaf(true);
                            setTimeout(()=>{ 
                                muteo.voice.setDeaf(false);
                            },segundos);
                            Membed.addFields({ name:`----------------------------------------`, value: `${muteo} se fue ensordeci3, fucking virgil`, inline: false },);
                        }
                        embdReact.edit({embeds: [Membed]});
                    }
                    function Gil(){
                        if(comm==="mute"){
                            message.member.voice.setMute(true);
                            setTimeout(()=>{ 
                                message.member.voice.setMute(false);
                            },segundos);
                            message.channel.send("Mutea3");
                        }else{
                            message.member.voice.setDeaf(true);
                            setTimeout(()=>{ 
                                message.member.voice.setDeaf(false);
                            },segundos);
                            message.channel.send("Ensordeci3");
                        }
                    }
                }) 

            }catch(error){
                message.channel.send("Argumentos inválidos virgil :(");
            }
        }
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//---------||----||--------------------------------------------------------------------------------------------------------------------------
        if(comm==='.pool'){
            var emo=['⬜','🟥','🟩','🟦','🟨','🟪','🟫','🟦','🟧','⬛'], a=10, votos=[], users=[];
            console.log(comm+' || '+Date()+` || ${message.author.username}`);

            if(args.length<=10){
                a=args.length;
            }
            const list = message.channel;
           
            for(let member of list.members){
                var objeto = { miembro:member[1].id,voto:false}
                users.push(objeto);
            }

            Membed.setColor('#0099ff')/*.setAuthor(datos)*/.setThumbnail(message.guild.iconURL())
            .setTimestamp().setFooter('CIVUS', message.guild.iconURL()).setTitle('Inicio una votacion');
                    
            for (let index = 0; index<a; index++) {
                Membed.addFields({ name: args[index], value: 'Sin votos', inline: false },)
            }

            message.channel.send({embeds: [Membed]}).then(embdReact => {
                for (let index = 0; index<a; index++) {
                    votos[index]='';
                    embdReact.react(emo[index]); 
                }

                const filter = (reaction,user) => {
                    return [emo[0],emo[1],emo[2],emo[3],emo[4],emo[5],emo[6],emo[7],emo[8],emo[9]].includes(reaction.emoji.name) && user.id;
                };

                const collector = embdReact.createReactionCollector(filter);
            
                setTimeout(()=>{ 
                    Membed.addFields({ name: `----------------------------------------`, value: 'Termino el tiempo de la votacion', inline: false },);
                    embdReact.edit({embeds: [Membed]});
                    collector.stop();
                },60000);

                collector.on('collect',(reaction, user)=>{
                    users.forEach(users => {
                        if(users.miembro==user && users.voto==false ){
                            if(user=='801301485803012126'){
                                users.voto=false;
                            }else{
                                users.voto=true;
                                for (let index = 0; index<a; index++) {
                                    if(reaction.emoji.name==emo[index]){
                                        console.log(reaction.emoji.name+' VS '+emo[index]);
                                        var x=votos[index]+=emo[index];
                                        Membed.fields[index] = { name: args[index], value: x, inline: false };
                                        embdReact.edit({embeds: [Membed]});
                                    }
                                }
                            }
                            /*for (let index = 0; index<a; index++) {
                                if(reaction.emoji.name==emo[index]){
                                    console.log(reaction.emoji.name+' VS '+emo[index]);
                                    var x=votos[index]+=emo[index];
                                    Membed.fields[index] = { name: args[index], value: x, inline: false };
                                    //embdReact.edit({embeds: [Membed]});
                                }
                            }
                            embdReact.edit({embeds: [Membed]});*/
                        }
                    })
                })
            })
        }
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//---------||----||--------------------------------------------------------------------------------------------------------------------------
        if(comm==='.play'){
            console.log(comm+' || '+Date()+` || ${message.author.username}`);
       
            play.reproducir(message,args,false);
        }
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//---------||----||--------------------------------------------------------------------------------------------------------------------------
        if(comm=='.masgrande'){
            var randomValue = boca[Math.floor(Math.random() * boca.length)];

            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            })
            
            const player = createAudioPlayer();
            const stream = ytdl("https://www.youtube.com/watch?v=Emp7ntPJm2w&ab_channel=chicho641",{filter:'audioonly',highWaterMark: 1 << 25,});
            const rsrc = createAudioResource(stream,{inputType:StreamType.Arbitrary});
                    
            connection.subscribe(player);
            player.play(rsrc);
                        
            setTimeout(() => {
                try {
                    connection.destroy(); 
                } catch (error) {
                    console.log(error);
                }  
            }, 150000);

            Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
            /*.setTitle(`${message.author.username}`)*/.setImage(randomValue)
            .addFields({ name: 'Reproduciendo ahora: ', value: 'LA 12 PAPÁ', inline: false },);

            message.channel.send({embeds: [Membed]});
        }
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//---------||----||--------------------------------------------------------------------------------------------------------------------------
        if(comm=='.ttt'){
            if(message.mentions.members.first()===undefined){
                message.channel.send("@ a alguien para jugar");
            }else{
                var boton=[], jugador=[], pieza='🔴',fin=false, cont=0, turno = Math.floor(Math.random() * 2); 
                jugador[0]=message.author.id, jugador[1]=message.mentions.members.first().id;
                
                if(turno==0){
                    turno=1;pieza='🔵';
                }else{
                    turno=0;pieza='🔴';
                }

                for (let index = 0; index < 9; index++) {
                    boton[index]={type: 2, label: "-", style: 'SECONDARY', custom_id: index, disabled: false};
                }

                Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
                .setTitle('TaTeTi').setThumbnail(message.author.avatarURL())
                .addFields({ name: 'Partida: ', value: `${message.author.username} VS ${message.mentions.members.first()}`, inline: false },);
                
                message.channel.send({embeds: [Membed],
                    components: [
                        {type: 1, components: [
                                {type: 2, label: "Aceptar", style: 'SUCCESS', custom_id: "aceptar"},
                                {type: 2, label: "Rechazar", style: 'DANGER', custom_id: "rechazar"},
                        ]},
                    ]
                });

                const filter = i => i.customId === 'aceptar'||'rechazar'||"1"||"2"||"3"||"4"||"5"||"6"||"7"||"8"||"0";
                const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

                collector.on('collect', async i => {
                    if (i.customId == 'aceptar' && i.user.id==jugador[1]) {
                        collector.resetTimer();
                        Membed.addFields({ name: '--------------------------------------', value: `Partida aceptada, empieza ${'<@'+jugador[turno]+'>'} con `+pieza, inline: false },);
                        i.update({embeds: [Membed],
                            components: [
                                {type: 1, components: [ boton[0], boton[1], boton[2], ]},
                                {type: 1, components: [ boton[3], boton[4], boton[5], ]},
                                {type: 1, components: [ boton[6], boton[7], boton[8], ]},
                            ] 
                        });
                    }else if(i.customId=='rechazar' && i.user.id==jugador[1]){
                        Membed.addFields({ name: '--------------------------------------', value: 'Partida rechazada', inline: false },);
                        i.update({embeds: [Membed], components: [] });
                        fin=true;
                        collector.stop()
                    }else{
                        if(i.user.id==jugador[turno]){
                            collector.resetTimer();
                            cont++;
                            for (let index = 0; index < 9; index++) {
                                if(i.customId==boton[index].custom_id){
                                    boton[index].label=pieza;
                                    boton[index].disabled=true
                                    if( (boton[0].label==boton[1].label && boton[1].label==boton[2].label && boton[2].label!='-') || (boton[3].label==boton[4].label && boton[4].label==boton[5].label && boton[5].label!='-') || (boton[6].label==boton[7].label && boton[7].label==boton[8].label && boton[8].label!='-') || (boton[0].label==boton[3].label && boton[3].label==boton[6].label && boton[6].label!='-') || (boton[1].label==boton[4].label && boton[4].label==boton[7].label && boton[7].label!='-') || (boton[2].label==boton[5].label && boton[5].label==boton[8].label && boton[8].label!='-') || (boton[0].label==boton[4].label && boton[4].label==boton[8].label && boton[8].label!='-') || (boton[2].label==boton[4].label && boton[4].label==boton[6].label && boton[6].label!='-') ){
                                        switch (true) {
                                            case (boton[0].label==boton[1].label && boton[1].label==boton[2].label && boton[2].label!='-'):
                                                boton[0].style='SUCCESS';boton[1].style='SUCCESS';boton[2].style='SUCCESS';
                                                break;
                                            case (boton[3].label==boton[4].label && boton[4].label==boton[5].label && boton[5].label!='-'):
                                                boton[3].style='SUCCESS';boton[4].style='SUCCESS';boton[5].style='SUCCESS';
                                                break;
                                            case (boton[6].label==boton[7].label && boton[7].label==boton[8].label && boton[8].label!='-'):
                                                boton[6].style='SUCCESS';boton[7].style='SUCCESS';boton[8].style='SUCCESS';
                                                break;
                                            case (boton[0].label==boton[3].label && boton[3].label==boton[6].label && boton[6].label!='-'):
                                                boton[0].style='SUCCESS';boton[3].style='SUCCESS';boton[6].style='SUCCESS';
                                                break;
                                            case (boton[1].label==boton[4].label && boton[4].label==boton[7].label && boton[7].label!='-'):
                                                boton[1].style='SUCCESS';boton[4].style='SUCCESS';boton[7].style='SUCCESS';
                                                break;
                                            case (boton[2].label==boton[5].label && boton[5].label==boton[8].label && boton[8].label!='-'):
                                                boton[2].style='SUCCESS';boton[5].style='SUCCESS';boton[8].style='SUCCESS';
                                                break;
                                            case (boton[0].label==boton[4].label && boton[4].label==boton[8].label && boton[8].label!='-'):
                                                boton[0].style='SUCCESS';boton[4].style='SUCCESS';boton[8].style='SUCCESS';
                                                break;
                                            case (boton[2].label==boton[4].label && boton[4].label==boton[6].label && boton[6].label!='-'):
                                                boton[2].style='SUCCESS';boton[4].style='SUCCESS';boton[8].style='SUCCESS';
                                                break;
                                        }
                                        Membed.addFields({ name: 'Resultado:', value: `${'<@'+jugador[turno]+'>'} gano la partida`, inline: false },);
                                        fin=true;
                                        i.update({embeds: [Membed],
                                            components: [
                                                {type: 1, components: [ boton[0], boton[1], boton[2], ]},
                                                {type: 1, components: [ boton[3], boton[4], boton[5], ]},
                                                {type: 1, components: [ boton[6], boton[7], boton[8], ]},
                                            ] 
                                        });
                                        collector.stop();
                                    }else if(cont==9){
                                        Membed.addFields({ name: 'Resultado:', value: 'Empate', inline: false },);
                                        fin=true;
                                        i.update({embeds: [Membed],
                                            components: [
                                                {type: 1, components: [ boton[0], boton[1], boton[2], ]},
                                                {type: 1, components: [ boton[3], boton[4], boton[5], ]},
                                                {type: 1, components: [ boton[6], boton[7], boton[8], ]},
                                            ] 
                                        });
                                        collector.stop()
                                    }else{
                                        i.update({embeds: [Membed],
                                            components: [
                                                {type: 1, components: [ boton[0], boton[1], boton[2], ]},
                                                {type: 1, components: [ boton[3], boton[4], boton[5], ]},
                                                {type: 1, components: [ boton[6], boton[7], boton[8], ]},
                                            ] 
                                        });
                                    }
                                }
                            }
                            /*if( (boton[0].label==boton[1].label && boton[1].label==boton[2].label && boton[2].label!='-') || (boton[3].label==boton[4].label && boton[4].label==boton[5].label && boton[5].label!='-') || (boton[6].label==boton[7].label && boton[7].label==boton[8].label && boton[8].label!='-') 
                            || (boton[0].label==boton[3].label && boton[3].label==boton[6].label && boton[6].label!='-') || (boton[1].label==boton[4].label && boton[4].label==boton[7].label && boton[7].label!='-') || (boton[2].label==boton[5].label && boton[5].label==boton[8].label && boton[8].label!='-')
                            || (boton[0].label==boton[4].label && boton[4].label==boton[8].label && boton[8].label!='-') || (boton[2].label==boton[4].label && boton[4].label==boton[6].label && boton[6].label!='-') )
                            {
                                message.channel.send(`${'<@'+jugador[turno]+'>'} gano la partida`);
                                fin=true;
                                collector.stop();
                            }else if(cont==9){
                                message.channel.send('Empate');
                                fin=true;
                                collector.stop()
                            }*/
                            if(turno==0){
                                turno=1;pieza='🔵';
                            }else{
                                turno=0;pieza='🔴';
                            }
                        }
                    }
                });

                collector.on('end', async i => {
                    if(fin==false){
                        message.channel.send(`Se le acabo el tiempo a ${'<@'+jugador[turno]+'>'}`);
                    }
                });
            }
        }
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//---------||----||--------------------------------------------------------------------------------------------------------------------------
        if(comm=='.ttt2'){
            if(message.mentions.members.first()===undefined){
                message.channel.send("@ a alguien para jugar");
            }else{
                var boton=[], jugador=[], pieza='🔴',fin=false, cont=0, turno = Math.floor(Math.random() * 2), accion='select', redo=false, ant=99, obs='-'; 
                jugador[0]=message.author.id, jugador[1]=message.mentions.members.first().id;
                
                if(turno==0){
                    turno=1;pieza='🔵';
                }else{
                    turno=0;pieza='🔴';
                }

                for (let index = 0; index < 9; index++) {
                    boton[index]={type: 2, label: "-", style: 'SECONDARY', custom_id: index, disabled: false};
                }

                Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
                .setTitle('TaTeTi').setThumbnail(message.author.avatarURL())
                .addFields({ name: 'Partida: ', value: `${message.author.username} VS ${message.mentions.members.first()}`, inline: false },);
                
                message.channel.send({embeds: [Membed],
                    components: [
                        {type: 1, components: [
                                {type: 2, label: "Aceptar", style: 'SUCCESS', custom_id: "aceptar"},
                                {type: 2, label: "Rechazar", style: 'DANGER', custom_id: "rechazar"},
                        ]},
                    ]
                });

                const filter = i => i.customId === 'aceptar'||'rechazar'||"1"||"2"||"3"||"4"||"5"||"6"||"7"||"8"||"0";
                const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });

                collector.on('collect', async i => {
                    if (i.customId == 'aceptar' && i.user.id==jugador[1]) {
                        collector.resetTimer();
                        Membed.addFields({ name: '--------------------------------------', value: `Partida aceptada, empieza ${'<@'+jugador[turno]+'>'} con `+pieza, inline: false },);
                        Membed.addFields({ name: 'Observaciones:', value: obs, inline: false },);
                        i.update({embeds: [Membed],
                            components: [
                                {type: 1, components: [ boton[0], boton[1], boton[2], ]},
                                {type: 1, components: [ boton[3], boton[4], boton[5], ]},
                                {type: 1, components: [ boton[6], boton[7], boton[8], ]},
                            ] 
                        });
                    }else if(i.customId=='rechazar' && i.user.id==jugador[1]){
                        Membed.addFields({ name: '--------------------------------------', value: 'Partida rechazada', inline: false },);
                        i.update({embeds: [Membed], components: [] });
                        fin=true;
                        collector.stop()
                    }else{
                        if(i.user.id==jugador[turno]){
                            collector.resetTimer();
                            cont++;
                            if(cont<=6){
                                for (let index = 0; index < 9; index++) {
                                    if(i.customId==boton[index].custom_id && boton[index].label=='-'){
                                        boton[index].label=pieza;
                                        i.update({embeds: [Membed],
                                            components: [
                                                {type: 1, components: [ boton[0], boton[1], boton[2], ]},
                                                {type: 1, components: [ boton[3], boton[4], boton[5], ]},
                                                {type: 1, components: [ boton[6], boton[7], boton[8], ]},
                                            ] 
                                        });
                                    }else if(i.customId==boton[index].custom_id && boton[index].label!='-'){
                                        obs+=`${'<@'+jugador[turno]+'>'} selecciona una de tus fichas \n`;
                                        Membed.fields[2]= { name: '--------------------------------------', value: obs, inline: false };
                                        i.update({embeds: [Membed],
                                            components: [
                                                {type: 1, components: [ boton[0], boton[1], boton[2], ]},
                                                {type: 1, components: [ boton[3], boton[4], boton[5], ]},
                                                {type: 1, components: [ boton[6], boton[7], boton[8], ]},
                                            ] 
                                        });
                                        redo=true;
                                        cont--;
                                    }
                                }
                            }else{
                                if(accion=='select'){
                                    for (let index = 0; index < 9; index++) {
                                        if(i.customId==boton[index].custom_id && pieza==boton[index].label){
                                            ant=index;
                                            boton[index].style='SUCCESS';
                                            i.update({embeds: [Membed],
                                                components: [
                                                    {type: 1, components: [ boton[0], boton[1], boton[2], ]},
                                                    {type: 1, components: [ boton[3], boton[4], boton[5], ]},
                                                    {type: 1, components: [ boton[6], boton[7], boton[8], ]},
                                                ] 
                                            });
                                            accion='mover';
                                        }else if(i.customId==boton[index].custom_id && pieza!=boton[index].label){
                                            obs+=`${'<@'+jugador[turno]+'>'} selecciona una de tus fichas \n`;
                                            Membed.fields[2]= { name: '--------------------------------------', value: obs, inline: false };
                                            i.update({embeds: [Membed],
                                                components: [
                                                    {type: 1, components: [ boton[0], boton[1], boton[2], ]},
                                                    {type: 1, components: [ boton[3], boton[4], boton[5], ]},
                                                    {type: 1, components: [ boton[6], boton[7], boton[8], ]},
                                                ] 
                                            });
                                            redo=true;
                                        }
                                    }
                                    redo=true;
                                }else if(accion=='mover'){
                                    for (let index = 0; index < 9; index++) {
                                        if(i.customId==boton[index].custom_id && boton[index].label=='-'){
                                            boton[index].style='SECONDARY';
                                            boton[index].label=pieza;
                                            boton[ant].label='-';
                                            boton[ant].style='SECONDARY';
                                            i.update({embeds: [Membed],
                                                components: [
                                                    {type: 1, components: [ boton[0], boton[1], boton[2], ]},
                                                    {type: 1, components: [ boton[3], boton[4], boton[5], ]},
                                                    {type: 1, components: [ boton[6], boton[7], boton[8], ]},
                                                ] 
                                            });
                                            accion='select'
                                        }else if(i.customId==boton[index].custom_id ){
                                            obs+=`${'<@'+jugador[turno]+'>'} no se puede mover la ficha a dicho lugar \n`;
                                            Membed.fields[2]= { name: '--------------------------------------', value: obs, inline: false };
                                            i.update({embeds: [Membed],
                                                components: [
                                                    {type: 1, components: [ boton[0], boton[1], boton[2], ]},
                                                    {type: 1, components: [ boton[3], boton[4], boton[5], ]},
                                                    {type: 1, components: [ boton[6], boton[7], boton[8], ]},
                                                ] 
                                            });
                                            redo=true;
                                        }
                                    }
                                }
                            }
                            
                            if( (boton[0].label==boton[1].label && boton[1].label==boton[2].label && boton[2].label!='-') || (boton[3].label==boton[4].label && boton[4].label==boton[5].label && boton[5].label!='-') || (boton[6].label==boton[7].label && boton[7].label==boton[8].label && boton[8].label!='-') 
                            || (boton[0].label==boton[3].label && boton[3].label==boton[6].label && boton[6].label!='-') || (boton[1].label==boton[4].label && boton[4].label==boton[7].label && boton[7].label!='-') || (boton[2].label==boton[5].label && boton[5].label==boton[8].label && boton[8].label!='-')
                            || (boton[0].label==boton[4].label && boton[4].label==boton[8].label && boton[8].label!='-') || (boton[2].label==boton[4].label && boton[4].label==boton[6].label && boton[6].label!='-') )
                            {
                                message.channel.send(`${'<@'+jugador[turno]+'>'} gano la partida`);
                                fin=true;
                                collector.stop();
                            }

                            if(redo==true){
                                redo=false;
                            }else if(turno==0){
                                turno=1;pieza='🔵';
                            }else if(turno==1){
                                turno=0;pieza='🔴';
                            }
                        }
                    }
                });

                collector.on('end', async i => {
                    if(fin==false){
                        message.channel.send(`Se le acabo el tiempo a ${'<@'+jugador[turno]+'>'}`);
                    }
                });
            }
        }
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//---------||----||--------------------------------------------------------------------------------------------------------------------------
        if(comm=='.disconnect'){
            play.chao(message);
        }
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//---------||----||--------------------------------------------------------------------------------------------------------------------------
        if(comm=='.skip'){
            play.skip(message);
        }
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//---------||----||--------------------------------------------------------------------------------------------------------------------------
        if(comm=='.brawl'){
            brawlhalla.tweet(message,args);
        }
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//---------||----||--------------------------------------------------------------------------------------------------------------------------
        if(comm=='.playlist'){
            switch (args.shift()) {
                case 'crear': 
                    Playlist.crear(message,args,Membed);
                    break;
                case 'añadir':
                    Playlist.añadir(message,args,Membed);
                    break;
                case 'eliminar':
                    Playlist.eliminar(message,args,Membed);
                    break;
                case 'play':
                    Playlist.playl(message,args,Membed,'play'); 
                    break;
                case 'shuffle':
                    Playlist.playl(message,args,Membed,'shuffle');  
                    break;    
                case 'publica':
                    Playlist.estado(message,args,Membed,'true');
                    break;
                case 'privada':
                    Playlist.estado(message,args,Membed,'false');
                    break;
                case 'info':
                    Playlist.info(message,args,Membed);
                    break;
                default:
                    Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
                    .addFields({ name: 'comandos de .playlist: ', value: playcommandos, inline: true },);

                    message.channel.send({embeds: [Membed]});
                    break;
            }
        }
//-----------------------------------------------------------------------------------------------------------------------------------------------------
        channel = client.channels.cache.get('751881070324219956');
    });

});

client.login(process.env.token);