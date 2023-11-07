const fs = require('fs');
const path = require('path');

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
  const createViewPath = path.join(srcPath, `views/${name}-create-page`);
  const extractAllViewPath = path.join(srcPath, `views/${name}-extract-all-page`);
  const searchViewPath = path.join(srcPath, `views/${name}-search-page`);

  // Создание директорий
  createDirectoryRecursively(searchComponentPath);
  createDirectoryRecursively(editComponentPath);

  createDirectoryRecursively(servicesPath);
  createDirectoryRecursively(configurationPath);
  createDirectoryRecursively(modelsPath);
  createDirectoryRecursively(stateManagementPath);

  createDirectoryRecursively(editViewPath);
  createDirectoryRecursively(createViewPath);
  createDirectoryRecursively(extractAllViewPath);
  createDirectoryRecursively(searchViewPath);

  // Создание файлов
  createFile(path.join(searchComponentPath, `${name}-search.component.html`), searchTemplateContent());
  createFile(path.join(searchComponentPath, `${name}-search.component.ts`), searchComponentContent());

  createFile(path.join(editComponentPath, `${name}-edit.component.html`), editTemplateContent());
  createFile(path.join(editComponentPath, `${name}-edit.component.ts`), editComponentContent());

  createFile(path.join(servicesPath, `${name}-service.service.ts`), serviceContent());

  createFile(path.join(configurationPath, `${name}.constants.ts`), configContent());

  createFile(path.join(modelsPath, `${name}.model.ts`), componentModelContent());
  createFile(path.join(modelsPath, `${name}-filter.model.ts`), componentFilterModelContent());
  createFile(path.join(modelsPath, `${name}-search.model.ts`), searchModelContent());

  createFile(path.join(stateManagementPath, `${name}.actions.ts`), stateActionsContent());
  createFile(path.join(stateManagementPath, `${name}.state.ts`), stateContent());

  createFile(path.join(editViewPath, `${name}-edit-page.component.html`), editPageTemplateContent());
  createFile(path.join(editViewPath, `${name}-edit-page.component.ts`), editPageComponentContent());

  createFile(path.join(createViewPath, `${name}-create-page.component.html`), createPageTemplateContent());
  createFile(path.join(createViewPath, `${name}-create-page.component.ts`), createPageComponentContent());

  createFile(path.join(extractAllViewPath, `${name}-extract-all-page.component.html`), extractAllPageTemplateContent());
  createFile(path.join(extractAllViewPath, `${name}-extract-all-page.component.ts`), extractAllPageComponentContent());

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

function searchTemplateContent() {
  return `
  <app-content-page-layout>
  <ng-template [appLayoutType]="TemplateType.Body">
    <form [formGroup]="filterForm" [ngxsForm]="formPath" (ngSubmit)="search()">
      <p-panel [toggleable]="true" expandIcon="pi pi-chevron-up" collapseIcon="pi pi-chevron-down"
        styleClass="custom-p-panel">
        <ng-template pTemplate="header">
          <app-search-panel-header [title]="'${entityName}.title' | translate" [disabled]="isLoading$ | async"
            [isSearchOnly]='isSearchOnly' (search)="search()" (add)="create()" (extractAll)="onExtractAll(entityIDName)"
            (closeFeature)="closeFeature()"></app-search-panel-header>
        </ng-template>

        <div class="grid formgrid">
          <div class="col-6 md:col-6">
            <div class="field grid">
              <label for="xxx" class="col-12 md:col-3">{{ '${entityName}.xxx' | translate
                }}</label>
              <div class="col-10 md:col-8">
                <input class="p-inputtext-sm w-full" formControlName="xxx" type="text" id="xxx" pInputText />
              </div>
            </div>           

          </div>

          <div class="col-6 md:col-6">
            <div class="field grid">
              <label for="xxx" class="col-12 md:col-3">{{ '${entityName}.xxx' | translate
                }}</label>
              <div class="col-10 md:col-8">
                <input formControlName="xxx" type="text" id="xxx" pInputText
                  class="p-inputtext-sm w-full" />
              </div>
            </div>

          </div>
        </div>
      </p-panel>
    </form>
  </ng-template>
  <ng-template [appLayoutType]="TemplateType.SearchResults">
    <ng-container *ngIf="entities$ | async as entities">
      <app-table-paginator [title]="'${entityName}.searchResultTitle' | translate" [pageSize]="pageSize"
        [totalCount]="totalCount$ | async" [firstPage]="currentPageFirstItemIndex$ | async"
        (pageChange)="onChangePage($event)"></app-table-paginator>
      <p-table *ngIf="entities.length" [value]="entities" [scrollable]="true" [rowHover]="true">
        <ng-template pTemplate="header">
          <tr class="white-space-nowrap white-space-nowrap">
            <th>{{ '${entityName}.' | translate }}</th>
       
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-entity>
          <tr (dblclick)="onEditRow(entity)" class="white-space-nowrap">
            <td>{{ entity. }}</td>

          </tr>
        </ng-template>
      </p-table>
    </ng-container>
  </ng-template>
</app-content-page-layout>
 
    `;
}

