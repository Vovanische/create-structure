export function stateContent(entityName) {
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
  
    constructor(public override apiService: ${entityName}Service, public override messageService: MessageService) {
      super(apiService, messageService);
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

    @Action(DownloadFileExcel, { cancelUncompleted: true })
    downloadFileExcel(ctx: StateContext<${entityName}StateModel>): Observable<Blob> {
      return super.downloadFileExcelAction(ctx);
    }
  }
    `;
}
