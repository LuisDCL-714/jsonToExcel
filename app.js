import "dotenv/config.js"

import { parseJsonToExcel } from './parseJsonToExcel.js';

async function main(){
  console.log("Previo al proceso");
  const principalFolder = 'files'; // Nombre de la carpeta principal que contiene carpetas de meses
  await parseJsonToExcel(principalFolder);
  console.log("Fin del proceso");
}

main();