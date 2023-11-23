const mongoose = require('mongoose')

const { Schema } = mongoose

const busAreaPosition = new Schema({
    NODEID : {
        type  : String ,
        trim : true ,
    },
    NODENM : {
        type : String ,
        trim : true ,
    },
    LATITUDE : {
        type : Number , 
        trime : true ,
    },
    LONGITUDE : {
        type : Number , 
        trime : true ,
    },
})
const BusAreaPosition = mongoose.model('BusAreaPosition', busAreaPosition)
module.exports = BusAreaPosition