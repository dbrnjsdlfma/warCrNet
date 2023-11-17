const mongoose = require('mongoose')

const { Schema } = mongoose
const { Types: { ObjectId } } = Schema;

const uploadSchema = new Schema ({
    filename : {
        type : String ,
        trim : true ,
        required : true , 
        unique : true,
    },
    path : {
        type : String ,
        trim : true , 
    },
    minetype : {
        type : String  ,
        trim : true ,
        required : true ,
    },
    size : {
        type : Number ,
        required : true ,
    },
    date : {
        type : Date , 
        required : true ,
    },
    userId : {
        type : ObjectId ,
        required : true ,
    }
})

const Upload = mongoose.model('Upload' , uploadSchema)
module.exports = Upload