function searchComponentContent() {
  return `

  @Component({
    standalone: true,
    selector: 'app-${name}-search',
    templateUrl: './${name}-search.component.html',
    imports: [
      CommonModule,
      ContentPageLayoutComponent,
      ContentPageLayoutDirective,
      TableModule,
      TablePaginatorComponent,
      TranslateModule,
      InputTextModule,
      PaginatorModule,
      PanelModule,
      ReactiveFormsModule,
      SearchPanelHeaderComponent,
      NgxsFormPluginModule,
    ],
  
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class ${entityName}SearchComponent extends BaseSearchComponent<${entityName}> {
    @Output() rowDoubleClick: EventEmitter<RowDoubleClickEvent<${entityName}>> = new EventEmitter();
  
    public pageSize = PAGE_SIZE;
    public featureName = FEATURE_NAME;
    public entityIDName = ENTITY_ID_NAME;
    public routeBase = RouteNames.${entityName}Base;
    public actions = { Search };
  
    public filterForm = this.fb.group({
      xxx: this.fb.control({ value: '', disabled: false })     
    });
  
    protected readonly TemplateType = TemplateTypeEnum;
  
    constructor(
      public override store: Store,
      public override router: Router,
      public fb: FormBuilder
    ) {
      super(store, router);
    }
  
    public override onEditRow(entity: ${entityName}) {
      this.rowDoubleClick.emit({
        redirectFn: () => super.onEditRow(entity.),
        entity,
      });
    }
  }
    `;
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
    @Input() isFieldsLocked: boolean;
  
    constructor(public fb: FormBuilder) {}
  
    editForm = this.fb.group({
      xxx: this.fb.control({ value: '', disabled: false }),
    });
  
    protected readonly TemplateType = TemplateTypeEnum;
  }

  `;
}

function editTemplateContent() {
  const entityName = name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  return `
  <app-content-page-layout>
  <ng-template [appLayoutType]="TemplateType.Body">
    <form [formGroup]="editForm" [ngxsForm]="formPath">
      <p-panel [toggleable]="true" expandIcon="pi pi-chevron-up" collapseIcon="pi pi-chevron-down"
        styleClass="custom-p-panel">

        <div class="grid formgrid">
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="xxx" class="col-12 md:col-3">{{ 'Carriers.xxx' | translate }}</label>
              <div class="col-12 md:col-10">
                <input formControlName="xxx" type="text" id="xxx" pInputText class="p-inputtext-sm w-full" />
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="field">
              <label for="xxx" class="col-12 md:col-3">{{ '${entityName}.xxx' | translate
                }}</label>
              <div class="col-12 md:col-10">
                <input formControlName="xxx" type="text" id="xxx" pInputText class="p-inputtext-sm w-full" />
              </div>
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
  export const PAGE_SIZE = 27;
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
  
  }  
  `;
}

function componentFilterModelContent() {
  return `
  export interface ${entityName}Filter {
  
  }  
  `;
}

function editPageTemplateContent() {
  return `
  <app-content-page-layout class='relative'>
  <ng-template [appLayoutType]="TemplateType.TopControls">
    <app-entity-details-toolbox [disabled]="isLoading$ | async" [isExtractAll]="false" (add)="onAdd()"
      (save)="onUpdate()" (cancel)="onCancel()" (closeFeature)="closeFeature()" (deleteConfirmed)="onDelete()">
    </app-entity-details-toolbox>
  </ng-template>

  <ng-template [appLayoutType]="TemplateType.Body">
    <app-${name}-edit [${smallFirstLetterName}]="entity$ | async" [formPath]="formPath"></app-${name}-edit>
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
    actions = { GetById, Update, ClearState, ClearEntityDetailsState, DeleteById };
    entityIDName = ENTITY_ID_NAME;
  
    protected readonly TemplateType = TemplateTypeEnum;
  
    constructor(
      public override store: Store,
      public override router: Router,
      public override activatedRoute: ActivatedRoute,
      public fb: FormBuilder
    ) {
      super(store, router, activatedRoute);
    }
  }
  `;
}

function createPageTemplateContent() {
  return `
  <app-content-page-layout>
  <ng-template [appLayoutType]="TemplateType.TopControls">
    <app-entity-details-toolbox
      [disabled]="isLoading$ | async"
      [isExtractAll]="false"
      [isShowDelete]="false"
      [isShowNew]="false"
      (cancel)="onCancel()"
      (save)="onCreate(entityIDName)"
      (closeFeature)="closeFeature()"
    >
    </app-entity-details-toolbox>
  </ng-template>

  <ng-template [appLayoutType]="TemplateType.Body">
    <app-${name}-edit [${smallFirstLetterName}]="entity$ | async" [formPath]="formPath"></app-${name}-edit>
  </ng-template>
