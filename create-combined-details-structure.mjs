// const fs = require('fs');
// const path = require('path');

import fs from 'fs';
import path from 'path';
import { searchComponentContent } from './content-create-functions/search-component-content.mjs';
import { searchTemplateContent } from './content-create-functions/search-template-content.mjs';
import { stateContent } from './content-create-functions/state-content.mjs';


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
function createProjectStructure(name) {
  const projectRoot = process.cwd();
  const srcPath = path.join(projectRoot, `${name}`);
  const searchComponentPath = path.join(srcPath, `components/${name}-search`);
  const editComponentPath = path.join(srcPath, `components/${name}-edit`);

  const servicesPath = path.join(srcPath, 'services');
  const configurationPath = path.join(srcPath, 'configuration');
  const modelsPath = path.join(srcPath, 'models');

  const stateManagementPath = path.join(srcPath, `state-management`);

  const editViewPath = path.join(srcPath, `views/${name}-edit-page`);
  const searchViewPath = path.join(srcPath, `views/${name}-search-page`);

  // Создание директорий
  createDirectoryRecursively(searchComponentPath);
  createDirectoryRecursively(editComponentPath);

  createDirectoryRecursively(servicesPath);
  createDirectoryRecursively(configurationPath);
  createDirectoryRecursively(modelsPath);
  createDirectoryRecursively(stateManagementPath);

  createDirectoryRecursively(editViewPath);
  createDirectoryRecursively(searchViewPath);

  // Создание файлов
  createFile(path.join(searchComponentPath, `${name}-search.component.html`), searchTemplateContent(entityName));
  createFile(path.join(searchComponentPath, `${name}-search.component.ts`), searchComponentContent(entityName, name));

  createFile(path.join(editComponentPath, `${name}-edit.component.html`), editTemplateContent());
  createFile(path.join(editComponentPath, `${name}-edit.component.ts`), editComponentContent());

  createFile(path.join(servicesPath, `${name}.service.ts`), serviceContent());

  createFile(path.join(configurationPath, `${name}.constants.ts`), configContent());

  createFile(path.join(modelsPath, `${name}.model.ts`), componentModelContent());
  createFile(path.join(modelsPath, `${name}-filter.model.ts`), componentFilterModelContent());
  createFile(path.join(modelsPath, `${name}-search.model.ts`), searchModelContent());

  createFile(path.join(stateManagementPath, `${name}.actions.ts`), stateActionsContent());
  createFile(path.join(stateManagementPath, `${name}.state.ts`), stateContent(entityName));

  createFile(path.join(editViewPath, `${name}-edit-page.component.html`), editPageTemplateContent());
  createFile(path.join(editViewPath, `${name}-edit-page.component.ts`), editPageComponentContent());

  createFile(path.join(searchViewPath, `${name}-search-page.component.html`), searchPageTemplateContent());
  createFile(path.join(searchViewPath, `${name}-search-page.component.ts`), searchPageComponentContent());

  createFile(path.join(srcPath, `routes.ts`), routesContent());
}

// Проверяем, передано ли имя в качестве аргумента
if (name) {
  // Вызываем основную функцию для создания структуры с переданным именем
  createProjectStructure(name);
} else {
  console.error('Не указано имя. Пожалуйста, укажите имя при вызове скрипта.');
}

function editComponentContent() {
  return `
  @Component({
    standalone: true,
    selector: 'app-${name}-edit',
    templateUrl: './${name}-edit.component.html',
    imports: [
      CommonModule,
      ContentPageLayoutComponent,
      ContentPageLayoutDirective,
      SharedModule,
      TranslateModule,
      InputTextModule,
      PaginatorModule,
      PanelModule,
      ReactiveFormsModule,
      SearchPanelHeaderComponent,
      NgxsFormPluginModule,
      ToolboxPlaceholderComponent,
      ButtonModule,
    ],
  
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class ${entityName}EditComponent {
    @Input() ${smallFirstLetterName}: ${entityName};
    @Input() formPath = '';
    @Input() set isFieldsLocked(isFieldsLocked: boolean) {
      this._isFieldsLocked = isFieldsLocked;
      this.toggleFormDisabledState(isFieldsLocked);
    }
  
    get isFieldsLocked() {
      return this._isFieldsLocked;
    }
  
    constructor(public fb: FormBuilder) {}
  
    editForm = this.fb.group({
      xxx: this.fb.control({ value: '', disabled: true }),
    });
    
    private _isFieldsLocked: boolean;
    protected readonly TemplateType = TemplateTypeEnum;

    toggleFormDisabledState(isDisabled): void {
      const enableStatus = isDisabled ? 'disable' : 'enable';
  
      this.editForm.controls.xxx[enableStatus]();
      
    }
  }

  `;
}

