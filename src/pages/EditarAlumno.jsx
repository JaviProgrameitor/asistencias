import '../assets/css/AgregarAlumno.css'

import { useState } from 'react'
import { Link, useResolvedPath } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'
import { IoIosAddCircle } from 'react-icons/io'
import { TiDelete } from 'react-icons/ti'


import Campo from '../components/Campo/Campo'
import CampoFecha from '../components/CampoFecha/CampoFecha'
import CampoEmail from '../components/CampoEmail/CampoEmail'
import ListaOpciones from '../components/ListaOpciones/ListaOpciones'
import FotoAlumno from '../components/FotoAlumno/FotoAlumno'
import CampoAutocompletar from '../components/CampoAutocompletar/CampoAutocompletar'

import { initializeApp } from "firebase/app";
import { setDoc, doc, getFirestore  } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import firebaseConfig from '../firebase';

import { Toaster, toast } from 'sonner'

function EditarAlumno(props) {
  const { idAlumno, asistenciasEntrada, justificantesAceptados, justificantesEnEspera, justificantesRechazados, pagosMensualidades } = props
  const { 
    foto,
    actaNacimiento,
    ine,
    curp,
    comprobantePagoInicial, 
    idFoto,
    idActaNacimiento,
    idIne,
    idCurp,
    idComprobantePagoInicial,
    nombre, 
    apellido, 
    numeroTelefono,
    codigoPostal,
    pais,
    estado,
    municipio,
    colonia,
    calle,
    numeroExterior,
    claveEstudiante, 
    idiomaAprendizaje, 
    modalidadEstudio, 
    fechaPago, 
    id, 
    fechaNacimiento,
    correo, 
    contrasena,
    nivelAcademico, 
    nivelIdioma, 
    fechaIngreso 
  } = props.datos

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const st = getStorage(app);

  const [ fotoPerfilAlumno, setFotoPerfilAlumno ] = useState(foto)
  const [ nombreAlumno, setNombreAlumno ] = useState(nombre)
  const [ apellidoAlumno, setApellidoAlumno ] = useState(apellido)
  const [ fechaNacimientoAlumno, setFechaNacimientoAlumno ] = useState(fechaNacimiento)
  const [ correoAlumno, setCorreoAlumno ] = useState(correo)
  const [ contrasenaAlumno, setContrasenaAlumno ] = useState(contrasena)
  const [ numeroTelefonoAlumno, setNumeroTelefonoAlumno ] = useState(numeroTelefono)
  const [ nivelAcademicoAlumno, setNivelAcademicoAlumno ] = useState(nivelAcademico)
  const [ codigoPostalAlumno, setCodigoPostalAlumno ] = useState(codigoPostal)
  const [ paisAlumno, setPaisAlumno ] = useState(pais)
  const [ estadoAlumno, setEstadoAlumno ] = useState(estado)
  const [ municipioAlumno, setMunicipioAlumno ] = useState(municipio)
  const [ coloniaAlumno, setColoniaAlumno ] = useState(colonia)
  const [ calleAlumno, setCalleAlumno ] = useState(calle)
  const [ numeroExteriorAlumno, setNumeroExteriorAlumno ] = useState(numeroExterior)
  const [ fotoActaNacimiento, setFotoActaNacimiento ] = useState(actaNacimiento)
  const [ fotoIne, setFotoIne ] = useState(ine)
  const [ fotoCurp, setFotoCurp ] = useState(curp)
  const [ fotoComprobantePagoInicial, setFotoComprobantePagoInicial ] = useState(comprobantePagoInicial)

  const [ claveEstudianteAlumno, setClaveEstudianteAlumno ] = useState(claveEstudiante)
  const [ idiomaAprendizajeAlumno, setIdiomaAprendizajeAlumno ] = useState(idiomaAprendizaje)
  const [ nivelIdiomaAlumno, setNivelIdiomaAlumno ] = useState(nivelIdioma)
  const [ modalidadEstudioAlumno, setModalidadEstudioAlumno ] = useState(modalidadEstudio)
  const [ fechaIngresoAlumno, setFechaIngresoAlumno ] = useState(fechaIngreso)
  const [ fechaPagoAlumno, setFechaPagoAlumno ] = useState(fechaPago)

  const [ idFotoAlumno, setIdFotoAlumno ] = useState(idFoto)
  const [ idFotoActaNacimiento, setIdFotoActaNacimiento ] = useState(idActaNacimiento)
  const [ idFotoIne, setIdFotoIne ] = useState(idIne)
  const [ idFotoCurp, setIdFotoCurp ] = useState(idCurp)
  const [ idFotoComprobantePagoInicial, setIdFotoComprobantePagoInicial ] = useState(idComprobantePagoInicial)

  const [ fotoApoyo, setFotoApoyo ] = useState(false)
  const [ fotoApoyoActaNacimiento, setFotoApoyoActaNacimiento ] = useState(false)
  const [ fotoApoyoIne, setFotoApoyoIne ] = useState(false)
  const [ fotoApoyoCurp, setFotoApoyoCurp ] = useState(false)
  const [ fotoApoyoComprobantePagoInicial, setFotoApoyoComprobantePagoInicial ] = useState(false)

  const opcionesNivelesAcademicos = [
    'Primaria',
    'Secundaria',
    'Bachillerato',
    'Educación Superior'
  ]

  const opcionesIdiomas = [
    'Inglés',
    'Francés',
    'Aleman'
  ]

  const opcionesModalidades = [
    'Presencial',
    'En linea'
  ]

  const opcionesNiveles = [
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2'
  ]

  const opcionesEstados = [
    'Aguascalientes', 
    'Baja California', 
    'Baja California Sur', 
    'Chihuahua', 
    'Chiapas', 
    'Campeche', 
    'Ciudad de Mexico', 
    'Coahuila', 
    'Colima', 
    'Durango', 
    'Guerrero', 
    'Guanajuato', 
    'Hidalgo', 
    'Jalisco', 
    'Michoacan', 
    'Estado de Mexico', 
    'Morelos', 
    'Nayarit', 
    'Nuevo Leon', 
    'Oaxaca', 
    'Puebla', 
    'Quintana Roo', 
    'Queretaro', 
    'Sinaloa', 
    'San Luis Potosi', 
    'Sonora', 
    'Tabasco', 
    'Tlaxcala', 
    'Tamaulipas', 
    'Veracruz', 
    'Yucatan', 
    'Zacatecas'
  ]

  const opcionesMunicipios = {
    "Aguascalientes": ["Aguascalientes","Asientos","Calvillo","Cosio","El Llano","Jesus Maria","Pabellon de Arteaga","Rincon de Romos","San Francisco de los Romo","San Jose de Gracia","Tepezala"],
    "Baja California": ["Ensenada","Mexicali","Playas de Rosarito","Tecate","Tijuana"],
    "Baja California Sur": ["Comondu","La Paz","Loreto","Los Cabos","Mulege"],
    "Campeche": ["Calakmul","Calkini","Campeche","Candelaria","Carmen","Champoton","Escarcega","Hecelchakan","Hopelchen","Palizada","Tenabo"],
    "Coahuila": ["Abasolo","Acuna","Allende","Arteaga","Candela","Castanos","Cuatro Cienegas","Escobedo","Francisco I. Madero","Frontera","General Cepeda","Guerrero","Hidalgo","Jimenez","Juarez","Lamadrid","Matamoros","Monclova","Morelos","Muzquiz","Nadadores","Nava","Ocampo","Parras","Piedras Negras","Progreso","Ramos Arizpe","Sabinas","Sacramento","Saltillo","San Buenaventura","San Juan de Sabinas","San Pedro","Sierra Mojada","Torreon","Viesca","Villa Union","Zaragoza"],
    "Colima": ["Armeria","Colima","Comala","Coquimatlan","Cuauhtemoc","Ixtlahuacan","Manzanillo","Minatitlan","Tecoman","Villa de Alvarez"],
    "Chiapas": ["Acacoyagua","Acala","Acapetahua","Aldama","Altamirano","Amatenango de la Frontera","Amatenango del Valle","Amatan","Angel Albino Corzo","Arriaga","Bejucal de Ocampo","Bella Vista","Benemerito de las Americas","Berriozabal","Bochil","Cacahoatan","Capitan Luis Angel Vidal","Catazaja","Chalchihuitan","Chamula","Chanal","Chapultenango","Chenalho","Chiapa de Corzo","Chiapilla","Chicoasen","Chicomuselo","Chilon","Cintalapa","Coapilla","Comitan de Dominguez","Copainala","El Bosque","El Parral","El Porvenir","Emiliano Zapata","Escuintla","Francisco Leon","Frontera Comalapa","Frontera Hidalgo","Huehuetan","Huitiupan","Huixtla","Huixtan","Ixhuatan","Ixtacomitan","Ixtapa","Ixtapangajoya","Jiquipilas","Jitotol","Juarez","La Concordia","La Grandeza","La Independencia","La Libertad","La Trinitaria","Larrainzar","Las Margaritas","Las Rosas","Mapastepec","Maravilla Tenejapa","Marques de Comillas","Mazapa de Madero","Mazatan","Metapa","Mezcalapa","Mitontic","Montecristo de Guerrero","Motozintla","Nicolas Ruiz","Ocosingo","Ocotepec","Ocozocoautla de Espinosa","Ostuacan","Osumacinta","Oxchuc","Palenque","Pantelho","Pantepec","Pichucalco","Pijijiapan","Pueblo Nuevo Solistahuacan","Rayon","Reforma","Rincon Chamula San Pedro","Sabanilla","Salto de Agua","San Andres Duraznal","San Cristobal de las Casas","San Fernando","San Juan Cancuc","San Lucas","Santiago el Pinar","Siltepec","Simojovel","Sitala","Socoltenango","Solosuchiapa","Soyalo","Suchiapa","Suchiate","Sunuapa","Tapachula","Tapalapa","Tapilula","Tecpatan","Tenejapa","Teopisca","Tila","Tonala","Totolapa","Tumbala","Tuxtla Chico","Tuxtla Gutierrez","Tuzantan","Tzimol","Union Juarez","Venustiano Carranza","Villa Comaltitlan","Villa Corzo","Villaflores","Yajalon","Zinacantan"],
    "Chihuahua": ["Ahumada","Aldama","Allende","Aquiles Serdan","Ascension","Bachiniva","Balleza","Batopilas de Manuel Gomez Morin","Bocoyna","Buenaventura","Camargo","Carichi","Casas Grandes","Chihuahua","Chinipas","Coronado","Coyame del Sotol","Cuauhtemoc","Cusihuiriachi","Delicias","Dr. Belisario Dominguez","El Tule","Galeana","Gran Morelos","Guachochi","Guadalupe y Calvo","Guadalupe","Guazapares","Guerrero","Gomez Farias","Hidalgo del Parral","Huejotitan","Ignacio Zaragoza","Janos","Jimenez","Julimes","Juarez","La Cruz","Lopez","Madera","Maguarichi","Manuel Benavides","Matachi","Matamoros","Meoqui","Morelos","Moris","Namiquipa","Nonoava","Nuevo Casas Grandes","Ocampo","Ojinaga","Praxedis G. Guerrero","Riva Palacio","Rosales","Rosario","San Francisco de Borja","San Francisco de Conchos","San Francisco del Oro","Santa Barbara","Santa Isabel","Satevo","Saucillo","Temosachic","Urique","Uruachi","Valle de Zaragoza"],
    "Ciudad de Mexico": ["Alvaro Obregon","Azcapotzalco","Benito Juarez","Coyoacan","Cuajimalpa de Morelos","Cuauhtemoc","Gustavo A. Madero","Iztacalco","Iztapalapa","La Magdalena Contreras","Miguel Hidalgo","Milpa Alta","Tlalpan","Tlahuac","Venustiano Carranza","Xochimilco"],
    "Durango": ["Canatlan","Canelas","Coneto de Comonfort","Cuencame","Durango","El Oro","General Simon Bolivar","Gomez Palacio","Guadalupe Victoria","Guanacevi","Hidalgo","Inde","Lerdo","Mapimi","Mezquital","Nazas","Nombre de Dios","Nuevo Ideal","Ocampo","Otaez","Panuco de Coronado","Penon Blanco","Poanas","Pueblo Nuevo","Rodeo","San Bernardo","San Dimas","San Juan de Guadalupe","San Juan del Rio","San Luis del Cordero","San Pedro del Gallo","Santa Clara","Santiago Papasquiaro","Suchil","Tamazula","Tepehuanes","Tlahualilo","Topia","Vicente Guerrero"],
    "Guanajuato": ["Abasolo","Acambaro","Apaseo el Alto","Apaseo el Grande","Atarjea","Celaya","Comonfort","Coroneo","Cortazar","Cueramaro","Doctor Mora","Dolores Hidalgo Cuna de la Independencia Nacional","Guanajuato","Huanimaro","Irapuato","Jaral del Progreso","Jerecuaro","Leon","Manuel Doblado","Moroleon","Ocampo","Penjamo","Pueblo Nuevo","Purisima del Rincon","Romita","Salamanca","Salvatierra","San Diego de la Union","San Felipe","San Francisco del Rincon","San Jose Iturbide","San Luis de la Paz","San Miguel de Allende","Santa Catarina","Santa Cruz de Juventino Rosas","Santiago Maravatio","Silao de la Victoria","Tarandacuao","Tarimoro","Tierra Blanca","Uriangato","Valle de Santiago","Victoria","Villagran","Xichu","Yuriria"],
    "Guerrero": ["Acapulco de Juarez","Acatepec","Ahuacuotzingo","Ajuchitlan del Progreso","Alcozauca de Guerrero","Alpoyeca","Apaxtla","Arcelia","Atenango del Rio","Atlamajalcingo del Monte","Atlixtac","Atoyac de Alvarez","Ayutla de los Libres","Azoyu","Benito Juarez","Buenavista de Cuellar","Chilapa de Alvarez","Chilpancingo de los Bravo","Coahuayutla de Jose Maria Izazaga","Cochoapa el Grande","Cocula","Copala","Copalillo","Copanatoyac","Coyuca de Benitez","Coyuca de Catalan","Cuajinicuilapa","Cualac","Cuautepec","Cuetzala del Progreso","Cutzamala de Pinzon","Eduardo Neri","Florencio Villarreal","General Canuto A. Neri","General Heliodoro Castillo","Huamuxtitlan","Huitzuco de los Figueroa","Iguala de la Independencia","Igualapa","Iliatenco","Ixcateopan de Cuauhtemoc","Jose Joaquin de Herrera","Juan R. Escudero","Juchitan","La Union de Isidoro Montes de Oca","Leonardo Bravo","Malinaltepec","Marquelia","Martir de Cuilapan","Metlatonoc","Mochitlan","Olinala","Ometepec","Pedro Ascencio Alquisiras","Petatlan","Pilcaya","Pungarabato","Quechultenango","San Luis Acatlan","San Marcos","San Miguel Totolapan","Taxco de Alarcon","Tecoanapa","Tecpan de Galeana","Teloloapan","Tepecoacuilco de Trujano","Tetipac","Tixtla de Guerrero","Tlacoachistlahuaca","Tlacoapa","Tlalchapa","Tlalixtaquilla de Maldonado","Tlapa de Comonfort","Tlapehuala","Xalpatlahuac","Xochihuehuetlan","Xochistlahuaca","Zapotitlan Tablas","Zihuatanejo de Azueta","Zirandaro","Zitlala"],
    "Hidalgo": ["Acatlan","Acaxochitlan","Actopan","Agua Blanca de Iturbide","Ajacuba","Alfajayucan","Almoloya","Apan","Atitalaquia","Atlapexco","Atotonilco de Tula","Atotonilco el Grande","Calnali","Cardonal","Chapantongo","Chapulhuacan","Chilcuautla","Cuautepec de Hinojosa","El Arenal","Eloxochitlan","Emiliano Zapata","Epazoyucan","Francisco I. Madero","Huasca de Ocampo","Huautla","Huazalingo","Huehuetla","Huejutla de Reyes","Huichapan","Ixmiquilpan","Jacala de Ledezma","Jaltocan","Juarez Hidalgo","La Mision","Lolotla","Metepec","Metztitlan","Mineral de la Reforma","Mineral del Chico","Mineral del Monte","Mixquiahuala de Juarez","Molango de Escamilla","Nicolas Flores","Nopala de Villagran","Omitlan de Juarez","Pachuca de Soto","Pacula","Pisaflores","Progreso de Obregon","San Agustin Metzquititlan","San Agustin Tlaxiaca","San Bartolo Tutotepec","San Felipe Orizatlan","San Salvador","Santiago Tulantepec de Lugo Guerrero","Santiago de Anaya","Singuilucan","Tasquillo","Tecozautla","Tenango de Doria","Tepeapulco","Tepehuacan de Guerrero","Tepeji del Rio de Ocampo","Tepetitlan","Tetepango","Tezontepec de Aldama","Tianguistengo","Tizayuca","Tlahuelilpan","Tlahuiltepa","Tlanalapa","Tlanchinol","Tlaxcoapan","Tolcayuca","Tula de Allende","Tulancingo de Bravo","Villa de Tezontepec","Xochiatipan","Xochicoatlan","Yahualica","Zacualtipan de Angeles","Zapotlan de Juarez","Zempoala","Zimapan"],
    "Jalisco": ["Acatic","Acatlan de Juarez","Ahualulco de Mercado","Amacueca","Amatitan","Ameca","Arandas","Atemajac de Brizuela","Atengo","Atenguillo","Atotonilco el Alto","Atoyac","Autlan de Navarro","Ayotlan","Ayutla","Bolanos","Cabo Corrientes","Canadas de Obregon","Casimiro Castillo","Chapala","Chimaltitan","Chiquilistlan","Cihuatlan","Cocula","Colotlan","Concepcion de Buenos Aires","Cuautitlan de Garcia Barragan","Cuautla","Cuquio","Degollado","Ejutla","El Arenal","El Grullo","El Limon","El Salto","Encarnacion de Diaz","Etzatlan","Gomez Farias","Guachinango","Guadalajara","Hostotipaquillo","Huejucar","Huejuquilla el Alto","Ixtlahuacan de los Membrillos","Ixtlahuacan del Rio","Jalostotitlan","Jamay","Jesus Maria","Jilotlan de los Dolores","Jocotepec","Juanacatlan","Juchitlan","La Barca","La Huerta","La Manzanilla de la Paz","Lagos de Moreno","Magdalena","Mascota","Mazamitla","Mexticacan","Mezquitic","Mixtlan","Ocotlan","Ojuelos de Jalisco","Pihuamo","Poncitlan","Puerto Vallarta","Quitupan","San Cristobal de la Barranca","San Diego de Alejandria","San Gabriel","San Ignacio Cerro Gordo","San Juan de los Lagos","San Juanito de Escobedo","San Julian","San Marcos","San Martin Hidalgo","San Martin de Bolanos","San Miguel el Alto","San Pedro Tlaquepaque","San Sebastian del Oeste","Santa Maria de los Angeles","Santa Maria del Oro","Sayula","Tala","Talpa de Allende","Tamazula de Gordiano","Tapalpa","Tecalitlan","Techaluta de Montenegro","Tecolotlan","Tenamaxtlan","Teocaltiche","Teocuitatlan de Corona","Tepatitlan de Morelos","Tequila","Teuchitlan","Tizapan el Alto","Tlajomulco de Zuniga","Toliman","Tomatlan","Tonala","Tonaya","Tonila","Totatiche","Tototlan","Tuxcacuesco","Tuxcueca","Tuxpan","Union de San Antonio","Union de Tula","Valle de Guadalupe","Valle de Juarez","Villa Corona","Villa Guerrero","Villa Hidalgo","Villa Purificacion","Yahualica de Gonzalez Gallo","Zacoalco de Torres","Zapopan","Zapotiltic","Zapotitlan de Vadillo","Zapotlan del Rey","Zapotlan el Grande","Zapotlanejo"],
    "Estado de Mexico": ["Acambay de Ruiz Castaneda","Acolman","Aculco","Almoloya de Alquisiras","Almoloya de Juarez","Almoloya del Rio","Amanalco","Amatepec","Amecameca","Apaxco","Atenco","Atizapan de Zaragoza","Atizapan","Atlacomulco","Atlautla","Axapusco","Ayapango","Calimaya","Capulhuac","Chalco","Chapa de Mota","Chapultepec","Chiautla","Chicoloapan","Chiconcuac","Chimalhuacan","Coacalco de Berriozabal","Coatepec Harinas","Cocotitlan","Coyotepec","Cuautitlan Izcalli","Cuautitlan","Donato Guerra","Ecatepec de Morelos","Ecatzingo","El Oro","Huehuetoca","Hueypoxtla","Huixquilucan","Isidro Fabela","Ixtapaluca","Ixtapan de la Sal","Ixtapan del Oro","Ixtlahuaca","Jaltenco","Jilotepec","Jilotzingo","Jiquipilco","Jocotitlan","Joquicingo","Juchitepec","La Paz","Lerma","Luvianos","Malinalco","Melchor Ocampo","Metepec","Mexicaltzingo","Morelos","Naucalpan de Juarez","Nextlalpan","Nezahualcoyotl","Nicolas Romero","Nopaltepec","Ocoyoacac","Ocuilan","Otumba","Otzoloapan","Otzolotepec","Ozumba","Papalotla","Polotitlan","Rayon","San Antonio la Isla","San Felipe del Progreso","San Jose del Rincon","San Martin de las Piramides","San Mateo Atenco","San Simon de Guerrero","Santo Tomas","Soyaniquilpan de Juarez","Sultepec","Tecamac","Tejupilco","Temamatla","Temascalapa","Temascalcingo","Temascaltepec","Temoaya","Tenancingo","Tenango del Aire","Tenango del Valle","Teoloyucan","Teotihuacan","Tepetlaoxtoc","Tepetlixpa","Tepotzotlan","Tequixquiac","Texcaltitlan","Texcalyacac","Texcoco","Tezoyuca","Tianguistenco","Timilpan","Tlalmanalco","Tlalnepantla de Baz","Tlatlaya","Toluca","Tonanitla","Tonatico","Tultepec","Tultitlan","Valle de Bravo","Valle de Chalco Solidaridad","Villa Guerrero","Villa Victoria","Villa de Allende","Villa del Carbon","Xalatlaco","Xonacatlan","Zacazonapan","Zacualpan","Zinacantepec","Zumpahuacan","Zumpango"],
    "Michoacan": ["Acuitzio","Aguililla","Alvaro Obregon","Angamacutiro","Angangueo","Apatzingan","Aporo","Aquila","Ario","Arteaga","Brisenas","Buenavista","Caracuaro","Charapan","Charo","Chavinda","Cheran","Chilchota","Chinicuila","Chucandiro","Churintzio","Churumuco","Coahuayana","Coalcoman de Vazquez Pallares","Coeneo","Cojumatlan de Regules","Contepec","Copandaro","Cotija","Cuitzeo","Ecuandureo","Epitacio Huerta","Erongaricuaro","Gabriel Zamora","Hidalgo","Huandacareo","Huaniqueo","Huetamo","Huiramba","Indaparapeo","Irimbo","Ixtlan","Jacona","Jimenez","Jiquilpan","Jose Sixto Verduzco","Juarez","Jungapeo","La Huacana","La Piedad","Lagunillas","Lazaro Cardenas","Los Reyes","Madero","Maravatio","Marcos Castellanos","Morelia","Morelos","Mugica","Nahuatzen","Nocupetaro","Nuevo Parangaricutiro","Nuevo Urecho","Numaran","Ocampo","Pajacuaran","Panindicuaro","Paracho","Paracuaro","Patzcuaro","Penjamillo","Periban","Purepero","Puruandiro","Querendaro","Quiroga","Sahuayo","Salvador Escalante","San Lucas","Santa Ana Maya","Senguio","Susupuato","Tacambaro","Tancitaro","Tangamandapio","Tangancicuaro","Tanhuato","Taretan","Tarimbaro","Tepalcatepec","Tingambato","Tinguindin","Tiquicheo de Nicolas Romero","Tlalpujahua","Tlazazalca","Tocumbo","Tumbiscatio","Turicato","Tuxpan","Tuzantla","Tzintzuntzan","Tzitzio","Uruapan","Venustiano Carranza","Villamar","Vista Hermosa","Yurecuaro","Zacapu","Zamora","Zinaparo","Zinapecuaro","Ziracuaretiro","Zitacuaro"],
    "Morelos": ["Amacuzac","Atlatlahucan","Axochiapan","Ayala","Coatlan del Rio","Cuautla","Cuernavaca","Emiliano Zapata","Huitzilac","Jantetelco","Jiutepec","Jojutla","Jonacatepec de Leandro Valle","Mazatepec","Miacatlan","Ocuituco","Puente de Ixtla","Temixco","Temoac","Tepalcingo","Tepoztlan","Tetecala","Tetela del Volcan","Tlalnepantla","Tlaltizapan de Zapata","Tlaquiltenango","Tlayacapan","Totolapan","Xochitepec","Yautepec","Yecapixtla","Zacatepec","Zacualpan de Amilpas"],
    "Nayarit": ["Acaponeta","Ahuacatlan","Amatlan de Canas","Bahia de Banderas","Compostela","Del Nayar","Huajicori","Ixtlan del Rio","Jala","La Yesca","Rosamorada","Ruiz","San Blas","San Pedro Lagunillas","Santa Maria del Oro","Santiago Ixcuintla","Tecuala","Tepic","Tuxpan","Xalisco"],
    "Nuevo Leon": ["Abasolo","Agualeguas","Allende","Anahuac","Apodaca","Aramberri","Bustamante","Cadereyta Jimenez","Cerralvo","China","Cienega de Flores","Doctor Arroyo","Doctor Coss","Doctor Gonzalez","El Carmen","Galeana","Garcia","General Bravo","General Escobedo","General Teran","General Trevino","General Zaragoza","General Zuazua","Guadalupe","Hidalgo","Higueras","Hualahuises","Iturbide","Juarez","Lampazos de Naranjo","Linares","Los Aldamas","Los Herreras","Los Ramones","Marin","Melchor Ocampo","Mier y Noriega","Mina","Montemorelos","Monterrey","Paras","Pesqueria","Rayones","Sabinas Hidalgo","Salinas Victoria","San Nicolas de los Garza","San Pedro Garza Garcia","Santa Catarina","Santiago","Vallecillo","Villaldama"],
    "Oaxaca":["Abejones","Acatlan de Perez Figueroa","Animas Trujano","Asuncion Cacalotepec","Asuncion Cuyotepeji","Asuncion Ixtaltepec","Asuncion Nochixtlan","Asuncion Ocotlan","Asuncion Tlacolulita","Ayoquezco de Aldama","Ayotzintepec","Calihuala","Candelaria Loxicha","Capulalpam de Mendez","Chahuites","Chalcatongo de Hidalgo","Chiquihuitlan de Benito Juarez","Cienega de Zimatlan","Ciudad Ixtepec","Coatecas Altas","Coicoyan de las Flores","Concepcion Buenavista","Concepcion Papalo","Constancia del Rosario","Cosolapa","Cosoltepec","Cuilapam de Guerrero","Cuna de la Independencia de Oaxaca","Cuyamecalco Villa de Zaragoza","El Barrio de la Soledad","El Espinal","Eloxochitlan de Flores Magon","Fresnillo de Trujano","Guadalupe Etla","Guadalupe de Ramirez","Guelatao de Juarez","Guevea de Humboldt","Heroica Ciudad de Ejutla de Crespo","Heroica Ciudad de Huajuapan de Leon","Heroica Ciudad de Juchitan de Zaragoza","Heroica Ciudad de Tlaxiaco","Heroica Villa Tezoatlan de Segura y Luna","Huautepec","Huautla de Jimenez","Ixpantepec Nieves","Ixtlan de Juarez","La Compania","La Pe","La Reforma","La Trinidad Vista Hermosa","Loma Bonita","Magdalena Apasco","Magdalena Jaltepec","Magdalena Mixtepec","Magdalena Ocotlan","Magdalena Penasco","Magdalena Teitipac","Magdalena Tequisistlan","Magdalena Tlacotepec","Magdalena Yodocono de Porfirio Diaz","Magdalena Zahuatlan","Mariscala de Juarez","Martires de Tacubaya","Matias Romero Avendano","Mazatlan Villa de Flores","Mesones Hidalgo","Miahuatlan de Porfirio Diaz","Mixistlan de la Reforma","Monjas","Natividad","Nazareno Etla","Nejapa de Madero","Nuevo Zoquiapam","Oaxaca de Juarez","Ocotlan de Morelos","Pinotepa de Don Luis","Pluma Hidalgo","Putla Villa de Guerrero","Reforma de Pineda","Reyes Etla","Rojas de Cuauhtemoc","Salina Cruz","San Agustin Amatengo","San Agustin Atenango","San Agustin Chayuco","San Agustin Etla","San Agustin Loxicha","San Agustin Tlacotepec","San Agustin Yatareni","San Agustin de las Juntas","San Andres Cabecera Nueva","San Andres Dinicuiti","San Andres Huaxpaltepec","San Andres Huayapam","San Andres Ixtlahuaca","San Andres Lagunas","San Andres Nuxino","San Andres Paxtlan","San Andres Sinaxtla","San Andres Solaga","San Andres Teotilalpam","San Andres Tepetlapa","San Andres Yaa","San Andres Zabache","San Andres Zautla","San Antonino Castillo Velasco","San Antonino Monte Verde","San Antonino el Alto","San Antonio Acutla","San Antonio Huitepec","San Antonio Nanahuatipam","San Antonio Sinicahua","San Antonio Tepetlapa","San Antonio de la Cal","San Baltazar Chichicapam","San Baltazar Loxicha","San Baltazar Yatzachi el Bajo","San Bartolo Coyotepec","San Bartolo Soyaltepec","San Bartolo Yautepec","San Bartolome Ayautla","San Bartolome Loxicha","San Bartolome Quialana","San Bartolome Yucuane","San Bartolome Zoogocho","San Bernardo Mixtepec","San Blas Atempa","San Carlos Yautepec","San Cristobal Amatlan","San Cristobal Amoltepec","San Cristobal Lachirioag","San Cristobal Suchixtlahuaca","San Dionisio Ocotepec","San Dionisio Ocotlan","San Dionisio del Mar","San Esteban Atatlahuca","San Felipe Jalapa de Diaz","San Felipe Tejalapam","San Felipe Usila","San Francisco Cahuacua","San Francisco Cajonos","San Francisco Chapulapa","San Francisco Chindua","San Francisco Huehuetlan","San Francisco Ixhuatan","San Francisco Jaltepetongo","San Francisco Lachigolo","San Francisco Logueche","San Francisco Nuxano","San Francisco Ozolotepec","San Francisco Sola","San Francisco Telixtlahuaca","San Francisco Teopan","San Francisco Tlapancingo","San Francisco del Mar","San Gabriel Mixtepec","San Ildefonso Amatlan","San Ildefonso Sola","San Ildefonso Villa Alta","San Jacinto Amilpas","San Jacinto Tlacotepec","San Jeronimo Coatlan","San Jeronimo Silacayoapilla","San Jeronimo Sosola","San Jeronimo Taviche","San Jeronimo Tecoatl","San Jeronimo Tlacochahuaya","San Jorge Nuchita","San Jose Ayuquila","San Jose Chiltepec","San Jose Estancia Grande","San Jose Independencia","San Jose Lachiguiri","San Jose Tenango","San Jose del Penasco","San Jose del Progreso","San Juan Achiutla","San Juan Atepec","San Juan Bautista Atatlahuca","San Juan Bautista Coixtlahuaca","San Juan Bautista Cuicatlan","San Juan Bautista Guelache","San Juan Bautista Jayacatlan","San Juan Bautista Lo de Soto","San Juan Bautista Suchitepec","San Juan Bautista Tlachichilco","San Juan Bautista Tlacoatzintepec","San Juan Bautista Tuxtepec","San Juan Bautista Valle Nacional","San Juan Cacahuatepec","San Juan Chicomezuchil","San Juan Chilateca","San Juan Cieneguilla","San Juan Coatzospam","San Juan Colorado","San Juan Comaltepec","San Juan Cotzocon","San Juan Diuxi","San Juan Evangelista Analco","San Juan Guelavia","San Juan Guichicovi","San Juan Ihualtepec","San Juan Juquila Mixes","San Juan Juquila Vijanos","San Juan Lachao","San Juan Lachigalla","San Juan Lajarcia","San Juan Lalana","San Juan Mazatlan","San Juan Mixtepec","San Juan Mixtepec","San Juan Numi","San Juan Ozolotepec","San Juan Petlapa","San Juan Quiahije","San Juan Quiotepec","San Juan Sayultepec","San Juan Tabaa","San Juan Tamazola","San Juan Teita","San Juan Teitipac","San Juan Tepeuxila","San Juan Teposcolula","San Juan Yaee","San Juan Yatzona","San Juan Yucuita","San Juan de los Cues","San Juan del Estado","San Juan del Rio","San Lorenzo Albarradas","San Lorenzo Cacaotepec","San Lorenzo Cuaunecuiltitla","San Lorenzo Texmelucan","San Lorenzo Victoria","San Lorenzo","San Lucas Camotlan","San Lucas Ojitlan","San Lucas Quiavini","San Lucas Zoquiapam","San Luis Amatlan","San Marcial Ozolotepec","San Marcos Arteaga","San Martin Huamelulpam","San Martin Itunyoso","San Martin Lachila","San Martin Peras","San Martin Tilcajete","San Martin Toxpalan","San Martin Zacatepec","San Martin de los Cansecos","San Mateo Cajonos","San Mateo Etlatongo","San Mateo Nejapam","San Mateo Penasco","San Mateo Pinas","San Mateo Rio Hondo","San Mateo Sindihui","San Mateo Tlapiltepec","San Mateo Yoloxochitlan","San Mateo Yucutindoo","San Mateo del Mar","San Melchor Betaza","San Miguel Achiutla","San Miguel Ahuehuetitlan","San Miguel Aloapam","San Miguel Amatitlan","San Miguel Amatlan","San Miguel Chicahua","San Miguel Chimalapa","San Miguel Coatlan","San Miguel Ejutla","San Miguel Huautla","San Miguel Mixtepec","San Miguel Panixtlahuaca","San Miguel Peras","San Miguel Piedras","San Miguel Quetzaltepec","San Miguel Santa Flor","San Miguel Soyaltepec","San Miguel Suchixtepec","San Miguel Tecomatlan","San Miguel Tenango","San Miguel Tequixtepec","San Miguel Tilquiapam","San Miguel Tlacamama","San Miguel Tlacotepec","San Miguel Tulancingo","San Miguel Yotao","San Miguel del Puerto","San Miguel del Rio","San Miguel el Grande","San Nicolas Hidalgo","San Nicolas","San Pablo Coatlan","San Pablo Cuatro Venados","San Pablo Etla","San Pablo Huitzo","San Pablo Huixtepec","San Pablo Macuiltianguis","San Pablo Tijaltepec","San Pablo Villa de Mitla","San Pablo Yaganiza","San Pedro Amuzgos","San Pedro Apostol","San Pedro Atoyac","San Pedro Cajonos","San Pedro Comitancillo","San Pedro Coxcaltepec Cantaros","San Pedro Huamelula","San Pedro Huilotepec","San Pedro Ixcatlan","San Pedro Ixtlahuaca","San Pedro Jaltepetongo","San Pedro Jicayan","San Pedro Jocotipac","San Pedro Juchatengo","San Pedro Martir Quiechapa","San Pedro Martir Yucuxaco","San Pedro Martir","San Pedro Mixtepec","San Pedro Mixtepec","San Pedro Molinos","San Pedro Nopala","San Pedro Ocopetatillo","San Pedro Ocotepec","San Pedro Pochutla","San Pedro Quiatoni","San Pedro Sochiapam","San Pedro Tapanatepec","San Pedro Taviche","San Pedro Teozacoalco","San Pedro Teutila","San Pedro Tidaa","San Pedro Topiltepec","San Pedro Totolapam","San Pedro Yaneri","San Pedro Yolox","San Pedro Yucunama","San Pedro el Alto","San Pedro y San Pablo Ayutla","San Pedro y San Pablo Teposcolula","San Pedro y San Pablo Tequixtepec","San Raymundo Jalpan","San Sebastian Abasolo","San Sebastian Coatlan","San Sebastian Ixcapa","San Sebastian Nicananduta","San Sebastian Rio Hondo","San Sebastian Tecomaxtlahuaca","San Sebastian Teitipac","San Sebastian Tutla","San Simon Almolongas","San Simon Zahuatlan","San Vicente Coatlan","San Vicente Lachixio","San Vicente Nunu","Santa Ana Ateixtlahuaca","Santa Ana Cuauhtemoc","Santa Ana Tavela","Santa Ana Tlapacoyan","Santa Ana Yareni","Santa Ana Zegache","Santa Ana del Valle","Santa Ana","Santa Catalina Quieri","Santa Catarina Cuixtla","Santa Catarina Ixtepeji","Santa Catarina Juquila","Santa Catarina Lachatao","Santa Catarina Loxicha","Santa Catarina Mechoacan","Santa Catarina Minas","Santa Catarina Quiane","Santa Catarina Quioquitani","Santa Catarina Tayata","Santa Catarina Ticua","Santa Catarina Yosonotu","Santa Catarina Zapoquila","Santa Cruz Acatepec","Santa Cruz Amilpas","Santa Cruz Itundujia","Santa Cruz Mixtepec","Santa Cruz Nundaco","Santa Cruz Papalutla","Santa Cruz Tacache de Mina","Santa Cruz Tacahua","Santa Cruz Tayata","Santa Cruz Xitla","Santa Cruz Xoxocotlan","Santa Cruz Zenzontepec","Santa Cruz de Bravo","Santa Gertrudis","Santa Ines Yatzeche","Santa Ines de Zaragoza","Santa Ines del Monte","Santa Lucia Miahuatlan","Santa Lucia Monteverde","Santa Lucia Ocotlan","Santa Lucia del Camino","Santa Magdalena Jicotlan","Santa Maria Alotepec","Santa Maria Apazco","Santa Maria Atzompa","Santa Maria Camotlan","Santa Maria Chachoapam","Santa Maria Chilchotla","Santa Maria Chimalapa","Santa Maria Colotepec","Santa Maria Cortijo","Santa Maria Coyotepec","Santa Maria Ecatepec","Santa Maria Guelace","Santa Maria Guienagati","Santa Maria Huatulco","Santa Maria Huazolotitlan","Santa Maria Ipalapa","Santa Maria Ixcatlan","Santa Maria Jacatepec","Santa Maria Jalapa del Marques","Santa Maria Jaltianguis","Santa Maria Lachixio","Santa Maria Mixtequilla","Santa Maria Nativitas","Santa Maria Nduayaco","Santa Maria Ozolotepec","Santa Maria Papalo","Santa Maria Penoles","Santa Maria Petapa","Santa Maria Quiegolani","Santa Maria Sola","Santa Maria Tataltepec","Santa Maria Tecomavaca","Santa Maria Temaxcalapa","Santa Maria Temaxcaltepec","Santa Maria Teopoxco","Santa Maria Tepantlali","Santa Maria Texcatitlan","Santa Maria Tlahuitoltepec","Santa Maria Tlalixtac","Santa Maria Tonameca","Santa Maria Totolapilla","Santa Maria Xadani","Santa Maria Yalina","Santa Maria Yavesia","Santa Maria Yolotepec","Santa Maria Yosoyua","Santa Maria Yucuhiti","Santa Maria Zacatepec","Santa Maria Zaniza","Santa Maria Zoquitlan","Santa Maria del Rosario","Santa Maria del Tule","Santa Maria la Asuncion","Santiago Amoltepec","Santiago Apoala","Santiago Apostol","Santiago Astata","Santiago Atitlan","Santiago Ayuquililla","Santiago Cacaloxtepec","Santiago Camotlan","Santiago Chazumba","Santiago Choapam","Santiago Comaltepec","Santiago Huajolotitlan","Santiago Huauclilla","Santiago Ihuitlan Plumas","Santiago Ixcuintepec","Santiago Ixtayutla","Santiago Jamiltepec","Santiago Jocotepec","Santiago Juxtlahuaca","Santiago Lachiguiri","Santiago Lalopa","Santiago Laollaga","Santiago Laxopa","Santiago Llano Grande","Santiago Matatlan","Santiago Miltepec","Santiago Minas","Santiago Nacaltepec","Santiago Nejapilla","Santiago Niltepec","Santiago Nundiche","Santiago Nuyoo","Santiago Pinotepa Nacional","Santiago Suchilquitongo","Santiago Tamazola","Santiago Tapextla","Santiago Tenango","Santiago Tepetlapa","Santiago Tetepec","Santiago Texcalcingo","Santiago Textitlan","Santiago Tilantongo","Santiago Tillo","Santiago Tlazoyaltepec","Santiago Xanica","Santiago Xiacui","Santiago Yaitepec","Santiago Yaveo","Santiago Yolomecatl","Santiago Yosondua","Santiago Yucuyachi","Santiago Zacatepec","Santiago Zoochila","Santiago del Rio","Santo Domingo Albarradas","Santo Domingo Armenta","Santo Domingo Chihuitan","Santo Domingo Ingenio","Santo Domingo Ixcatlan","Santo Domingo Nuxaa","Santo Domingo Ozolotepec","Santo Domingo Petapa","Santo Domingo Roayaga","Santo Domingo Tehuantepec","Santo Domingo Teojomulco","Santo Domingo Tepuxtepec","Santo Domingo Tlatayapam","Santo Domingo Tomaltepec","Santo Domingo Tonala","Santo Domingo Tonaltepec","Santo Domingo Xagacia","Santo Domingo Yanhuitlan","Santo Domingo Yodohino","Santo Domingo Zanatepec","Santo Domingo de Morelos","Santo Tomas Jalieza","Santo Tomas Mazaltepec","Santo Tomas Ocotepec","Santo Tomas Tamazulapan","Santos Reyes Nopala","Santos Reyes Papalo","Santos Reyes Tepejillo","Santos Reyes Yucuna","Silacayoapam","Sitio de Xitlapehua","Soledad Etla","Tamazulapam del Espiritu Santo","Tanetze de Zaragoza","Taniche","Tataltepec de Valdes","Teococuilco de Marcos Perez","Teotitlan de Flores Magon","Teotitlan del Valle","Teotongo","Tepelmeme Villa de Morelos","Tlacolula de Matamoros","Tlacotepec Plumas","Tlalixtac de Cabrera","Totontepec Villa de Morelos","Trinidad Zaachila","Union Hidalgo","Valerio Trujano","Villa Diaz Ordaz","Villa Hidalgo","Villa Sola de Vega","Villa Talea de Castro","Villa Tejupam de la Union","Villa de Chilapa de Diaz","Villa de Etla","Villa de Tamazulapam del Progreso","Villa de Tututepec","Villa de Zaachila","Yaxe","Yogana","Yutanduchi de Guerrero","Zapotitlan Lagunas","Zapotitlan Palmas","Zimatlan de Alvarez"],
    "Puebla": ["Acajete","Acateno","Acatlan","Acatzingo","Acteopan","Ahuacatlan","Ahuatlan","Ahuazotepec","Ahuehuetitla","Ajalpan","Albino Zertuche","Aljojuca","Altepexi","Amixtlan","Amozoc","Aquixtla","Atempan","Atexcal","Atlequizayan","Atlixco","Atoyatempan","Atzala","Atzitzihuacan","Atzitzintla","Axutla","Ayotoxco de Guerrero","Calpan","Caltepec","Camocuautla","Canada Morelos","Caxhuacan","Chalchicomula de Sesma","Chapulco","Chiautla","Chiautzingo","Chichiquila","Chiconcuautla","Chietla","Chigmecatitlan","Chignahuapan","Chignautla","Chila de la Sal","Chila","Chilchotla","Chinantla","Coatepec","Coatzingo","Cohetzala","Cohuecan","Coronango","Coxcatlan","Coyomeapan","Coyotepec","Cuapiaxtla de Madero","Cuautempan","Cuautinchan","Cuautlancingo","Cuayuca de Andrade","Cuetzalan del Progreso","Cuyoaco","Domingo Arenas","Eloxochitlan","Epatlan","Esperanza","Francisco Z. Mena","General Felipe Angeles","Guadalupe Victoria","Guadalupe","Hermenegildo Galeana","Honey","Huaquechula","Huatlatlauca","Huauchinango","Huehuetla","Huehuetlan el Chico","Huehuetlan el Grande","Huejotzingo","Hueyapan","Hueytamalco","Hueytlalpan","Huitzilan de Serdan","Huitziltepec","Ixcamilpa de Guerrero","Ixcaquixtla","Ixtacamaxtitlan","Ixtepec","Izucar de Matamoros","Jalpan","Jolalpan","Jonotla","Jopala","Juan C. Bonilla","Juan Galindo","Juan N. Mendez","La Magdalena Tlatlauquitepec","Lafragua","Libres","Los Reyes de Juarez","Mazapiltepec de Juarez","Mixtla","Molcaxac","Naupan","Nauzontla","Nealtican","Nicolas Bravo","Nopalucan","Ocotepec","Ocoyucan","Olintla","Oriental","Pahuatlan","Palmar de Bravo","Pantepec","Petlalcingo","Piaxtla","Puebla","Quecholac","Quimixtlan","Rafael Lara Grajales","San Andres Cholula","San Antonio Canada","San Diego la Mesa Tochimiltzingo","San Felipe Teotlalcingo","San Felipe Tepatlan","San Gabriel Chilac","San Gregorio Atzompa","San Jeronimo Tecuanipan","San Jeronimo Xayacatlan","San Jose Chiapa","San Jose Miahuatlan","San Juan Atenco","San Juan Atzompa","San Martin Texmelucan","San Martin Totoltepec","San Matias Tlalancaleca","San Miguel Ixitlan","San Miguel Xoxtla","San Nicolas Buenos Aires","San Nicolas de los Ranchos","San Pablo Anicano","San Pedro Cholula","San Pedro Yeloixtlahuaca","San Salvador Huixcolotla","San Salvador el Seco","San Salvador el Verde","San Sebastian Tlacotepec","Santa Catarina Tlaltempan","Santa Ines Ahuatempan","Santa Isabel Cholula","Santiago Miahuatlan","Santo Tomas Hueyotlipan","Soltepec","Tecali de Herrera","Tecamachalco","Tecomatlan","Tehuacan","Tehuitzingo","Tenampulco","Teopantlan","Teotlalco","Tepanco de Lopez","Tepango de Rodriguez","Tepatlaxco de Hidalgo","Tepeaca","Tepemaxalco","Tepeojuma","Tepetzintla","Tepexco","Tepexi de Rodriguez","Tepeyahualco de Cuauhtemoc","Tepeyahualco","Tetela de Ocampo","Teteles de Avila Castillo","Teziutlan","Tianguismanalco","Tilapa","Tlachichuca","Tlacotepec de Benito Juarez","Tlacuilotepec","Tlahuapan","Tlaltenango","Tlanepantla","Tlaola","Tlapacoya","Tlapanala","Tlatlauquitepec","Tlaxco","Tochimilco","Tochtepec","Totoltepec de Guerrero","Tulcingo","Tuzamapan de Galeana","Tzicatlacoyan","Venustiano Carranza","Vicente Guerrero","Xayacatlan de Bravo","Xicotepec","Xicotlan","Xiutetelco","Xochiapulco","Xochiltepec","Xochitlan Todos Santos","Xochitlan de Vicente Suarez","Yaonahuac","Yehualtepec","Zacapala","Zacapoaxtla","Zacatlan","Zapotitlan de Mendez","Zapotitlan","Zaragoza","Zautla","Zihuateutla","Zinacatepec","Zongozotla","Zoquiapan","Zoquitlan"],
    "Queretaro": ["Amealco de Bonfil","Arroyo Seco","Cadereyta de Montes","Colon","Corregidora","El Marques","Ezequiel Montes","Huimilpan","Jalpan de Serra","Landa de Matamoros","Pedro Escobedo","Penamiller","Pinal de Amoles","Queretaro","San Joaquin","San Juan del Rio","Tequisquiapan","Toliman"],
    "Quintana Roo": ["Bacalar","Benito Juarez","Cozumel","Felipe Carrillo Puerto","Isla Mujeres","Jose Maria Morelos","Lazaro Cardenas","Othon P. Blanco","Puerto Morelos","Solidaridad","Tulum"],
    "San Luis Potosi": ["Ahualulco","Alaquines","Aquismon","Armadillo de los Infante","Axtla de Terrazas","Cardenas","Catorce","Cedral","Cerritos","Cerro de San Pedro","Charcas","Ciudad Fernandez","Ciudad Valles","Ciudad del Maiz","Coxcatlan","Ebano","El Naranjo","Guadalcazar","Huehuetlan","Lagunillas","Matehuala","Matlapa","Mexquitic de Carmona","Moctezuma","Rayon","Rioverde","Salinas","San Antonio","San Ciro de Acosta","San Luis Potosi","San Martin Chalchicuautla","San Nicolas Tolentino","San Vicente Tancuayalab","Santa Catarina","Santa Maria del Rio","Santo Domingo","Soledad de Graciano Sanchez","Tamasopo","Tamazunchale","Tampacan","Tampamolon Corona","Tamuin","Tancanhuitz","Tanlajas","Tanquian de Escobedo","Tierra Nueva","Vanegas","Venado","Villa Hidalgo","Villa Juarez","Villa de Arista","Villa de Arriaga","Villa de Guadalupe","Villa de Ramos","Villa de Reyes","Villa de la Paz","Xilitla","Zaragoza"],
    "Sinaloa": ["Ahome","Angostura","Badiraguato","Choix","Concordia","Cosala","Culiacan","El Fuerte","Elota","Escuinapa","Guasave","Mazatlan","Mocorito","Navolato","Rosario","Salvador Alvarado","San Ignacio","Sinaloa"],
    "Sonora": ["Aconchi","Agua Prieta","Alamos","Altar","Arivechi","Arizpe","Atil","Bacadehuachi","Bacanora","Bacerac","Bacoachi","Bacum","Banamichi","Baviacora","Bavispe","Benito Juarez","Benjamin Hill","Caborca","Cajeme","Cananea","Carbo","Cucurpe","Cumpas","Divisaderos","Empalme","Etchojoa","Fronteras","General Plutarco Elias Calles","Granados","Guaymas","Hermosillo","Huachinera","Huasabas","Huatabampo","Huepac","Imuris","La Colorada","Magdalena","Mazatan","Moctezuma","Naco","Nacori Chico","Nacozari de Garcia","Navojoa","Nogales","Onavas","Opodepe","Oquitoa","Pitiquito","Puerto Penasco","Quiriego","Rayon","Rosario","Sahuaripa","San Felipe de Jesus","San Ignacio Rio Muerto","San Javier","San Luis Rio Colorado","San Miguel de Horcasitas","San Pedro de la Cueva","Santa Ana","Santa Cruz","Saric","Soyopa","Suaqui Grande","Tepache","Trincheras","Tubutama","Ures","Villa Hidalgo","Villa Pesqueira","Yecora"],
    "Tabasco": ["Balancan","Cardenas","Centla","Centro","Comalcalco","Cunduacan","Emiliano Zapata","Huimanguillo","Jalapa","Jalpa de Mendez","Jonuta","Macuspana","Nacajuca","Paraiso","Tacotalpa","Teapa","Tenosique"],
    "Tamaulipas": ["Abasolo","Aldama","Altamira","Antiguo Morelos","Burgos","Bustamante","Camargo","Casas","Ciudad Madero","Cruillas","El Mante","Gomez Farias","Gonzalez","Guemez","Guerrero","Gustavo Diaz Ordaz","Hidalgo","Jaumave","Jimenez","Llera","Mainero","Matamoros","Mendez","Mier","Miguel Aleman","Miquihuana","Nuevo Laredo","Nuevo Morelos","Ocampo","Padilla","Palmillas","Reynosa","Rio Bravo","San Carlos","San Fernando","San Nicolas","Soto la Marina","Tampico","Tula","Valle Hermoso","Victoria","Villagran","Xicotencatl"],
    "Tlaxcala": ["Acuamanala de Miguel Hidalgo","Amaxac de Guerrero","Apetatitlan de Antonio Carvajal","Apizaco","Atlangatepec","Atltzayanca","Benito Juarez","Calpulalpan","Chiautempan","Contla de Juan Cuamatzi","Cuapiaxtla","Cuaxomulco","El Carmen Tequexquitla","Emiliano Zapata","Espanita","Huamantla","Hueyotlipan","Ixtacuixtla de Mariano Matamoros","Ixtenco","La Magdalena Tlaltelulco","Lazaro Cardenas","Mazatecochco de Jose Maria Morelos","Munoz de Domingo Arenas","Nanacamilpa de Mariano Arista","Nativitas","Panotla","Papalotla de Xicohtencatl","San Damian Texoloc","San Francisco Tetlanohcan","San Jeronimo Zacualpan","San Jose Teacalco","San Juan Huactzinco","San Lorenzo Axocomanitla","San Lucas Tecopilco","San Pablo del Monte","Sanctorum de Lazaro Cardenas","Santa Ana Nopalucan","Santa Apolonia Teacalco","Santa Catarina Ayometla","Santa Cruz Quilehtla","Santa Cruz Tlaxcala","Santa Isabel Xiloxoxtla","Tenancingo","Teolocholco","Tepetitla de Lardizabal","Tepeyanco","Terrenate","Tetla de la Solidaridad","Tetlatlahuca","Tlaxcala","Tlaxco","Tocatlan","Totolac","Tzompantepec","Xaloztoc","Xaltocan","Xicohtzinco","Yauhquemehcan","Zacatelco","Ziltlaltepec de Trinidad Sanchez Santos"],
    "Veracruz": ["Acajete","Acatlan","Acayucan","Actopan","Acula","Acultzingo","Agua Dulce","Alamo Temapache","Alpatlahuac","Alto Lucero de Gutierrez Barrios","Altotonga","Alvarado","Amatitlan","Amatlan de los Reyes","Angel R. Cabada","Apazapan","Aquila","Astacinga","Atlahuilco","Atoyac","Atzacan","Atzalan","Ayahualulco","Banderilla","Benito Juarez","Boca del Rio","Calcahualco","Camaron de Tejeda","Camerino Z. Mendoza","Carlos A. Carrillo","Carrillo Puerto","Castillo de Teayo","Catemaco","Cazones de Herrera","Cerro Azul","Chacaltianguis","Chalma","Chiconamel","Chiconquiaco","Chicontepec","Chinameca","Chinampa de Gorostiza","Chocaman","Chontla","Chumatlan","Citlaltepetl","Coacoatzintla","Coahuitlan","Coatepec","Coatzacoalcos","Coatzintla","Coetzala","Colipa","Comapa","Cordoba","Cosamaloapan de Carpio","Cosautlan de Carvajal","Coscomatepec","Cosoleacaque","Cotaxtla","Coxquihui","Coyutla","Cuichapa","Cuitlahuac","El Higo","Emiliano Zapata","Espinal","Filomeno Mata","Fortin","Gutierrez Zamora","Hidalgotitlan","Huatusco","Huayacocotla","Hueyapan de Ocampo","Huiloapan de Cuauhtemoc","Ignacio de la Llave","Ilamatlan","Isla","Ixcatepec","Ixhuacan de los Reyes","Ixhuatlan de Madero","Ixhuatlan del Cafe","Ixhuatlan del Sureste","Ixhuatlancillo","Ixmatlahuacan","Ixtaczoquitlan","Jalacingo","Jalcomulco","Jaltipan","Jamapa","Jesus Carranza","Jilotepec","Jose Azueta","Juan Rodriguez Clara","Juchique de Ferrer","La Antigua","La Perla","Landero y Coss","Las Choapas","Las Minas","Las Vigas de Ramirez","Lerdo de Tejada","Los Reyes","Magdalena","Maltrata","Manlio Fabio Altamirano","Mariano Escobedo","Martinez de la Torre","Mecatlan","Mecayapan","Medellin de Bravo","Miahuatlan","Minatitlan","Misantla","Mixtla de Altamirano","Moloacan","Nanchital de Lazaro Cardenas del Rio","Naolinco","Naranjal","Naranjos Amatlan","Nautla","Nogales","Oluta","Omealca","Orizaba","Otatitlan","Oteapan","Ozuluama de Mascarenas","Pajapan","Panuco","Papantla","Paso de Ovejas","Paso del Macho","Perote","Platon Sanchez","Playa Vicente","Poza Rica de Hidalgo","Pueblo Viejo","Puente Nacional","Rafael Delgado","Rafael Lucio","Rio Blanco","Saltabarranca","San Andres Tenejapan","San Andres Tuxtla","San Juan Evangelista","San Rafael","Santiago Sochiapan","Santiago Tuxtla","Sayula de Aleman","Sochiapa","Soconusco","Soledad Atzompa","Soledad de Doblado","Soteapan","Tamalin","Tamiahua","Tampico Alto","Tancoco","Tantima","Tantoyuca","Tatahuicapan de Juarez","Tatatila","Tecolutla","Tehuipango","Tempoal","Tenampa","Tenochtitlan","Teocelo","Tepatlaxco","Tepetlan","Tepetzintla","Tequila","Texcatepec","Texhuacan","Texistepec","Tezonapa","Tierra Blanca","Tihuatlan","Tlachichilco","Tlacojalpan","Tlacolulan","Tlacotalpan","Tlacotepec de Mejia","Tlalixcoyan","Tlalnelhuayocan","Tlaltetela","Tlapacoyan","Tlaquilpa","Tlilapan","Tomatlan","Tonayan","Totutla","Tres Valles","Tuxpan","Tuxtilla","Ursulo Galvan","Uxpanapa","Vega de Alatorre","Veracruz","Villa Aldama","Xalapa","Xico","Xoxocotla","Yanga","Yecuatla","Zacualpan","Zaragoza","Zentla","Zongolica","Zontecomatlan de Lopez y Fuentes","Zozocolco de Hidalgo"],
    "Yucatan": ["Abala","Acanceh","Akil","Baca","Bokoba","Buctzotz","Cacalchen","Calotmul","Cansahcab","Cantamayec","Celestun","Cenotillo","Chacsinkin","Chankom","Chapab","Chemax","Chichimila","Chicxulub Pueblo","Chikindzonot","Chochola","Chumayel","Conkal","Cuncunul","Cuzama","Dzan","Dzemul","Dzidzantun","Dzilam Gonzalez","Dzilam de Bravo","Dzitas","Dzoncauich","Espita","Halacho","Hocaba","Hoctun","Homun","Huhi","Hunucma","Ixil","Izamal","Kanasin","Kantunil","Kaua","Kinchil","Kopoma","Mama","Mani","Maxcanu","Mayapan","Merida","Mococha","Motul","Muna","Muxupip","Opichen","Oxkutzcab","Panaba","Peto","Progreso","Quintana Roo","Rio Lagartos","Sacalum","Samahil","San Felipe","Sanahcat","Santa Elena","Seye","Sinanche","Sotuta","Sucila","Sudzal","Suma","Tahdziu","Tahmek","Teabo","Tecoh","Tekal de Venegas","Tekanto","Tekax","Tekit","Tekom","Telchac Pueblo","Telchac Puerto","Temax","Temozon","Tepakan","Tetiz","Teya","Ticul","Timucuy","Tinum","Tixcacalcupul","Tixkokob","Tixmehuac","Tixpehual","Tizimin","Tunkas","Tzucacab","Uayma","Ucu","Uman","Valladolid","Xocchel","Yaxcaba","Yaxkukul","Yobain"],
    "Zacatecas": ["Apozol","Apulco","Atolinga","Benito Juarez","Calera","Canitas de Felipe Pescador","Chalchihuites","Concepcion del Oro","Cuauhtemoc","El Plateado de Joaquin Amaro","El Salvador","Fresnillo","Genaro Codina","General Enrique Estrada","General Francisco R. Murguia","General Panfilo Natera","Guadalupe","Huanusco","Jalpa","Jerez","Jimenez del Teul","Juan Aldama","Juchipila","Loreto","Luis Moya","Mazapil","Melchor Ocampo","Mezquital del Oro","Miguel Auza","Momax","Monte Escobedo","Morelos","Moyahua de Estrada","Nochistlan de Mejia","Noria de Angeles","Ojocaliente","Panuco","Pinos","Rio Grande","Sain Alto","Santa Maria de la Paz","Sombrerete","Susticacan","Tabasco","Tepechitlan","Tepetongo","Teul de Gonzalez Ortega","Tlaltenango de Sanchez Roman","Trancoso","Trinidad Garcia de la Cadena","Valparaiso","Vetagrande","Villa Garcia","Villa Gonzalez Ortega","Villa Hidalgo","Villa de Cos","Villanueva","Zacatecas"]
  }

  const opcionesFechasPagos = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ]

  function controlarValor() {
    if(opcionesMunicipios[estadoAlumno] !== undefined) return opcionesMunicipios[estadoAlumno]
    else return ['']
  }

  function asignarValor(valor) {
    setMunicipioAlumno('')
    valor === null ? setEstadoAlumno('') : setEstadoAlumno(valor)
  }

  function agregarIdioma() {
    setIdiomaAprendizajeAlumno([...idiomaAprendizajeAlumno, ''])
    setNivelIdiomaAlumno([...nivelIdiomaAlumno, ''])
    setModalidadEstudioAlumno([...modalidadEstudioAlumno, ''])
    setFechaIngresoAlumno([...fechaIngresoAlumno, ''])
    setFechaPagoAlumno([...fechaPagoAlumno, ''])
  }

  function eliminarIdioma(index) {
    const idiomaEliminar = idiomaAprendizajeAlumno.splice(index, 1)
    const nivelIdiomaEliminar = nivelIdiomaAlumno.splice(index, 1)
    const modalidadEliminar = modalidadEstudioAlumno.splice(index, 1)
    const fechaIngresoEliminar = fechaIngresoAlumno.splice(index,1)
    const fechaPagoEliminar = fechaPagoAlumno.splice(index, 1)

    const nuevosIdiomas = idiomaAprendizajeAlumno.filter((idioma) => idioma !== idiomaEliminar)
    const nuevosNivelIdioma = nivelIdiomaAlumno.filter((nivel) => nivel !== nivelIdiomaEliminar)
    const nuevosModalidades = modalidadEstudioAlumno.filter((modalidad) => modalidad !== modalidadEliminar)
    const nuevosFechasIngreso = fechaIngresoAlumno.filter((fecha) => fecha !== fechaIngresoEliminar)
    const nuevosFechaPago = fechaPagoAlumno.filter((fecha) => fecha !== fechaPagoEliminar)

    setIdiomaAprendizajeAlumno(nuevosIdiomas)
    setNivelIdiomaAlumno(nuevosNivelIdioma)
    setModalidadEstudioAlumno(nuevosModalidades)
    setFechaIngresoAlumno(nuevosFechasIngreso)
    setFechaPagoAlumno(nuevosFechaPago)
  }
  
  function actualizarDatos(valor, index, variable, funcion) {
    let nuevosValores = variable.map((valores) => {
      return valores
    })

    const actualizados = nuevosValores.splice(index, 1, valor)
    funcion(nuevosValores)
  }

  async function editarAlumnos(e) {
    e.preventDefault()

    let foto;
    let idFoto;

    let actaNacimiento;
    let idActaNacimiento;

    let ine;
    let idIne;

    let curp;
    let idCurp;

    let comprobantePagoInicial;
    let idComprobantePagoInicial;

    //Todo: Foto perfil alumno
    if(fotoApoyo) {
      const desertRef = ref(st, `alumnos/${idFotoAlumno}`);
      await deleteObject(desertRef)

      const metadata = {contentType: fotoPerfilAlumno.type};
      const storageRef = ref(st, `alumnos/${idFotoAlumno}`)
      await uploadBytesResumable(storageRef, fotoPerfilAlumno, metadata)
  
      foto = await getDownloadURL(storageRef)
      idFoto = idFotoAlumno
    }

    else if(fotoApoyo === false) {
      foto = fotoPerfilAlumno
      idFoto = idFotoAlumno
    }

    //Todo: Foto de la acta de nacimiento
    if(fotoApoyoActaNacimiento) {
      const desertRef = ref(st, `documentos/${idFotoActaNacimiento}`);
      await deleteObject(desertRef)

      const metadataActa = {contentType: fotoActaNacimiento.type};
      const storageRefActa = ref(st, `documentos/${idFotoActaNacimiento}`)
      await uploadBytesResumable(storageRefActa, fotoActaNacimiento, metadataActa)

      actaNacimiento = await getDownloadURL(storageRefActa)
      idActaNacimiento = idFotoActaNacimiento
    }

    else if(fotoApoyoActaNacimiento === false) {
      actaNacimiento = fotoActaNacimiento
      idActaNacimiento = idFotoActaNacimiento
    }

    //Todo: Foto de el ine
    if(fotoApoyoIne) {
      const desertRef = ref(st, `documentos/${idFotoIne}`);
      await deleteObject(desertRef)

      const metadataActa = {contentType: fotoIne.type};
      const storageRefActa = ref(st, `documentos/${idFotoIne}`)
      await uploadBytesResumable(storageRefActa, fotoIne, metadataActa)

      ine = await getDownloadURL(storageRefActa)
      idIne = idFotoIne
    }

    else if(fotoApoyoIne === false) {
      ine = fotoIne
      idIne = idFotoIne
    }

    //Todo: Foto de la curp
    if(fotoApoyoCurp) {
      const desertRef = ref(st, `documentos/${idFotoCurp}`);
      await deleteObject(desertRef)

      const metadataActa = {contentType: fotoCurp.type};
      const storageRefActa = ref(st, `documentos/${idFotoCurp}`)
      await uploadBytesResumable(storageRefActa, fotoCurp, metadataActa)

      curp = await getDownloadURL(storageRefActa)
      idCurp = idFotoCurp
    }

    else if(fotoApoyoCurp === false) {
      curp = fotoCurp
      idCurp = idFotoCurp
    }

    //Todo: Foto de el comprobante de pago inicial
    if(fotoApoyoComprobantePagoInicial) {
      const desertRef = ref(st, `documentos/${idFotoComprobantePagoInicial}`);
      await deleteObject(desertRef)

      const metadataActa = {contentType: fotoComprobantePagoInicial.type};
      const storageRefActa = ref(st, `documentos/${idFotoComprobantePagoInicial}`)
      await uploadBytesResumable(storageRefActa, fotoComprobantePagoInicial, metadataActa)

      comprobantePagoInicial = await getDownloadURL(storageRefActa)
      idComprobantePagoInicial = idFotoComprobantePagoInicial
    }

    else if(fotoApoyoComprobantePagoInicial === false) {
      comprobantePagoInicial = fotoComprobantePagoInicial
      idComprobantePagoInicial = idFotoComprobantePagoInicial
    }

    //Todo: Editar el nombre, apellido y clave de estudiante de las asistencias del alumno
    for(let i = 0; i < asistenciasEntrada.length; i++) {
      let {
        nombreAsistenciaEntrada, 
        apellidoAsistenciaEntrada,
        claveEstudianteAsistenciaEntrada,
        fechaCompletaAsistenciaEntrada,
        horaAsistenciaEntrada,
        diaAsistenciaEntrada,
        fechaAsistenciaEntrada,
        mesAsistenciaEntrada,
        añoAsistenciaEntrada,
        diasHorarios,
        horaHorario,
        claveHorario,
        puntualidadClase,
        modalidadClase,
        entradaSalidaAsistencia, 
        id,
        fechaInternaAsistenciaEntrada,
        idiomaAsistenciaEntrada,
        horaAsistenciaMilisegundos
      } = asistenciasEntrada[i]

      nombreAsistenciaEntrada = nombreAlumno
      apellidoAsistenciaEntrada = apellidoAlumno
      claveEstudianteAsistenciaEntrada = claveEstudianteAlumno

      const datos = {
        nombreAsistenciaEntrada, 
        apellidoAsistenciaEntrada,
        claveEstudianteAsistenciaEntrada,
        fechaCompletaAsistenciaEntrada,
        fechaInternaAsistenciaEntrada,
        horaAsistenciaEntrada,
        diaAsistenciaEntrada,
        fechaAsistenciaEntrada,
        mesAsistenciaEntrada,
        añoAsistenciaEntrada,
        diasHorarios,
        horaHorario,
        claveHorario,
        puntualidadClase,
        modalidadClase,
        entradaSalidaAsistencia,
        idiomaAsistenciaEntrada,
        horaAsistenciaMilisegundos
      }

      const docRef = doc(db, 'asistenciasEntrada', id)
      await setDoc(docRef, datos)
    }

    //Todo: Editar el nombre, apellido y clave de estudiante de los justificantes en espera del alumno
    for(let i = 0; i < justificantesEnEspera.length; i++) {
      let {
        nombreJustificante, 
        apellidoJustificante,
        claveEstudianteJustificante,
        numeroTelefonoJustificante,
        fechaEmisionJustificante,
        horaEmisionJustificante,
        fechaJustificante,
        motivoJustificante,
        explicacionJustificante,
        fotoJustificante,
        correoJustificante,
        idFotoJustificante,
        id
      } = justificantesEnEspera[i]

      nombreJustificante = nombreAlumno
      apellidoJustificante = apellidoAlumno
      claveEstudianteJustificante = claveEstudianteAlumno

      const datos = {
        nombreJustificante, 
        apellidoJustificante,
        claveEstudianteJustificante,
        numeroTelefonoJustificante,
        fechaEmisionJustificante,
        horaEmisionJustificante,
        fechaJustificante,
        motivoJustificante,
        explicacionJustificante,
        fotoJustificante,
        correoJustificante,
        idFotoJustificante,
      }

      const docRef = doc(db, 'justificantesEnEspera', id)
      await setDoc(docRef, datos)
    }

    //Todo: Editar el nombre, apellido y clave de estudiante de los justificantes aceptados del alumno
    for(let i = 0; i < justificantesAceptados.length; i++) {
      let {
        nombreJustificante, 
        apellidoJustificante,
        claveEstudianteJustificante,
        numeroTelefonoJustificante,
        fechaEmisionJustificante,
        horaEmisionJustificante,
        fechaJustificante,
        motivoJustificante,
        explicacionJustificante,
        fotoJustificante,
        correoJustificante,
        idFotoJustificante,
        id
      } = justificantesAceptados[i]

      nombreJustificante = nombreAlumno
      apellidoJustificante = apellidoAlumno
      claveEstudianteJustificante = claveEstudianteAlumno

      const datos = {
        nombreJustificante, 
        apellidoJustificante,
        claveEstudianteJustificante,
        numeroTelefonoJustificante,
        fechaEmisionJustificante,
        horaEmisionJustificante,
        fechaJustificante,
        motivoJustificante,
        explicacionJustificante,
        fotoJustificante,
        correoJustificante,
        idFotoJustificante,
      }

      const docRef = doc(db, 'justificantesAceptados', id)
      await setDoc(docRef, datos)
    }

    //Todo: Editar el nombre, apellido y clave de estudiante de los justificantes rechazados del alumno
    for(let i = 0; i < justificantesRechazados.length; i++) {
      let {
        nombreJustificante, 
        apellidoJustificante,
        claveEstudianteJustificante,
        numeroTelefonoJustificante,
        fechaEmisionJustificante,
        horaEmisionJustificante,
        fechaJustificante,
        motivoJustificante,
        explicacionJustificante,
        fotoJustificante,
        correoJustificante,
        idFotoJustificante,
        id
      } = justificantesRechazados[i]

      nombreJustificante = nombreAlumno
      apellidoJustificante = apellidoAlumno
      claveEstudianteJustificante = claveEstudianteAlumno

      const datos = {
        nombreJustificante, 
        apellidoJustificante,
        claveEstudianteJustificante,
        numeroTelefonoJustificante,
        fechaEmisionJustificante,
        horaEmisionJustificante,
        fechaJustificante,
        motivoJustificante,
        explicacionJustificante,
        fotoJustificante,
        correoJustificante,
        idFotoJustificante,
      }

      const docRef = doc(db, 'justificantesRechazados', id)
      await setDoc(docRef, datos)
    }

    //Todo: Editar el nombre, apellido y clave de estudiante de los pagos mensuales
    for(let i = 0; i < pagosMensualidades.length; i++) {
      let {
        nombrePago,
        apellidoPago,
        claveEstudiantePago,
        idiomaPago,
        añoPagoMenActual,
        numeroMesPagoMenActual,
        fechaPagoMenActual,
        fechaCompletaPagoMenActual,
        añoDiaPago,
        mesDiaPago,
        fechaDiaPago,
        fechaCompletaDiaPago,
        añoFinMensualidad,
        mesFinMensualidad,
        fechaFinMensualidad,
        id
      } = pagosMensualidades[i]

      nombrePago = nombreAlumno
      apellidoPago = apellidoAlumno
      claveEstudiantePago = claveEstudianteAlumno

      const datos = {
        nombrePago,
        apellidoPago,
        claveEstudiantePago,
        idiomaPago,
        añoPagoMenActual,
        numeroMesPagoMenActual,
        fechaPagoMenActual,
        fechaCompletaPagoMenActual,
        añoDiaPago,
        mesDiaPago,
        fechaDiaPago,
        fechaCompletaDiaPago,
        añoFinMensualidad,
        mesFinMensualidad,
        fechaFinMensualidad
      }

      const docRef = doc(db, 'pagosMensualidades', id)
      await setDoc(docRef, datos)
    }

    const nombre = nombreAlumno
    const apellido = apellidoAlumno
    const fechaNacimiento = fechaNacimientoAlumno
    const correo = correoAlumno
    const contrasena = contrasenaAlumno
    const numeroTelefono = numeroTelefonoAlumno
    const nivelAcademico = nivelAcademicoAlumno
    const codigoPostal = codigoPostalAlumno
    const pais = paisAlumno
    const estado = estadoAlumno
    const municipio = municipioAlumno
    const colonia = coloniaAlumno
    const calle = calleAlumno
    const numeroExterior = numeroExteriorAlumno
    
    const claveEstudiante = claveEstudianteAlumno
    const idiomaAprendizaje = idiomaAprendizajeAlumno
    const nivelIdioma = nivelIdiomaAlumno
    const modalidadEstudio = modalidadEstudioAlumno
    const fechaIngreso = fechaIngresoAlumno
    const fechaPago = fechaPagoAlumno

    const datos = {
      foto,
      idFoto,
      actaNacimiento,
      idActaNacimiento,
      ine,
      idIne,
      curp,
      idCurp,
      comprobantePagoInicial,
      idComprobantePagoInicial,
      nombre, 
      apellido, 
      fechaNacimiento,
      correo, 
      contrasena,
      numeroTelefono, 
      nivelAcademico,
      codigoPostal,
      pais,
      estado,
      municipio,
      colonia,
      calle,
      numeroExterior, 
      claveEstudiante,
      idiomaAprendizaje,
      nivelIdioma,
      modalidadEstudio,
      fechaIngreso,
      fechaPago
    }

    const docRef = doc(db, 'alumnos', idAlumno)
    await setDoc(docRef, datos)
    toast.success('El Alumno ha sido editado con exito')
  }

  return (
    <div>
      <div className="container-agregar-alumno">
        <Toaster 
          position="top-center"
          expand={false}
          richColors
        />
        <div className='contenedor__todo-principio'>
          <Link to={'/sistema-asistencias/panel-control/alumnos'}><FaArrowCircleLeft className='flecha-regresar icon-40' /></Link>
        </div>
        <div className='agregar-alumnos__formulario'>
          <form className='formulario' onSubmit={editarAlumnos}>
            <h3 className='formulario__titulo'>Editar Alumno</h3>
            <h4 className='formulario__subtitulo'>Información Personal</h4>
            <FotoAlumno 
              titulo='Foto Perfil Alumno'
              valor={fotoPerfilAlumno}
              cambiarValor={setFotoPerfilAlumno}
              tipo={true}
              foto={fotoApoyo}
              setFoto={setFotoApoyo}
              required={false}
            />
            <Campo 
              titulo='Nombre' 
              placeholder='Ingresa los nombres del alumno' 
              cambiarValor={setNombreAlumno} 
              valor={nombreAlumno} 
            />
            <Campo 
              titulo='Apellido' 
              placeholder='Ingresa los apellidos del alumno' 
              cambiarValor={setApellidoAlumno} 
              valor={apellidoAlumno} 
            />
            <CampoFecha 
              titulo='Selecciona la Fecha de Nacimiento' 
              cambiarValor={setFechaNacimientoAlumno} 
              valor={fechaNacimientoAlumno} 
            />
            <CampoEmail 
              titulo='Correo Electronico' 
              placeholder='Ingresa el correo electronico del alumno' 
              cambiarValor={setCorreoAlumno} 
              valor={correoAlumno} 
            />
            <Campo 
              titulo='Número de Telefono' 
              placeholder='Ingresa el número de telefono del alumno' 
              cambiarValor={setNumeroTelefonoAlumno} 
              valor={numeroTelefonoAlumno} 
            />
            <ListaOpciones 
              titulo='Nivel Academico'
              placeholder='Selecciona el nivel academico del alumno'
              valor={nivelAcademicoAlumno}
              cambiarValor={setNivelAcademicoAlumno}
              opciones={opcionesNivelesAcademicos}
            />
            <Campo 
              titulo='Codigo Postal'
              placeholder='Ingresa el codigo postal del alumno'
              cambiarValor={setCodigoPostalAlumno}
              valor={codigoPostalAlumno}
            />
            <Campo 
              titulo='País'
              placeholder='Ingresa el país de donde vive el alumno'
              cambiarValor={setPaisAlumno}
              valor={paisAlumno}
            />
            <Campo 
              titulo='Estado'
              placeholder='Ingresa el estado de donde vive el alumno'
              cambiarValor={setEstadoAlumno}
              valor={estadoAlumno}
            />
            <Campo 
              titulo='Municipio/Alcaldía'
              placeholder='Ingresa el municipio de donde vive el alumno'
              cambiarValor={setMunicipioAlumno}
              valor={municipioAlumno}
            />
            <Campo
              titulo='Colonia'
              placeholder='Ingresa la colonia de donde vive el alumno'
              valor={coloniaAlumno}
              cambiarValor={setColoniaAlumno}
            />
            <Campo
              titulo='Calle'
              placeholder='Ingresa la calle de donde vive el alumno'
              valor={calleAlumno}
              cambiarValor={setCalleAlumno}
            />
            <Campo
              titulo='Número Exterior'
              placeholder='Ingresa el número exterior de donde vive el alumno'
              valor={numeroExteriorAlumno}
              cambiarValor={setNumeroExteriorAlumno}
            />
            <FotoAlumno 
              titulo='Acta de Nacimiento'
              className='foto-cuadrada'
              valor={fotoActaNacimiento}
              cambiarValor={setFotoActaNacimiento}
              tipo={true}
              foto={fotoApoyoActaNacimiento}
              setFoto={setFotoApoyoActaNacimiento}
              required={false}
              classInput='imagen__acta-nacimiento'
            />
            <FotoAlumno 
              titulo='Instituto Nacional Electoral (INE)'
              className='foto-cuadrada'
              valor={fotoIne}
              cambiarValor={setFotoIne}
              tipo={true}
              foto={fotoApoyoIne}
              setFoto={setFotoApoyoIne}
              required={false}
              classInput='imagen__ine'
            />
            <FotoAlumno 
              titulo='Curp'
              className='foto-cuadrada'
              valor={fotoCurp}
              cambiarValor={setFotoCurp}
              tipo={true}
              foto={fotoApoyoCurp}
              setFoto={setFotoApoyoCurp}
              required={false}
              classInput='imagen__curp'
            />
            <FotoAlumno 
              titulo='Comprobante del Pago Inicial'
              className='foto-cuadrada'
              valor={fotoComprobantePagoInicial}
              cambiarValor={setFotoComprobantePagoInicial}
              tipo={true}
              foto={fotoApoyoComprobantePagoInicial}
              setFoto={setFotoApoyoComprobantePagoInicial}
              required={false}
              classInput='imagen__comprobante-pago-inicial'
            />
            <h4 className='formulario__subtitulo'>Información del Centro de Idiomas</h4>
            <Campo
              titulo='Clave del Estudiante'
              placeholder='Ingresa la clave del estudiante'
              valor={claveEstudianteAlumno}
              cambiarValor={setClaveEstudianteAlumno}
            />
            <IoIosAddCircle className='agregar-idiomas__icon' onClick={agregarIdioma} />
            {
              idiomaAprendizajeAlumno.map((idioma, index) => {
                return (
                  <div key={index}>
                    <TiDelete className='idioma__icon-delete' onClick={() => eliminarIdioma(index)} />
                    <ListaOpciones 
                      titulo='Idioma de Aprendizaje'
                      placeholder='Ingresa el idioma de aprendizaje'
                      valor={idiomaAprendizajeAlumno[index]}
                      cambiarValor={actualizarDatos}
                      opciones={opcionesIdiomas}
                      indice={index}
                      variable={idiomaAprendizajeAlumno}
                      funcion={setIdiomaAprendizajeAlumno}
                    />
                    <ListaOpciones 
                      titulo='Nivel MCERLC'
                      placeholder='Ingresa el nivel de MCERLC'
                      valor={nivelIdiomaAlumno[index]}
                      cambiarValor={actualizarDatos}
                      opciones={opcionesNiveles}
                      indice={index}
                      variable={nivelIdiomaAlumno}
                      funcion={setNivelIdiomaAlumno}
                    />
                    <ListaOpciones 
                      titulo='Modalidad de Estudio'
                      placeholder='Ingresa la modalidad de estudio'
                      valor={modalidadEstudioAlumno[index]}
                      cambiarValor={actualizarDatos}
                      opciones={opcionesModalidades}
                      indice={index}
                      variable={modalidadEstudioAlumno}
                      funcion={setModalidadEstudioAlumno}
                    />
                    <CampoFecha 
                      titulo='Fecha de Ingreso'
                      valor={fechaIngresoAlumno[index]}
                      cambiarValor={actualizarDatos}
                      indice={index}
                      variable={fechaIngresoAlumno}
                      funcion={setFechaIngresoAlumno}
                    />
                    <ListaOpciones 
                      titulo='Fecha de Pago'
                      placeholder='Ingresa la fecha de pago'
                      valor={fechaPagoAlumno[index]}
                      cambiarValor={actualizarDatos}
                      opciones={opcionesFechasPagos}
                      indice={index}
                      variable={fechaPagoAlumno}
                      funcion={setFechaPagoAlumno}
                    />
                  </div>
                )
              })
            }
            <button className='boton__azul' >Editar Alumno</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditarAlumno