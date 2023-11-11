export function searchComponentContent(entityName, name) {
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
    public actions = { Search, DownloadFileExcel, ClearState };
  
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
        redirectFn: () => super.onEditRow(entity.xxx),
        entity,
      });
    }
  }
    `;
}