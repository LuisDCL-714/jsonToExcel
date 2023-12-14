import fsSync from 'fs';
import path from 'path';
import xlsx from 'xlsx';

const upsertFolder = async (folder,route) => {
  const pathFolder = path.join(route, folder);
  if (!fsSync.existsSync(pathFolder)) {
    fsSync.mkdirSync(pathFolder);
  }
}

export const jsonToExcel = async (jsonData, month, moneyType) => {
  const routeFolder = process.env.ROUTE_FOLDER_RESULTS; // Nombre de la carpeta principal que contiene carpetas de meses
  await upsertFolder('results',routeFolder);
  await upsertFolder(path.join('results', month),routeFolder);
  
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(jsonData.operations);
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet 1');
  
  const moneyTypeFileName = moneyType.toLowerCase(); // Convierte a minúsculas para el nombre del archivo
  const excelFileName = `${moneyTypeFileName}.xlsx`;
  const excelFilePath = path.join(routeFolder, 'results', month, excelFileName);
  
  xlsx.writeFile(wb, excelFilePath);
}