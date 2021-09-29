
const mongoose = require("mongoose");
const {Schema}=mongoose;

const hotelSchema = new Schema(
    {
        nombre: {type:String,maxlength:10},
        link: {type:String},
        imagen:{type:String},
        descripcion:{type:String},
        valoracion:{type:mongoose.Decimal128 }
        //tags: [{type:String}]//array de strings
    },
    {
       timestamps:{ createdAt:true,updatedAt:true}
    }
);

module.exports=mongoose.model("Hotel" , hotelSchema)