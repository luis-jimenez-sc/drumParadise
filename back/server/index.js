const express = require('express');
const server = express();
const cors = require('cors'); //evita el bloqueo de las peticiones get/POST
const { Hotel, User, Habitacion, Factura } = require('../models')
const body_parser = require('body-parser');

server.use(body_parser.urlencoded({ extended: true }));
server.use(express.json())//trabajar mediante json
server.use(cors()) //evita la cancelacion de peticiones

//POST
////////LOG
server.post("/login", async (req, res) => {

    let user = req.body.usuario;
    let pass = req.body.pass;
    //console.log(req.body);

    let nombre = false;
    let id;
    try {
        let users = await User.find();

        for (const userx of users) {
            if (user == userx.email && pass == userx.pass) {
                nombre = userx.nombre;
                id = userx.id
                //console.log("existe" + nombre);
            }
        }

    } catch (error) {
        console.log("error al encontrar Usuarios al loguearse" + error);
    }

    return res.send({ data: nombre, myId: id })

}
)
//////REGISTRO
server.post("/registro", async (req, res) => {
    let dts = req.body;
    //console.log(dts);
    //ver si existe
    let existe = false;

    try {
        let users = await User.find()
        for (const userx of users) {
            if (dts.email == userx.email) {
                nombre = userx.nombre;
                console.log(nombre + " existe");
                existe = true;
            }
        }
        //si no existe add
        if (!existe) {
            //VALIDADORES -->
            const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            const passReg = /^(?=.{10,}$)(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
            if (emailReg.test(dts.email) && passReg.test(dts.pass)) {
                console.log(dts.nombre + " voy a crearlo");

                User.create([dts]).then(
                    () => { console.log("crea2"); moongose.disconnect(); }
                ).catch(console.log("no creado"))


            } else { console.log("pass o email invalidos"); }


        }
    } catch (error) {
        console.log(error);
    }

    return res.send({ existe: existe })

}
)

/////////GET

server.get("/hoteles", async (req, res) => {
    let hoteles;
    try {
        hoteles = await Hotel.find();
    } catch (error) {
        console.log(error);
    }

    return res.send({ data: hoteles });

}
);

//COJO nombre / ENVIO dts de mi hotel
server.get("/hotel/habitacion/:nombreH", async (req, res) => {

    const { nombreH } = req.params;
    let habitaciones;
    // console.log(nombreH);
    //hotel
    try {
        let hotel = await Hotel.find({ link: nombreH });
        let idHab = hotel[0]._id;
        try {
            //hab
            habitaciones = await Habitacion.find({ idHotel: idHab, disponible: true });
            //console.log(habitaciones);
        } catch (error) {

        }
    } catch (error) {
        console.log(error);
    }

    return res.send({ error: false, data: habitaciones })

}
);

server.post("/hotel/factura", async (req, res) => {
    let dts = req.body;
    let respuesta;
    //console.log(dts);

    try {
        let habitacion = await Habitacion.find({ _id: dts.idHab });
        //HABITACION esta disponeble?
        if (habitacion) {
            console.log(habitacion[0].disponible);
            if (habitacion[0].disponible) {
                respuesta = "OK"
                try {
                    //cambiar disponible a false 
                    Habitacion.updateOne(
                        { _id: dts.idHab },
                        { $set: { disponible: false } },
                        function (err, res) {
                            if (err) throw err;
                            console.log("actualzizacion ok");
                        }
                    );
                } catch (error) {
                    console.log(error);
                }

                try {
                    //agregar factura (recuerda fecha)
                    let fecha = new Date();
                    fecha.setDate(fecha.getDate() + dts.dias);
                    let myFactura = {
                        idUsuario: dts.idUsr,
                        idHotel: dts.idHotel,
                        idHabitacion: dts.idHab,
                        fechaInicio: new Date(),
                        fechaFin: fecha,
                        precioTot: dts.precioTot
                    }
                    console.log(myFactura);

                    Factura.create(myFactura).then(
                        () => { console.log("factura creada"); /*moongose.disconnect();*/ }
                    ).catch(console.log("error al crear factura"))
                } catch (error) {
                    console.log(error);
                }


            } else {
                respuesta = "hab no disponible"
            }
        } else { respuesta = "no encontramos su habitación" }
    } catch (error) {
        console.log(error);
    }

    return res.send({ salida: respuesta })
});

module.exports = server;
