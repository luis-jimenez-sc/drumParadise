const server = require('./server');
const{PORT,MONGO_URI} = require('./config');
const mongoose = require('mongoose');
const cron = require("node-cron")
const { Habitacion, Factura } = require('./models')

server.listen(PORT,()=> {  console.log(  `estamos en el puerto  ${PORT}`  ) })
//
mongoose.connect(MONGO_URI , {useNewUrlParser:true,useUnifiedTopology: true } ).then( console.log("ok") ).catch(console.log("error al conectarse intento otra vez"))
//

cron.schedule("20 10 * * *",async()=>{ 
    try {
        let facturas = await Factura.find({ fechaFin :{  $lte: new Date.now() } });
        for (const factura of facturas) {
            try {
                Habitacion.updateOne(
                    { _id: factura.idHabitacion },
                    { $set: { disponible: true } },
                    function (err, res) {
                        if (err) throw err;
                        console.log("actualzizacion ok");
                    }
                );
            } catch (error) {
                
            }
        }
    } catch (error) {
        
    }
 });

