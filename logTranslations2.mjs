// const XLSX = require('xlsx');

import xlsx from 'xlsx';

const workbook = xlsx.readFile('sourceTranslations.xlsx'); // Укажите путь к вашему файлу Excel

const sheetName = 'Лист1'; // Имя листа
const sheet = workbook.Sheets[sheetName];

// const cellAddress = 'B1286';
// const cell = sheet[cellAddress];
// const cellValue = cell ? cell.v : undefined; // Значение ячейки
// console.log('Значение ячейки D1224:', cellValue);


// at encoding level row and columns numerates from 0

const range = { start: { column: 3, row: 1289 }, end: { column: 4, row: 1294 } };
const data = [];
for (let ROW = range.start.row; ROW <= range.end.row; ++ROW) {
  let item = [];
  for (let COLUMN = range.start.column; COLUMN <= range.end.column; ++COLUMN) {
    const cell = sheet[xlsx.utils.encode_cell({ c: COLUMN, r: ROW })];
    item.push(cell ? cell.v : undefined);
  }
  const translationName = item[1][0].toLowerCase() + item[1].substring(1);
  const translationValue = item[0];
  const formattedItem = `"${translationName}": "${translationValue}"`;
  data.push(formattedItem);
}
console.log('🚀 ~ data:', data);
