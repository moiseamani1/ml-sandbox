const mongoose = require('mongoose');

const Video = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: mongoose.Schema.Types.Date, default: new Date(), required: true },
    thumbnail: { type: mongoose.Schema.Types.String, required: true },
    description: { type: mongoose.Schema.Types.String, required: true },
    title: { type: mongoose.Schema.Types.String, required: true },
    views: { type: mongoose.Schema.Types.Number, required: true },
    numberOfComments: { type: mongoose.Schema.Types.Number, required: true },
    datePosted: { type: mongoose.Schema.Types.Date, required: true },
    likes: { type: mongoose.Schema.Types.Number, required: true },
    dislikes: { type: mongoose.Schema.Types.Number, required: true },
    tags: [{ type: mongoose.Schema.Types.String, require: true }],
    videoId: { type: mongoose.Schema.Types.String, require: true },
    channelViews: { type: mongoose.Schema.Types.Number, required: true },
    channelSubscribers: { type: mongoose.Schema.Types.Number },
    hasHiddenSubscribers: { type: mongoose.Schema.Types.Boolean, required: true },
    channelName: { type: mongoose.Schema.Types.String, require: true }
});

module.exports = mongoose.model('Video', Video);