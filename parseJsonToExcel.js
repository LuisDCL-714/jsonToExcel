import fs from 'fs/promises';
import path from 'path';
import { jsonToExcel } from './excel.js';

export const parseJsonToExcel = async (principalFolder) => {
  let count = 1;
  let totalFiles = 0;
  try{
    // Lee el contenido de la carpeta principal
    const months = await fs.readdir(principalFolder)
    for (const month of months){//Ciclo para saber cuántos archivos se van a procesar
      const files = await fs.readdir(path.join(principalFolder, month));
      totalFiles = totalFiles + files.length;
    }
    console.log(`Total de archivos encontrados: ${totalFiles}`)
    // Itera sobre las carpetas de meses
    for (const month of months){
      const monthFolder = path.join(principalFolder, month);
      // Procesa cada archivo JSON dentro de la carpeta de mes
      const files = await fs.readdir(monthFolder);
      for(const file of files){
        const fileRoute = path.join(monthFolder, file);  
        // Lee el contenido del archivo JSON
        const jsonData = JSON.parse(await fs.readFile(fileRoute,'utf-8'));        
        let fileName = file.split('.');
        await jsonToExcel(jsonData,month,fileName[0]);
        console.log(`Archivo ${count} procesado de ${(totalFiles)} archivos`);
        count++;
      }
    }
  }catch (error){
    if(error instanceof Error){
      console.error(`[${error.name}]: ${error.message}, abortando proceso...`);
    }
  }
}