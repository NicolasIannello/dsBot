var mysql = require('mysql');
const play=require('./play.js');

function crear(message,args,Membed){
   console.log('playlist crear || '+new Date().toLocaleDateString()+` || ${message.author.username}`);
   var ok=false;

   var con = mysql.createConnection({
      host: process.env.host,
      user: process.env.db,
      password: process.env.passDB,
      database:process.env.db
  });

   con.connect(function(err) {
      if (err) throw err;

      con.query('SELECT * FROM playlist WHERE Nombre="'+args.join(' ')+'";', function (err, result) {
         if (err) throw err;

         if (result=='' || result==[]) {
            Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
            .addFields({ name: '¿Desea crear la playlist: ', value: args.join(' ')+' ?', inline: true },);

            message.channel.send({embeds: [Membed]}).then(embdReact => {
               embdReact.react('🟩'); 
               embdReact.react('🟥');

               const filter = (reaction,user) => {
                   return ['🟩','🟥'].includes(reaction.emoji.name) && user.id;
               };

               const collector = embdReact.createReactionCollector(filter);
           
               setTimeout(()=>{ 
                  if(ok==false){
                     Membed.addFields({ name: `----------------------------------------`, value: 'Expiro el tiempo', inline: false },);
                     embdReact.edit({embeds: [Membed]});
                  }
                  con.end();
                  collector.stop();
               },25000);

               collector.on('collect',(reaction, user)=>{
                  if (user==message.author.id) {
                     if(reaction.emoji.name=='🟩'){
                        con.query('INSERT INTO playlist (Nombre,Creador,Colaborativa,Fecha) VALUES("'+args.join(' ')+'","'+user+'","false","'+Date()+'");', function (err, result) {
                           if (err) throw err;
                           Membed.addFields({ name: `----------------------------------------`, value: 'Playlist creada con exito', inline: false },);
                           embdReact.edit({embeds: [Membed]});
                           ok=true;
                           collector.stop();
                        });
                     }else{
                        Membed.addFields({ name: `----------------------------------------`, value: 'No se creo la playlist', inline: false },);
                        embdReact.edit({embeds: [Membed]});
                        ok=true;
                        collector.stop();
                     }
                  }
               })
            })
         }else{
            Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
            .addFields({ name: 'Ya existe una playlist con el nombre: ', value: args.join(' '), inline: false },);

            message.channel.send({embeds: [Membed]});
            con.end();
            //collector.stop();
         }
      });
   });
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
async function añadir(message,args,Membed){
   console.log('playlist anadir || '+new Date().toLocaleDateString()+` || ${message.author.username}`);
   var a=args.join(' ').split('"'),ok=false;

   var con = mysql.createConnection({
      host: process.env.host,
      user: process.env.db,
      password: process.env.passDB,
      database:process.env.db
  });

   const videoFinder = async (query) =>{
      const videoResult= await ytSearch(query);
      return (videoResult.videos.length>1)? videoResult.videos[0] : null;
   }
   const video= await videoFinder(a[2]);

   con.connect(function(err) {
      if (err) throw err;
      
      con.query('SELECT * FROM playlist WHERE Nombre="'+a[1]+'";', function (err, result) {
         if (err) throw err;

         if (result=="" || result==[]) {
            Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
            .addFields({ name: 'No se encontro la playlist: ', value: a[1], inline: true },);

            message.channel.send({embeds: [Membed]});
            con.end();
         }else if(result[0].Colaborativa=="false" && result[0].Creador!=message.author.id){
            Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
            .addFields({ name: 'La playlist "'+a[1]+'" no es colaborativa.', value: `Por favor contactese con <@${result[0].Creador}>`, inline: true },);

            message.channel.send({embeds: [Membed]});
            con.end();
         }else{
            if(video){
               var IDpl=result[0].IDpl;

               Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
               .addFields({ name: 'Agregar cancion: ', value: video.url, inline: false },)
               .addFields({ name: 'A playlist: ', value: a[1], inline: false },);
               
               message.channel.send({embeds: [Membed]}).then(embdReact => {
                  embdReact.react('🟩'); 
                  embdReact.react('🟥');
   
                  const filter = (reaction,user) => {
                      return ['🟩','🟥'].includes(reaction.emoji.name) && user.id;
                  };
   
                  const collector = embdReact.createReactionCollector(filter);
              
                  setTimeout(()=>{ 
                     if (ok==false) {
                        Membed.addFields({ name: `----------------------------------------`, value: 'Expiro el tiempo', inline: false },);
                        embdReact.edit({embeds: [Membed]});  
                     }
                     con.end();
                     collector.stop();
                  },25000);
   
                  collector.on('collect',(reaction, user)=>{
                     if (user==message.author.id) {
                        if(reaction.emoji.name=='🟩'){
                           con.query('INSERT INTO canciones (url,user,IDpl) VALUES("'+video.url+'","'+user+'",'+parseInt(IDpl)+');', function (err) {
                              if (err) throw err;
                              Membed.addFields({ name: `----------------------------------------`, value: 'Cancion añadida con exito', inline: false },);
                              embdReact.edit({embeds: [Membed]});
                              ok=true;
                              collector.stop();
                           });
                        }else{
                           Membed.addFields({ name: `----------------------------------------`, value: 'No se añadio la cancion', inline: false },);
                           embdReact.edit({embeds: [Membed]});
                           ok=true;
                           collector.stop();
                        }
                     }
                  });
               });
            }else{
               Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
               .addFields({ name: 'No se encontro la cancion: ', value: a[2], inline: true },);
               embdReact.edit({embeds: [Membed]});
               con.end();            
            }
         }
      });
   });
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
function playl(message,args,Membed,tipo){
   console.log('playlist shuffle || '+new Date().toLocaleDateString()+` || ${message.author.username}`);
   
   var con = mysql.createConnection({
      host: process.env.host,
      user: process.env.db,
      password: process.env.passDB,
      database:process.env.db
   });

   con.connect(function(err) {
      if (err) throw err;
      
      con.query('SELECT IDpl FROM playlist WHERE Nombre="'+args.join(' ')+'";', function (err, result) {
         if (err) throw err;
         
         if (result=="" || result==[]) {
            Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
            .addFields({ name: 'No se encontro la playlist: ', value: a[1], inline: true },);

            message.channel.send({embeds: [Membed]});
            con.end();
         }else{
            var IDpl=result[0].IDpl;

            con.query('SELECT url FROM canciones WHERE IDpl='+parseInt(IDpl)+';', function (err, result) {
               let currentIndex=result.length,  randomIndex;

               if (tipo=='shuffle') {
                  while (currentIndex != 0) {
                     randomIndex = Math.floor(Math.random() * currentIndex);
                     currentIndex--;
               
                     [result[currentIndex].url, result[randomIndex].url] = [result[randomIndex].url, result[currentIndex].url];
                  }
               }
               con.end();

               result.forEach(element => {
                  play.reproducir(message,element.url,true);
               });

               Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
               .addFields({ name: 'Reproduciendo playlist: ', value: args.join(' '), inline: false },);
               message.channel.send({embeds: [Membed]});
            });
         }
      });
   });
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
function estado(message,args,Membed,estado){
   console.log('playlist public '+estado+ '|| '+new Date().toLocaleDateString()+` || ${message.author.username}`);
   
   var con = mysql.createConnection({
      host: process.env.host,
      user: process.env.db,
      password: process.env.passDB,
      database:process.env.db
   });
   
   con.query('SELECT Nombre,Creador,Colaborativa FROM playlist WHERE Nombre="'+args.join(' ')+'";', function (err, result) {
      if (err) throw err;

      if (result=="" || result==[]) {
         Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
         .addFields({ name: 'No se encontro la playlist: ', value: args.join(' '), inline: true },);

         message.channel.send({embeds: [Membed]});
         con.end();
      }else if(result[0].Creador!=message.author.id){
         Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
         .addFields({ name: 'La playlist "'+args.join(' ')+'" no es colaborativa.', value: `Por favor contactese con <@${result[0].Creador}>`, inline: true },);

         message.channel.send({embeds: [Membed]});
         con.end();
      }else{
         con.query("UPDATE playlist SET Colaborativa='"+estado+"' WHERE playlist.Nombre='"+args.join(' ')+"';", function (err, result){
            if (err) throw err;

            if (estado=='true') {
               Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
               .addFields({ name: 'La playlist '+args.join(' '), value: 'ahora es colaborativa', inline: true },);
            }else{
               Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
               .addFields({ name: 'La playlist '+args.join(' '), value: 'ya no es colaborativa', inline: true },);
            }

            message.channel.send({embeds: [Membed]});
            con.end()
         })
      }
   })
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
function info(message,args,Membed){
   console.log('playlist info || '+new Date().toLocaleDateString()+` || ${message.author.username}`);
   
   var con = mysql.createConnection({
      host: process.env.host,
      user: process.env.db,
      password: process.env.passDB,
      database:process.env.db
   });
   
   con.query('SELECT C.url,P.Fecha,P.Creador,P.Colaborativa FROM playlist as P,canciones as C WHERE P.Nombre="'+args.join(' ')+'" && P.IDpl=C.IDpl;', function (err, result) {
      if (err) throw err;

      if (result=="" || result==[]) {
         Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
         .addFields({ name: 'No se encontro la playlist: ', value: args.join(' '), inline: true },);

         message.channel.send({embeds: [Membed]});
         con.end();
      }else{
         con.end();
         var canciones="";
         for (let a=0; a<result.length; a++) {
            canciones+=result[a].url+'\n';
         }

         Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
         .addFields({ name: 'Playlist "'+args.join(' ')+'":', value: 'Canciones: '+result.length+'\nFecha creacion: '+result[0].Fecha+'\nCreador: '+`<@${result[0].Creador}>\nColaborativa: `+result[0].Colaborativa, inline: true },);

         message.channel.send({embeds: [Membed],components: [
            {type: 1, components: [
               {type: 2, label: "info", style: 'PRIMARY', custom_id: "info"},
               {type: 2, label: "Canciones", style: 'PRIMARY', custom_id: "canciones"},
            ]},
         ]});

         const filter = i => i.customId === 'canciones'||'info';
         const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });
         
         collector.on('collect', async i => {
            if (i.customId=="canciones") {
               Membed.fields[0] = { name: 'Canciones de "'+args.join(' ')+'":', value: canciones, inline: true };
            }else if(i.customId=='info'){
               Membed.fields[0] = { name: 'Playlist "'+args.join(' ')+'":', value: 'Canciones: '+result.length+'\nFecha creacion: '+result[0].Fecha+'\nCreador: '+`<@${result[0].Creador}>\nColaborativa: `+result[0].Colaborativa, inline: true };
            }
            i.update({embeds: [Membed],
               components: [
                  {type: 1, components: [
                     {type: 2, label: "Canciones", style: 'PRIMARY', custom_id: "canciones"},
                     {type: 2, label: "info", style: 'PRIMARY', custom_id: "info"},
                  ]},
               ] 
           });
         });
      }
   });
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
function eliminar(message,args,Membed){
   console.log('playlist eliminar || '+new Date().toLocaleDateString()+` || ${message.author.username}`);
   
   var con = mysql.createConnection({
      host: process.env.host,
      user: process.env.db,
      password: process.env.passDB,
      database:process.env.db
   });

   con.query('SELECT * FROM playlist WHERE Nombre="'+args.join(' ')+'";', function (err, result) {
      if (err) throw err;

      if (result=="" || result==[]) {
         Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
         .addFields({ name: 'No se encontro la playlist: ', value: args.join(' '), inline: true },);

         message.channel.send({embeds: [Membed]});
         con.end();
      }else if (message.author.id==result[0].Creador){
         var id=result[0].IDpl,ok=false;

         Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
         .addFields({ name: 'Esta por eliminar la playlist: ', value: args.join(' '), inline: false },)
               
         message.channel.send({embeds: [Membed]}).then(embdReact => {
            embdReact.react('🟩'); 
            embdReact.react('🟥');
   
            const filter = (reaction,user) => {
                  return ['🟩','🟥'].includes(reaction.emoji.name) && user.id;
            };
   
            const collector = embdReact.createReactionCollector(filter);
              
            setTimeout(()=>{ 
               if (ok==false) {
                  Membed.addFields({ name: `----------------------------------------`, value: 'Expiro el tiempo', inline: false },);
                  embdReact.edit({embeds: [Membed]});  
               }
               con.end();
               collector.stop();
            },25000);
   
            collector.on('collect',(reaction, user)=>{
               if (user==message.author.id) {
                  if(reaction.emoji.name=='🟩'){
                     con.query('DELETE p,c FROM playlist as p,canciones as c WHERE c.IDpl='+id+' && p.IDpl='+id+';' , function (err) {
                        if (err) throw err;
                        Membed.addFields({ name: `----------------------------------------`, value: 'Playlist eliminada con exito', inline: false },);
                        embdReact.edit({embeds: [Membed]});
                        ok=true;
                        collector.stop();
                     });
                  }else{
                     Membed.addFields({ name: `----------------------------------------`, value: 'No se elimino la playlist', inline: false },);
                     embdReact.edit({embeds: [Membed]});
                     ok=true;
                     collector.stop();
                  }
               }
            });
         });
      }else{
         Membed.setColor('#0099ff').setTimestamp().setFooter('CIVUS', message.guild.iconURL())
         .addFields({ name: 'Usted no es el dueño de la playlist: ', value: args.join(' '), inline: true },);

         message.channel.send({embeds: [Membed]});
         con.end();
      }
   });
}
//-------------------------------------------------------------------------------------------------------------------------------------------
module.exports={crear,añadir,playl,estado,info,eliminar};