function editTemplateContent() {
  return `
  <app-content-page-layout>
  <ng-template [appLayoutType]="TemplateType.Body">
    <form [formGroup]="editForm" [ngxsForm]="formPath">
      <p-panel styleClass="custom-p-panel">
        <div class="grid formgrid">
          <div class="col-12 md:col-6">
            <div class="col-12 field">
              <label for="xxx">{{ '${entityName}.xxx' | translate }}</label>
              <input formControlName="xxx" type="text" id="xxx" pInputText class="p-inputtext-sm w-full" />
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="col-12 field">
              <label for="xxx">{{ '${entityName}.xxx' | translate }}</label>              
              <input formControlName="xxx" type="text" id="xxx" pInputText class="p-inputtext-sm w-full" />
            </div>

          </div>
        </div>
      </p-panel>
    </form>
  </ng-template>
</app-content-page-layout>
    `;
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

function editPageTemplateContent() {
  return `
  <app-content-page-layout class='relative'>
  <ng-template [appLayoutType]="TemplateType.TopControls">
    <app-entity-details-toolbox
      [disabled]="isLoading$ | async"
      [totalNumber]="totalCount"
      [showLock]="true"
      [isShowDelete]="!isNewPage"
      [isShowNew]="!isNewPage"
      [isLocked]="isFieldsLocked"
      [isExtractAll]="isExtractAllPage"
      (pageChange)="onExtractAllByPage($event)"
      (add)="onAdd()"
      (save)="onCreateOrUpdate()"
      (cancel)="onCancel()"
      (closeFeature)="closeFeature()"
      (deleteConfirmed)="onDeleteWithRedirect()"
      (lockChange)="onLockChange($event)"
  >
  </app-entity-details-toolbox>
  </ng-template>

  <ng-template [appLayoutType]="TemplateType.Body">
    <app-${name}-edit [${smallFirstLetterName}]="entity$ | async" [formPath]="formPath" [isFieldsLocked]="isFieldsLocked"></app-${name}-edit>
  </ng-template>
</app-content-page-layout>
  `;
}

function editPageComponentContent() {
  return `
  @Component({
    selector: 'app-${name}-edit-page',
    standalone: true,
    imports: [CommonModule, ${entityName}EditComponent, ContentPageLayoutDirective, ContentPageLayoutComponent, EntityDetailsToolboxComponent],
    templateUrl: './${name}-edit-page.component.html',
  })
  export class ${entityName}EditPageComponent extends BaseEditPageComponent { 
    featureName = FEATURE_NAME;
    actions = { GetById, Create, Update, ClearState, ClearEntityDetailsState, ExtractAllByPage, DeleteById };
    entityIDName = ENTITY_ID_NAME;
  
    protected readonly TemplateType = TemplateTypeEnum;
  
    constructor(
      public override store: Store,
      public override router: Router,
      public override activatedRoute: ActivatedRoute,
      public override confirmationService: ConfirmationService,
      public fb: FormBuilder
    ) {
      super(store, router, activatedRoute, confirmationService);
    }
  }
  `;
}

function searchPageTemplateContent() {
  return `
  <app-${name}-search (rowDoubleClick)="onEdit($event)"></app-${name}-search>
  `;
}

function searchPageComponentContent() {
  return `
  @Component({
    standalone: true,
    selector: 'app-${name}-search-page',
    imports: [${entityName}SearchComponent],
    templateUrl: './${name}-search-page.component.html',
  })
  export class ${entityName}SearchPageComponent {
    public onEdit($event): void {
      $event.redirectFn();
    }
  }
  `;
}

function routesContent() {
  return `
  export const ${entityName}Routes: Route = {
    path: RouteNames.${entityName}Base,
    providers: [importProvidersFrom(NgxsModule.forFeature([${entityName}State]))],
    children: [
      {
        path: RouteNames.Search,
        loadComponent: () => import('./views/${name}-search-page/${name}-search-page.component').then((res) => res.${entityName}SearchPageComponent),
        title: TitleHelper.getSearchTitle(RouteNames.${entityName}Base),
      },
      {
        path: RouteNames.Edit + '/:id',
        loadComponent: () => import('./views/${name}-edit-page/${name}-edit-page.component').then((res) => res.${entityName}EditPageComponent),
        title: TitleHelper.getEditTitle(RouteNames.${entityName}Base),
      },
      {
        path: RouteNames.New,
        loadComponent: () => import('./views/${name}-edit-page/${name}-edit-page.component').then((res) => res.${entityName}EditPageComponent),
        title: TitleHelper.getNewTitle(RouteNames.${entityName}Base),
      },
      {
        path: RouteNames.ExtractAll + '/' + RouteNames.Edit + '/:id',
        loadComponent: () => import('./views/${name}-edit-page/${name}-edit-page.component').then((res) => res.${entityName}EditPageComponent),
        title: TitleHelper.getExtractAllTitle(RouteNames.${entityName}Base),
      },
      { path: '', redirectTo: RouteNames.Search, pathMatch: 'full' },
    ],
  };
  `;
}

function stateActionsContent() {
  return `
  const actions = new ActionsBuilder(FEATURE_NAME);

  export const Search = actions.search;
  export const GetById = actions.getById;
  export const Create = actions.create;
  export const Update = actions.update;
  export const DeleteById = actions.deleteById;
  export const ExtractAllByPage = actions.extractAllByPage;
  export const ClearState = actions.clearState;
  export const ClearEntityDetailsState = actions.clearEntityDetailsState;
  export const DownloadFileExcel = actions.downloadFileExcel;
  `;
}

