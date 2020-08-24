const mongoose = require('mongoose');

const Snapshot = new mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId,index:true,require:true,auto:true},
    createdAt: { type: mongoose.Schema.Types.Date, default: new Date(), required: true },
    mostPopularVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "YoutubeVideo" }]
});

module.exports = mongoose.model('Snapshot', Snapshot);