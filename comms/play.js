const ytSearch = require('yt-search');
const ytdl = require('ytdl-core');
const { joinVoiceChannel,createAudioPlayer,createAudioResource,entersState,StreamType,AudioPlayerStatus,VoiceConnectionStatus, } = require('@discordjs/voice');
var isPlaying=false;
var queue=[],tiempo=[];
const boca = ["https://imgur.com/MW4zdiA.png", "https://imgur.com/riL4WUY.png", "https://imgur.com/Qbvaevv.png", "https://imgur.com/cJRRTgA.png", "https://imgur.com/XiM7gGc.png", "https://imgur.com/iCs5PQU.png", "https://imgur.com/PBElkZ0.png", "https://imgur.com/3frkUvM.png", "https://imgur.com/nbAuGtd.png", "https://imgur.com/aG0BPWa.png"]

async function reproducir(message,args,playlist){
    try{
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })
    
        const videoFinder = async (query) =>{
            const videoResult= await ytSearch(query);
            return (videoResult.videos.length>1)? videoResult.videos[0] : null;
        }
        var video;
        if (playlist==true) {
            video= await videoFinder(args);
        }else{
            video= await videoFinder(args.join(' '));
        }

        if(video){
            const player = createAudioPlayer();
            const stream = ytdl(video.url,{filter:'audioonly',highWaterMark: 1 << 25,});
            const rsrc = createAudioResource(stream,{inputType:StreamType.Arbitrary});
            queue.push(rsrc)
            var duracion = video.duration.toString().split(/ +/g);
            tiempo.push((parseInt(duracion[0])+4)*1000)
            
            if(isPlaying==false){
                play(connection,player);
            }

            /*function play (){
                connection.subscribe(player);
                player.play(queue[0]);
                isPlaying=true
                setTimeout(() => {
                    queue.shift();
                    tiempo.shift();
                    if(queue.length>0){
                        play();
                    }else{
                        try {
                            connection.destroy(); 
                        } catch (error) {
                            console.log(error);
                        }  
                        isPlaying=false; 
                    }
                }, tiempo[0]);
            }*/

            if (playlist==false){
                message.channel.send(video.url+" ");
                message.channel.send(video.duration.toString());
            }
        }
    }catch(error){
        message.channel.send('Ocurrio un error');
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
function play(connection,player){
    connection.subscribe(player);
    player.play(queue[0]);
    isPlaying=true
    
    timeout=setTimeout(() => {
        queue.shift();
        tiempo.shift();
        if(queue.length>0){
            play(connection,player);
        }else{
            try {
                connection.destroy(); 
            } catch (error) {
                console.log(error);
            }  
            isPlaying=false; 
        }
    }, tiempo[0]);
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
function chao(message){
    joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    }).destroy();
    message.channel.send('Chao');
    isPlaying=false; queue=[];tiempo=[];
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
function skip(message){
    queue.shift();
    tiempo.shift();

    if(queue.length>0){
        clearTimeout(timeout);

        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });
        const player = createAudioPlayer();
    
        play(connection,player);

        message.channel.send('Cancion salteada');
    }else{
        message.channel.send('No hay cancion para saltear');

    }
    
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
async function masgrande(message,Membed){
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

            Membed.setColor('#0099ff').setTimestamp().setFooter({text: 'CIVUS', iconURL: message.guild.iconURL()})
            .setImage(randomValue).addFields({ name: 'Reproduciendo ahora: ', value: 'LA 12 PAPÁ', inline: false },);

            message.channel.send({embeds: [Membed]});
}

module.exports={reproducir,chao,skip,masgrande};