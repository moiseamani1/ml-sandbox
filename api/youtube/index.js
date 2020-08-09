const { google } = require("googleapis");
const axios = require('axios').default

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
})

module.exports.searchForTitle = async title => {

    let initialResponse = await youtube.search.list({ part: ['snippet'], q: title }).then(res => {
        // console.log('initial response res', res)
        return res.request
    })

    return await axios.get(initialResponse.responseURL).then(res => res.data ? res.data.items : null)
}


module.exports.getMostPopular = async () => {
    let initialResponse = await youtube.videos.list({ part: ['snippet', 'contentDetails', 'statistics'], chart: 'mostPopular', maxResults: 50 })
        .then(res => res.request);

    return await axios.get(initialResponse.responseURL).then(res => res.data ? res.data.items : null)
}

module.exports.getChannelInformation = async channelId => {
    let initialResponse = await youtube.channels.list({ part: ['snippet', 'contentDetails', 'statistics'], id: channelId })
        .then(res => res.request)

    return await axios.get(initialResponse.responseURL).then(res => res.data ? res.data.items : null)
}