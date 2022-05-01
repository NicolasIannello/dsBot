const needle = require('needle');
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function image(args){
    if(args[0]=='' || args[0]==undefined){
        var campeon='';
    }else{
        var campeon=args.shift();
    }

    const params = {
        'query': 'from:xdriphalla -is:retweet has:images '+campeon,
        'expansions': 'attachments.media_keys','media.fields': 'preview_image_url,url'
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${process.env.twBearerToken}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}
async function tweet(message,args){
    try {
        const response = await image(args);
        /*console.dir(response, {
            depth: null
        });*/
        if(response['meta'].result_count==0){
            message.channel.send('Por el momento no hay skins del campeon');
        }else{
            var i=Math.floor(Math.random() * (response['meta'].result_count - 1 + 1) + 0);
            message.channel.send((i+1)+'/'+response['meta'].result_count+'\n'+response['includes']['media'][i].url);
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports={tweet};