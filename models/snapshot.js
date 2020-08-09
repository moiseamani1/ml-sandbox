const mongoose = require('mongoose');

const Snapshot = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: mongoose.Schema.Types.Date, default: new Date(), required: true },
    mostPopularVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "YoutubeVideo" }]
});

module.exports = mongoose.model('Snapshot', Snapshot);