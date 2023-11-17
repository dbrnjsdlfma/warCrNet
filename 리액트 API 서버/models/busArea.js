const mongoose = require('mongoose')

const { Schema } = mongoose

const busAreaSchema = new Schema({
    BUSSTOP_ENG_NM : {
        type  : String ,
    },
    BUSSTOP_NM : {
        type : String ,
        trim : true ,
    },
    BUSSTOP_SEQ : {
        type : String , 
        trime : true ,
    },
    BUSSTOP_TP : {
        type : String , 
        trime : true ,
    },
    BUS_NODE_ID : {
        type : String , 
        trime : true ,
    },
    BUS_STOP_ID : {
        type : String , 
        trime : true ,
    },
    GPS_LATI : {
        type : Number , 
        trime : true ,
    },
    GPS_LONG : {
        type : Number , 
        trime : true ,
    },
    ROAD_NM : {
        type : String , 
        trime : true ,
    },
    ROAD_NM_ADDR : {
        type : String , 
        trime : true ,
    },
    ROUTE_CD : {
        type : String , 
        trime : true ,
    },
    TOTAL_DIST : {
        type : String , 
        trime : true ,
    },
})
const BusArea = mongoose.model('BusArea', busAreaSchema)
module.exports = BusArea