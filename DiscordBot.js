//Token ODAxMzAxNDg1ODAzMDEyMTI2.YAesKQ.pFG7cC5CmZz_-hJYryhBkPRh4kg
const { Client, MessageAttachment, Permissions ,Intents} = require('discord.js');
const Discord = require('discord.js');
const inspector = require('inspector');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const permissions = new Permissions(BigInt(41090560));
//const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.GUILD_MESSAGE_REACTIONS] });
const allIntents = new Intents(32767);
const client = new Client({ intents: allIntents });

const desc = ["Nacho, el niño virgo", "Barco, el bocho", "Alejo, la gorda", "Fer, el niño de cristal", "Yano, el autista", "Lotzo, el hippie", "Morgan <3", "Alva, El chichi Peralta", "Nacho, el simp", "Eroncho, ¿Jugó Platini?"];
const comandos = ".peron\n.virgo\n.masgrande\n.lumpen\n.svinfo\n.frase\n.tetona\n.move @user <canal>\n.mute @user <segundos>\n.deaf @user <segundos>\n.play <cancion>"
const frase = ["Ño Ño", "MUY pelotudo!", "Per di da zo", "Este tipo está quemado", "Dea dea", "No me la container", "No da más de pelotudo", "Sí nene", "Dale negrito", "Se va muteado", "Bien muteado", "Bien muerto", "Olvidafter", "Niño de cristal", "Poco huevo", "Naaaashe", "Ido", "MOOOY PICUSO", "EL REY"];
const boca = ["https://imgur.com/MW4zdiA.png", "https://imgur.com/riL4WUY.png", "https://imgur.com/Qbvaevv.png", "https://imgur.com/cJRRTgA.png", "https://imgur.com/XiM7gGc.png", "https://imgur.com/iCs5PQU.png", "https://imgur.com/PBElkZ0.png", "https://imgur.com/3frkUvM.png", "https://imgur.com/nbAuGtd.png", "https://imgur.com/aG0BPWa.png"]
let DJ;
const prefix = ".";
//const fmove=require('./comms/move.js');
const { joinVoiceChannel,createAudioPlayer,createAudioResource,entersState,StreamType,AudioPlayerStatus,VoiceConnectionStatus, } = require('@discordjs/voice');
const { match } = require('assert');
var isPlaying=false;
var queue=[];
var tiempo=0;

