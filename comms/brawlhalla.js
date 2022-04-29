const needle = require('needle');
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function image(){

    const params = {
        'query': 'from:xdriphalla -is:retweet has:images',
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
async function tweet(message){
    try {
        const response = await image();
        /*console.dir(response, {
            depth: null
        });*/
        var i=Math.floor(Math.random() * (response['meta'].result_count - 1 + 1) + 0);
        message.channel.send(response['includes']['media'][i].url);

    } catch (e) {
        console.log(e);
    }
}

module.exports={tweet};