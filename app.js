import "dotenv/config.js"
import express, { Router } from "express"
import multer from "multer"

/*import { parseJsonToExcel } from './parseJsonToExcel.js';*/

/*async function main(){
  console.log("Previo al proceso");
  const principalFolder = 'files'; // Nombre de la carpeta principal que contiene carpetas de meses
  await parseJsonToExcel(principalFolder);
  console.log("Fin del proceso");
}

main();*/

const app = express()
const routerUpload = Router()
const port = process.env.PORT
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

/*Upload*/
  routerUpload.post("/", upload.single('files'),async(req, res) => {
    const files = req.file
    console.log({files})
    res.send('Archivo recibido correctamente.')
  });
  app.use('/upload',routerUpload)
/**/

app.listen(port, () => {
  console.log(`Server On: http://localhost:${port}`)
});