</app-content-page-layout>

  `;
}

function createPageComponentContent() {
  return `
  @Component({
    selector: 'app-${name}-create-page',
    standalone: true,
    imports: [CommonModule, ${entityName}EditComponent, ContentPageLayoutDirective, ContentPageLayoutComponent, EntityDetailsToolboxComponent],
    templateUrl: './${name}-create-page.component.html',
  })
  export class ${entityName}CreatePageComponent extends BaseEditPageComponent {
    actions = { GetById, Update, Create, ClearState, ClearEntityDetailsState, DeleteById };
    featureName = FEATURE_NAME;
    entityIDName = ENTITY_ID_NAME;
  
    protected readonly TemplateType = TemplateTypeEnum;
  
    constructor(
      public override store: Store,
      public override router: Router,
      public override activatedRoute: ActivatedRoute,
      public fb: FormBuilder
    ) {
      super(store, router, activatedRoute);
    }
  }  
  `;
}

function extractAllPageTemplateContent() {
  return `
  <app-content-page-layout>
  <ng-template [appLayoutType]="TemplateType.TopControls">
    <app-entity-details-toolbox
      [disabled]='isLoading$ | async'
      [isShowDelete]='false'
      [totalNumber]='totalCount'
      (pageChange)='onExtractAllByPage($event)'
      (add)='onAdd()'
      (save)='onUpdate()'
      (cancel)='onCancel()'
      (closeFeature)="closeFeature()"
    ></app-entity-details-toolbox>
  </ng-template>
  <ng-template [appLayoutType]="TemplateType.Body">
    <app-${name}-edit [${smallFirstLetterName}]="entity$ | async" [formPath]="formPath"></app-${name}-edit>
  </ng-template>
</app-content-page-layout>
  `;
}

function extractAllPageComponentContent() {
  return `
  @Component({
    standalone: true,
    selector: 'app-${name}-extract-all',
    templateUrl: './${name}-extract-all-page.component.html',
    imports: [${entityName}EditComponent, CommonModule, ContentPageLayoutComponent, ContentPageLayoutDirective, EntityDetailsToolboxComponent],
  })
  export class ${entityName}ExtractAllPageComponent extends BaseEditPageComponent {
    actions = { GetById, Update, ClearState, ExtractAllByPage, ClearEntityDetailsState };
    featureName = FEATURE_NAME;
    entityIDName = ENTITY_ID_NAME;
    protected readonly TemplateType = TemplateTypeEnum;
  
    constructor(
      public override store: Store,
      public override router: Router,
      public override activatedRoute: ActivatedRoute
    ) {
      super(store, router, activatedRoute);
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
        loadComponent: () =>
          import('./views/${name}-create-page/${name}-create-page.component').then((res) => res.${entityName}CreatePageComponent),
        title: TitleHelper.getNewTitle(RouteNames.${entityName}Base),
      },
      {
        path: RouteNames.ExtractAll + '/' + RouteNames.Edit + '/:id',
        loadComponent: () =>
        import('./views/${name}-extract-all-page/${name}-extract-all-page.component').then((res) => res.${entityName}ExtractAllPageComponent),
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
  `;
}

function stateContent() {
  return `
type ${entityName}StateModel = BaseDefaultStateModel;

@State<${entityName}StateModel>({
  name: FEATURE_NAME,
  defaults: {
    ...getBaseDefaultState(),
  },
})

@Injectable()
export class ${entityName}State extends BaseState<
  ${entityName}SearchResponse,
  ${entityName}ByIdResponse
> {
  fileName = FEATURE_NAME;
  pageSize = PAGE_SIZE;

  constructor(public override apiService: ${entityName}Service) {
    super(apiService);
  }

  @Action(Search, { cancelUncompleted: true })
  search(ctx: StateContext<${entityName}StateModel>, action: typeof Search): Observable<any> {
    return super.searchAction(ctx, action);
  }

  @Action(GetById, { cancelUncompleted: true })
  getById(ctx: StateContext<${entityName}StateModel>, action: typeof GetById): Observable<any> {
    return super.getByIdAction(ctx, action);
  }

  @Action(Update, { cancelUncompleted: true })
  update(ctx: StateContext<${entityName}StateModel>, action: typeof Update): Observable<any> {
    return super.updateAction(ctx, action);
  }

  @Action(Create, { cancelUncompleted: true })
  create(ctx: StateContext<${entityName}StateModel>, action: typeof Create): Observable<any> {
    return super.createAction(ctx, action);
  }

  @Action(DeleteById, { cancelUncompleted: true })
  deleteById(ctx: StateContext<${entityName}StateModel>, action: typeof Create): Observable<any> {
    return super.deleteByIdAction(ctx, action);
  }

  @Action(ClearState)
  clearState(ctx: StateContext<${entityName}StateModel>, action: typeof ClearState) {
    return super.clearStateAction(ctx, action);
  }

  @Action(ExtractAllByPage)
  extractAllByPage(ctx: StateContext<${entityName}StateModel>, action: typeof ExtractAllByPage) {
    return super.extractAllByPageAction(ctx, action);
  }

  @Action(ClearEntityDetailsState, { cancelUncompleted: true })
  clearEntityDetailsState(ctx: StateContext<${entityName}StateModel>) {
    return super.clearEntityDetailsStateAction(ctx);
  }
}
  `;
}


