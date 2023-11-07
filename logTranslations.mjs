// const XLSX = require('xlsx');

import xlsx from 'xlsx';

// Чтение файла Excel
const workbook = xlsx.readFile('sourceTranslations.xlsx');

// Выбираем нужный лист (worksheet)
const sheet = workbook.Sheets['Лист1'];
console.log("🚀 ~ sheet:", sheet)

// Получаем данные из определенных строк и столбцов
const range = { start: { column: 1, row: 1 }, end: { column: 1, row: 1 } };
const data = [];
for (let ROW = range.start.row; ROW <= range.end.row; ++ROW) {
  const row = [];
  for (let COLUMN = range.start.column; COLUMN <= range.end.column; ++COLUMN) {
    const cell = sheet[xlsx.utils.encode_cell({ c: COLUMN, r: row })];
    row.push(cell ? cell.v : undefined);
  }
  data.push(row);
}

// data содержит данные из строк 2-4 и столбцов B-D
console.log(data);