const { google } = require("googleapis");
const axios = require('axios').default


module.exports.searchForTitle = async title => {
    const youtube = google.youtube({
        version: 'v3',
        auth: process.env.YOUTUBE_API_KEY
    })

    let initialResponse = await youtube.search.list({ part: ['snippet'], q: title }).then(res => {
        // console.log('initial response res', res)
        return res.request
    })

    return await axios.get(initialResponse.responseURL).then(res => {
        return res.data? res.data.items : null
    })
}
