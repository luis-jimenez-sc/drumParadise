const mongoose = require("mongoose");
const {Schema}=mongoose;

const habitacionSchema = new Schema(
    {
        disponible:{type:Boolean},
        idHotel: {type:String},
        tipo: {type:String},
        imagen:{type:String},
        descripcion:{type:String},
        precio:{type:mongoose.Decimal128 }
       
        //tags: [{type:String}]//array de strings
    },
    {
       timestamps:{ createdAt:true,updatedAt:true}
    }
);

module.exports=mongoose.model("Habitacion" , habitacionSchema)