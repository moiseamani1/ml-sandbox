// packages
require('dotenv').config()


//mongoose connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASEURL,{
    useNewUrlParser:true,
    useCreateIndex:true
});

// services, controllers, models
const youtube_api = require('./api/youtube/index')
const scheduler = require('./scheduler/cron')
const Video = require('./models/video')
const Snapshot= require('./models/snapshot')
const { schedule } = require('node-cron')

const createPopularVideosModels = () => youtube_api.getMostPopular()
    .then(async mostPopularVideosList => {
        return mostPopularVideosList.map(async vidFromApi => {

            const channelInformation = await youtube_api.getChannelInformation(vidFromApi.snippet.channelId)
                .then(channelPayload => channelPayload[0]);

            return {
                _id: mongoose.Types.ObjectId(),
                thumbnail: vidFromApi.snippet.thumbnails.medium.url,
                description: vidFromApi.snippet.description,
                title: vidFromApi.snippet.title,
                views: vidFromApi.statistics.viewCount,
                numberOfComments: vidFromApi.statistics.commentCount,
                datePosted: new Date(vidFromApi.snippet.publishedAt),
                likes: vidFromApi.statistics.likeCount,
                dislikes: vidFromApi.statistics.dislikeCount,
                videoId: vidFromApi.id,
                tags: vidFromApi.snippet.tags,
                channelViews: channelInformation.statistics.viewCount,
                channelSubscribers: channelInformation.statistics.subscriberCount,
                hasHiddenSubscribers: channelInformation.statistics.hiddenSubscriberCount,
                channelName: channelInformation.snippet.title,
            }
        })
    })
    .then(promiseArr => Promise.all(promiseArr))
    

// const saveVideoModels = async unsavedModels => {
//     const saveResults = unsavedModels
//         .map(unsavedModel => new Video(unsavedModel))
//         .forEach(schemas => schemas.save(err => {
//             if (err) {
//                 console.error(err);
//                 throw new Error('Could not save video')
//             }
//             return true;
//         })
// }


scheduler.createDailyJob(async () => {
    // const unsavedModels = createPopularVideosModels();
    // await saveVideoModels(unsavedModels)

    createPopularVideosModels().then(res => {
    
        Snapshot.create({mostPopularVideos:res},(err)=>{})
        Video.create(res,(err)=>{})
    
    });
    


})