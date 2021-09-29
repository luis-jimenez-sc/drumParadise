const mongoose = require("mongoose");
const {Schema}=mongoose;

const facturaSchema = new Schema(
    {
        idHotel: {type:String},
        idHabitacion:{type:String},
        idUsuario: {type:String},
        fechaInicio:{type:String},
        fechaFin:{type:String},
        precioTot:{type:mongoose.Decimal128 }
       
        //tags: [{type:String}]//array de strings
    },
    {
       timestamps:{ createdAt:true,updatedAt:true}
    }
);

module.exports=mongoose.model("Factura" , facturaSchema)