require('dotenv').config()
const youtube_api = require('./api/youtube/index')

youtube_api.searchForTitle('shit uottawa says').then(response => {
    console.log('response', response)
})