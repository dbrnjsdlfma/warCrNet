const mongoose = require('mongoose')

const { Schema } = mongoose

const busSchema = new Schema({
    routeNo : {
        type : String ,
        trim : true ,
    },
    routeTp : {
        type : String ,
        trim : true ,
    },
    routeCd : {
        type : String ,
        trim : true 
    },
    origin : {
        type : String ,
        trim : true 
    },
    lastStop : {
        type : String ,
        trim : true 
    },
})
const Bus = mongoose.model('Bus', busSchema)

module.exports = Bus