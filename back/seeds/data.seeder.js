
const moongose = require('mongoose');
const { MONGO_URI } = require("../config")
const { Hotel, User, Habitacion, Factura } = require('../models')
const cheerio = require("cheerio")
const axios = require("axios").default;

moongose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function cargarInfo() {
  const miURL = "https://www.booking.com/searchresults.es.html?label=hotel-94113-es-9RLOfP84B7UCzAbItuimdAS110703434225%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-10552436505%3Alp9061047%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YcGt_tphEo8pawEozW2KQ80&aid=311090&sb=1&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fhotel%2Fes%2Falp-masella.es.html%3Faid%3D311090%3Blabel%3Dhotel-94113-es-9RLOfP84B7UCzAbItuimdAS110703434225%253Apl%253Ata%253Ap1%253Ap2%253Aac%253Aap%253Aneg%253Afi%253Atikwd-10552436505%253Alp9061047%253Ali%253Adec%253Adm%253Appccp%253DUmFuZG9tSVYkc2RlIyh9YcGt_tphEo8pawEozW2KQ80%3Bdist%3D0%3Broom1%3DA%252CA%3Bsb_price_type%3Dtotal%3Btype%3Dtotal%26%3B&highlighted_hotels=94113&hp_sbox=1&ss=La%20Masella&ssne=La%20Masella&ssne_untouched=La%20Masella&city=900048737&checkin_year=&checkin_month=&checkout_year=&checkout_month=&group_adults=2&group_children=0&no_rooms=1&is_ski_area=1&from_sf=1&order=price";

  const html = await axios.get(miURL);
  const $ = cheerio.load(html.data);

  const elementos = $(".sr_item");

  let datos = [];
  elementos.each(function loop(index, elemento) {

    let nombree = $(elemento).find(".sr-hotel__name").text();
    if (nombree.length > 10) {
      nombree.substr(0, 10)
    }


    const completo = {

      link: "https://www.booking.com/" + $(elemento).find(".sr_item_photo_link").attr("href"),
      imagen: $(elemento).find(".sr_item_photo_link").find("img").attr("src"),
      nombre: $(elemento).find(".sr-hotel__name").text(),
      descripcion: $(elemento).find(".hotel_desc").text(),
      valoracion: parseFloat($(elemento).find(".bui-review-score__badge").text())

    }

    datos.push(completo)
    console.log(completo);
    if (index == 10) {
      return false;
    }
  })

  Hotel.create(datos).then(
    () => { console.log("ok"); moongose.disconnect(); }
  ).catch(console.log("error"))

}

//cargarInfo();

///////////////////////////////////////////////////////////////////////////////////////

async function cargarUsr() {

  const dts = {
    nombre: "Luis",
    apellidos: "Jimenez San Clemente",
    pais: "esp",
    telefono: "657674666",
    email: "lugy94@gmail.com",
    pass: "aA2@asdfgs"
  }

  User.create(dts).then(
    () => { console.log("ok"); moongose.disconnect(); }
  ).catch(console.log("error"))
}

//cargarUsr();

///////////////////////////////////////////////////////////////////////////////////////////////

async function cargarInfohab() {
  const miURL = "https://hotelrocaalp.com/es/apartamentos/"
  const html = await axios.get(miURL);
  const $ = cheerio.load(html.data);

  const elementos = $(".fusion_builder_column_1_2");
  let datos = [];
  elementos.each(function loop(index, elemento) {

    //let tipo = $(elemento).find(".fusion-title").text();//title-heading-left
    let tipo = $(elemento).find(".title-heading-left").text();
    console.log(tipo);
    let precio =$(elemento).find(" div.fusion-text>p:first-child>span:first-child").text();
    const espacio = precio.indexOf(" ");
    const euro = precio.indexOf("€");
    //console.log(espacio+" -- "+euro);
    precio = precio.substring(espacio+1,euro);
    //Desde 90€/noche
    console.log(precio);
    let imagen = $(elemento).find(".hover-type-zoomin").find("img").attr("src");
    console.log(imagen);
    let descripcion=$(elemento).find(".fusion-column-wrapper>.fusion-text>p").text();
    console.log(descripcion);
    console.log("v-----------------v");

    const completo = {
      'disponible':true,
      'idHotel':'5f6bd0e448d12123a4d2039c',
      'tipo':tipo,
      'imagen':imagen,
      'descripcion':descripcion,
      'precio':precio
    }
    datos.push(completo);

  })

  Habitacion.create(datos).then(
    () => { console.log("okHabs"); moongose.disconnect(); }
  ).catch(console.log("error"))

}

cargarInfohab();

async function cargarFactura() {

  const dts = {
    idUsuario: "5f86dbde2e5e9756f005526e",
    idHotel:"5f6bd0e448d12123a4d20398",
    idHabitacion:"5f998bc7a3bc57300470eec6",
    fechaInicio: "Fri Nov 06 2020 14:00:37 GMT+0100",
    fechaFin: "Mon Nov 09 2020 14:00:37 GMT+0100",
    precioTot: "750"
  }
  Factura.create(dts).then(
    () => { console.log("ok"); moongose.disconnect(); }
  ).catch(console.log("error"))
}

cargarFactura();