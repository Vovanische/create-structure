export function detailsComponentContent(entityName, enteredName) {
  return `
  @Component({
    standalone: true,
    selector: 'app-${enteredName}',
    templateUrl: './${enteredName}.component.html',
    providers: [ConfirmationService],
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
      TableModule,
      TablePaginatorComponent,
      CardModule,
      FieldsetModule,
      ConfirmDialogWrapperComponent,
    ],
  
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class ${entityName}Component implements OnInit, OnDestroy {
    @Input() set priceListPromo(priceListPromo: PriceListPromo) {
      this._priceListPromo = priceListPromo;
      if (priceListPromo !== null) {
        this.store.dispatch(new SearchByEntityCode(priceListPromo.priceListCode));
      }
    }
  
    get priceListPromo() {
      return this._priceListPromo;
    }
  
    @Input() set isFieldsLocked(state: boolean) {
      this._isFieldsLocked = state;
      this.toggleDisabledFields(state);
    }
  
    get isFieldsLocked() {
      return this._isFieldsLocked;
    }
  
    constructor(
      public fb: FormBuilder,
      private store: Store,
      private confirmationService: ConfirmationService,
      private translateService: TranslateService
    ) {}
  
    unsubscribe$: Subject<void> = new Subject();
    detailList$ = this.store.select((state) => state[FEATURE_NAME].entities);
  
    actions = { Search };
    formPath = FEATURE_NAME + '.editForm';
    entityIDName = ENTITY_ID_NAME;
    selectedItem: PriceListPromoArticleSpreadDetail | null = null;
    isCreateMode = false;
    readonly pageSize = PAGE_SIZE;
    totalCount$ = this.store.select((state) => state[FEATURE_NAME].paginator.totalCount);
    currentPageFirstItemIndex$ = this.store.select((state) => state[FEATURE_NAME].paginator.currentPageFirstItemIndex);
    
    private _isFieldsLocked = true;
    private _priceListPromo: PriceListPromo;
    protected readonly TemplateType = TemplateTypeEnum;
  
  
    editForm = this.fb.group({
      xxx: this.fb.control({ value: '', disabled: true }),
    });
  
    ngOnInit(): void {
      this.detailList$.pipe(takeUntil(this.unsubscribe$)).subscribe((priceListPromoDetailEntities: PriceListPromoArticleSpreadDetail[]) => {
        if (priceListPromoDetailEntities.length > 0) {
          if (this.selectedItem === null) {
            this.selectedItem = priceListPromoDetailEntities[0];
          } else {
            this.selectedItem = priceListPromoDetailEntities.find((list) => list.priceListDetailPromoCode === this.selectedItem.priceListDetailPromoCode);
          }
          this.onSelectionChanged(this.selectedItem);
        }
      });
    }
  
    onDeleteDetail() {
      return this.confirmationService.confirm({
        header: this.translateService.instant('Shared.EntityDetailsToolbox.DeleteConfirmation.Header'),
        message: this.translateService.instant('Shared.EntityDetailsToolbox.DeleteConfirmation.Message'),
        acceptLabel: this.translateService.instant('Shared.EntityDetailsToolbox.DeleteConfirmation.Yes'),
        rejectLabel: this.translateService.instant('Shared.EntityDetailsToolbox.DeleteConfirmation.No'),
        key: '${enteredName}',
        accept: () => {
          return this.store.dispatch(
            new DeleteById(
              this.selectedItem.priceListDetailPromoCode,
              () => {
                this.selectedItem = null;
                this.store.dispatch(new SearchByEntityCode(this.priceListPromo.priceListCode));
              },
              ENTITY_ID_NAME
            )
          );
        },
        rejectVisible: true,
      });
    }
  
    onSaveDetail() {
      if (this.isCreateMode) {
        this.store.dispatch(
          new Create(ENTITY_ID_NAME, () => {
            this.store.dispatch(new SearchByEntityCode(this.priceListPromo.priceListCode));
          })
        );
      } else {
        this.store.dispatch(
          new Update(this.selectedItem.priceListDetailPromoCode, () => {
            this.store.dispatch(new SearchByEntityCode(this.priceListPromo.priceListCode));
          }, this.entityIDName)
        );
      }
    }
  
    onSelectionChanged(event: PriceListPromoArticleSpreadDetail | null) {
      this.selectedItem = event;
  
      if (event === null) {
        this.isCreateMode = false;
        this.resetDetails();
      } else {
        this.store.dispatch(
          new UpdateFormValue({
            value: event,
            path: this.formPath,
          })
        );
      }
    }
  
    onAddDetail() {
      this.isCreateMode = true;
      this.selectedItem = null;
      this.resetDetails();
    }
  
    private resetDetails() {
      this.store.dispatch(
        new ResetForm({
          value: {
            priceListCode: this.priceListPromo.priceListCode || null,
          },
          path: this.formPath,
        })
      );
    }
  
    public onChangePage($event) {
      this.selectedItem = null;
      return this.actions ? this.store.dispatch(new SearchByEntityCode($event.page + 1, this.priceListPromo.priceListCode)) : null;
    }
  
    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
      this.store.dispatch(new ClearState());
    }
  
    private toggleDisabledFields(isDisabled: boolean): void {
      const enableStatus = isDisabled ? 'disable' : 'enable';
  
      this.editForm.controls.xxx[enableStatus]();
    }
  }
    `;
}