client.on('ready', () =>{
    console.log("Connected as " + client.user.tag)
    //let prefix = ".";
    client.user.setActivity('a BocaOOOAAAAAOAOAOAOAAO', { type: 'WATCHING' })//.then(presence=>console.log(`Activity set to ${presence.activities[0].name}`)).catch(console.error);

    client.on('messageCreate',async message => {
        if(message.content === prefix + 'peron'){
            const attach = new MessageAttachment("https://imgur.com/GUVB93l.png")
            message.channel.send(attach);
        }
        if(message.content === prefix + 'virgo'){
            const attach = new MessageAttachment("https://imgur.com/0kMQabL.png")
            message.channel.send(attach);
        }
        /*if(message.content === prefix + 'masgrande'){
            var randomValue = boca[Math.floor(Math.random() * boca.length)];
            const attach = new MessageAttachment(randomValue);
            message.channel.send(`${message.author},`, attach);

            let voiceChannel = message.member.voice.channel;
            if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');

            const streamOptions = { seek: 0, volume: 1 };
            voiceChannel.join().then(connection => {
                const url = ytdl("https://www.youtube.com/watch?v=Emp7ntPJm2w&ab_channel=chicho641", { filter : 'audioonly' });
                const dispatcher = connection.playStream(url, streamOptions);
                dispatcher.on("end", end => {
                    console.log("left channel");
                    voiceChannel.leave();
                });
                message.channel.send('Reproduciendo ahora: LA 12 PAPÁ');
                message.delete();
            }).catch(err => console.log(err));
        }*/
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
                message.channel.send(comandos.toString())
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
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
        //const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const args = message.content.split(/ +/g);
        const comm = args.shift().toLowerCase();
        const Membed = new Discord.MessageEmbed();

        if(comm.match(/^\.(?!play|pool|mute|deaf|move|peron|virgo|masgrande|lumpen|svinfo|frase|tetona|comandos|disconnect)/g)){
            message.channel.send('Comando equivocado');
        }

        if(comm==='.move'){
            console.log(comm+' || '+Date()+` || ${message.author.username}`);
            //message.channel.send(fmove.move(message.mentions.members.first(), message.mentions.members.first().voice.channel.id, args))
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
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
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

                Membed.setColor('#0099ff').setAuthor(`${message.author.username}`, message.author.avatarURL()).setThumbnail(message.author.avatarURL())
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
                       // var mensaje='Votos a favor '+si+'/'+i+', votos en contra '+no+'/'+i+` para mutear a ${muteo}`+" por "+args[1]+'s';
                    }else{
                        gil=true;
                        Membed.setTitle('Se fue al choto')
                        if(comm==="mute"){
                            Membed.setDescription(`Muteenlo por `+args[1]+'s'); 
                        }else{
                            Membed.setDescription(`Ensordecer por `+args[1]+'s');
                        }
                        //var mensaje=`Se fue al choto ${message.author}.  `+'Votos a favor '+si+'/'+i+', votos en contra '+no+'/'+i+` para mutear al gil de ${message.author}`;
                    }
                }else{
                    throw "jejox";
                }
             
                message.channel.send(Membed).then(embdReact => {
                    embdReact.react('🟩');
                    embdReact.react('🟥');
                    embdReact.react('⛔');

                    const filter = (reaction, user) => {
                        return ['🟩','🟥','⛔'].includes(reaction.emoji.name) && user.id;
                    };

                    const collector = embdReact.createReactionCollector(filter);

                    setTimeout(()=>{ 
                        Membed.addFields({ name: `----------------------------------------`, value: 'Termino el tiempo de la votacion', inline: false },);
                        embdReact.edit(Membed);
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
                                        embdReact.edit(Membed);
                                        //embdReact.edit(`Se fue al choto ${message.author}.  `+'Votos a favor '+si+'/'+i+', votos en contra '+no+'/'+i+` para mutear al gil de ${message.author}`);
                                    }else{
                                        Membed.fields[0] = { name: "Votos a favor", value: si+'/'+i, inline: true };
                                        //embdReact.edit('Votos a favor '+si+'/'+i+', votos en contra '+no+'/'+i+` para mutear a ${muteo}`+" por "+args[1]+'s');
                                        embdReact.edit(Membed);
                                    }
                                }else if(reaction.emoji.name==='🟥'){
                                    no++;
                                    if(gil==true){
                                        Membed.fields[1] = { name: 'Votos en contra', value: no+'/'+i, inline: true };
                                        embdReact.edit(Membed);
                                        //embdReact.edit(`Se fue al choto ${message.author}.  `+'Votos a favor '+si+'/'+i+', votos en contra '+no+'/'+i+` para mutear al gil de ${message.author}`);
                                    }else{
                                        Membed.fields[1] = { name: 'Votos en contra', value: no+'/'+i, inline: true };
                                        embdReact.edit(Membed);
                                        //embdReact.edit('Votos a favor '+si+'/'+i+', votos en contra '+no+'/'+i+` para mutear a ${muteo}`+" por "+args[1]+'s');
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
                                    embdReact.edit(Membed);
                                    //message.channel.send("Safaste pipi");
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
                                    embdReact.edit(Membed);
                                   // embdReact.edit(`${user} cancelo la votacion`);
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
                            //message.channel.send("Mutea3");
                            Membed.addFields({ name:`----------------------------------------`, value: `${muteo} se fue mutea3, fucking virgil`, inline: false },);
                        }else{
                            muteo.voice.setDeaf(true);
                            setTimeout(()=>{ 
                                muteo.voice.setDeaf(false);
                            },segundos);
                            //message.channel.send("Ensordeci3");
                            Membed.addFields({ name:`----------------------------------------`, value: `${muteo} se fue ensordeci3, fucking virgil`, inline: false },);
                        }
                        embdReact.edit(Membed);
                    }
                    function Gil(){
                        //muteo=message.member;
                        //muteo.voice.setMute(true);
                        if(comm==="mute"){
                            message.member.voice.setMute(true);
                            setTimeout(()=>{ 
                                //muteo.voice.setMute(false);
                                message.member.voice.setMute(false);
                            },segundos);
                            message.channel.send("Mutea3");
                        }else{
                            message.member.voice.setDeaf(true);
                            setTimeout(()=>{ 
                                //muteo.voice.setMute(false);
                                message.member.voice.setDeaf(false);
                            },segundos);
                            message.channel.send("Ensordeci3");
                        }
                    }
                }) 

            }catch(error){
                message.channel.send("Argumentos inválidos virgil :(");
                //message.channel.send(error);
            }
        }
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//---------||----||--------------------------------------------------------------------------------------------------------------------------
//---------|-|--|-|--------------------------------------------------------------------------------------------------------------------------
//---------|--||--|--------------------------------------------------------------------------------------------------------------------------
//---------|------|--------------------------------------------------------------------------------------------------------------------------
//---------|------|--------------------------------------------------------------------------------------------------------------------------
//---------|------|--------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
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
                //console.log(member[1].id);
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
//---------|-|--|-|--------------------------------------------------------------------------------------------------------------------------
//---------|--||--|--------------------------------------------------------------------------------------------------------------------------
//---------|------|--------------------------------------------------------------------------------------------------------------------------
//---------|------|--------------------------------------------------------------------------------------------------------------------------
//---------|------|--------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
        if(comm==='.play'){
            console.log(comm+' || '+Date()+` || ${message.author.username}`);
            try {                
                const connection = await joinVoiceChannel({
                    channelId: message.member.voice.channel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator
                })
               
                const videoFinder = async (query) =>{
                    const videoResult= await ytSearch(query);
                    return (videoResult.videos.length>1)? videoResult.videos[0] : null;
                }
                const video= await videoFinder(args.join(' '));
                if(video){
                    const player = createAudioPlayer();
                    const stream = ytdl(video.url,{filter:'audioonly',highWaterMark: 1 << 25,});
                    const rsrc = createAudioResource(stream,{inputType:StreamType.Arbitrary});
                    queue.push(rsrc)
                    var duracion = video.duration.toString().split(/ +/g);
                    tiempo = (parseInt(duracion[0])+3)*1000
                    
                    if(isPlaying==false){
                        play();
                    }

                    function play (){
                        connection.subscribe(player);
                        player.play(queue[0]);
                        isPlaying=true
                        setTimeout(() => {
                            queue.shift()
                            if(queue.length>0){
                                play();
                            }else{
                                connection.destroy();
                                isPlaying=false; 
                            }
                        }, tiempo);
                    }
    
                    message.channel.send(video.url+" ");
                    message.channel.send(video.duration.toString());
                }
            } catch (error) {
                message.channel.send('No se encontro ningun video >:| '+error);
            }
        }

        if(comm=='.masgrande'){
            var randomValue = boca[Math.floor(Math.random() * boca.length)];
            const attach = new MessageAttachment(randomValue);
            message.channel.send(`${message.author},`,attach);
            //message.channel.send({content: `${message.author.username}`, files: [{ attachment: attach }]});

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
                connection.destroy();   
            }, 150000);

            message.channel.send('Reproduciendo ahora: LA 12 PAPÁ');
        }

        if(comm=='.disconnect'){
            joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            }).destroy();
            message.channel.send('Chao');
        }
        
    //-----------------------------------------------------------------------------------------------------------------------------------------------------
        
        
        
        channel = client.channels.cache.get('751881070324219956');
    
        //if(message.content != prefix + 'peron' || message.content != prefix + 'virgo' || message.content != prefix + 'big' || message.content != prefix + 'user' || message.content != prefix + 'svinfo' || message.content != prefix + 'command'){
            //message.channel.send("Comando equivocado, coco");
        //}

    });

});




client.login("ODAxMzAxNDg1ODAzMDEyMTI2.YAesKQ.pFG7cC5CmZz_-hJYryhBkPRh4kg");