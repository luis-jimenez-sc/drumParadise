
const mongoose = require("mongoose");
const {Schema}=mongoose;

const hotelSchema = new Schema(
    {

        nombre: {type:String,maxlength:10},
        apellidos: {type:String,maxlength:25},
        pais: {type:String,maxlength:10},
        telefono: {type:String,maxlength:9},
        email: {type:String},
        pass: {type:String}
        /*
        nombre: {type:String,maxlength:10},
        usuario: {type:String,,validate:RegExp()}??,
        pass:{type:String},
        //tags: [{type:String}]//array de strings
        */
    },
    {
       timestamps:{ createdAt:true,updatedAt:true}
    }
);

module.exports=mongoose.model("User" , hotelSchema)