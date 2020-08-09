const cron = require('node-cron')

module.exports.createDailyJob = cb => cron.schedule('0 0 0 * * *', cb)

module.exports.createJobsEverySecond = cb => cron.schedule('1-59 * * * * *', cb)