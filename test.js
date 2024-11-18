import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

// Создаем __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// function readDirectoryAndSaveToJson(directoryPath, outputFilePath) {
//     const data = {};

//     function readDirRecursively(dirPath) {
//         const files = ;
//         files.forEach(file => {
//             const fullPath = path.join(dirPath, file);

//             // Игнорируем папку node_modules
//             if (file === 'node_modules') return;

//             const stat = fs.statSync(fullPath);

//             if (stat.isDirectory()) {
//                 // Рекурсивно обходим директории
//                 data[file] = {};
//                 readDirRecursively(fullPath);
//             } else {
//                 // Считываем содержимое файла
//                 const fileData = fs.readFileSync(fullPath, 'utf8');
//                 data[file] = fileData;
//             }
//         });
//     }

//     // Начинаем рекурсивное чтение директории
//     readDirRecursively(directoryPath);

//     // Записываем данные в JSON-файл
//     fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2), 'utf8');
//     console.log(`Данные записаны в файл: ${outputFilePath}`);
// }

// Пример использования:
// const directoryPath = path.resolve(__dirname); // Укажите директорию
const outputFilePath = path.resolve(__dirname, './output.json'); // Укажите путь для JSON-файла
const data = fs.readdirSync(__dirname, {
    recursive: true
})
fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2), 'utf8');
