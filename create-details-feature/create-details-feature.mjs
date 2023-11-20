// const fs = require('fs');
// const path = require('path');

import fs from 'fs';
import path from 'path';
import { detailsComponentContent } from './content-create-functions/details-component-content.mjs';
import { stateActionsContent } from './content-create-functions/details-state-actions-content.mjs';
import { stateContent } from './content-create-functions/details-state-content.mjs';
import { detailsTemplateContent } from './content-create-functions/details-template-content.mjs';


// Извлекаем имя из аргументов командной строки
const name = process.argv[2];

const entityName = name
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');

const smallFirstLetterName = name
  .split('-')
  .map((word, index) => (index > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
  .join('');

// Функция для создания директорий рекурсивно
function createDirectoryRecursively(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Создана директория: ${dirPath}`);
  }
}

// Функция для создания файла
function createFile(filePath, content) {
  fs.writeFileSync(filePath, content);
  console.log(`Создан файл: ${filePath}`);
}

// Основная функция для создания структуры папок и файлов
function createDetailsStructure(name) {
  const projectRoot = process.cwd();
  const srcPath = path.join(projectRoot, `${name}`);

  const detailsComponentPath = path.join(srcPath, `components/${name}`);

  const servicesPath = path.join(srcPath, 'services');
  const configurationPath = path.join(srcPath, 'configuration');
  const modelsPath = path.join(srcPath, 'models');

  const stateManagementPath = path.join(srcPath, `state-management`);

  // Создание директорий
  createDirectoryRecursively(detailsComponentPath);

  createDirectoryRecursively(servicesPath);
  createDirectoryRecursively(configurationPath);
  createDirectoryRecursively(modelsPath);
  createDirectoryRecursively(stateManagementPath);

  // Создание файлов
  createFile(path.join(detailsComponentPath, `${name}.component.html`), detailsTemplateContent(entityName, name));
  createFile(path.join(detailsComponentPath, `${name}.component.ts`), detailsComponentContent(entityName, name));

  createFile(path.join(servicesPath, `${name}.service.ts`), serviceContent());

  createFile(path.join(configurationPath, `${name}.constants.ts`), configContent());

  createFile(path.join(modelsPath, `${name}.model.ts`), componentModelContent());
  createFile(path.join(modelsPath, `${name}-filter.model.ts`), componentFilterModelContent());
  createFile(path.join(modelsPath, `${name}-search.model.ts`), searchModelContent());

  createFile(path.join(stateManagementPath, `${name}.actions.ts`), stateActionsContent());
  createFile(path.join(stateManagementPath, `${name}.state.ts`), stateContent(entityName));

}

// Проверяем, передано ли имя в качестве аргумента
if (name) {
  // Вызываем основную функцию для создания структуры с переданным именем
  createDetailsStructure(name);
} else {
  console.error('Не указано имя. Пожалуйста, укажите имя при вызове скрипта.');
}


function serviceContent() {
  const baseApi = name.split('-').join('');
  return `
    @Injectable({
      providedIn: 'root',
    })
    export class ${entityName}Service extends BaseAPIService<${entityName}SearchResponse, ${entityName}ByIdResponse> {
      api = environment.settings.translatedApiUrl + '/${baseApi}';
    
      constructor(public override httpClient: HttpClient) {
        super(httpClient);
      }
    };
    `;
}

function configContent() {
  return `
  export const PAGE_SIZE = 20;
  export const FEATURE_NAME = '${entityName}';
  export const ENTITY_ID_NAME = 'xxx';
  `;
}

function searchModelContent() {
  return `
  export type ${entityName}SearchResponse = BaseSearchResponse<${entityName}>;

  export type ${entityName}ByIdResponse = BaseGetByIdResponse<${entityName}>;
  
  export type ${entityName}Request = BaseSearchRequest<${entityName}Filter>;
  `;
}

function componentModelContent() {
  return `
  export interface ${entityName} {
  xxx: string;
  }  
  `;
}

function componentFilterModelContent() {
  return `
  export interface ${entityName}Filter {
    xxx: string;  
  }  
  `;
}


// function stateActionsContent() {
//   return `
//   const actions = new ActionsBuilder(FEATURE_NAME);

//   export const Search = actions.search;
//   export const GetById = actions.getById;
//   export const Create = actions.create;
//   export const Update = actions.update;
//   export const DeleteById = actions.deleteById;
//   export const ExtractAllByPage = actions.extractAllByPage;
//   export const ClearState = actions.clearState;
//   export const ClearEntityDetailsState = actions.clearEntityDetailsState;
//   export const DownloadFileExcel = actions.downloadFileExcel;
//   `;
// }

