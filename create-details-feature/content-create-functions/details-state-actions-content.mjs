export function stateActionsContent(entityName) {
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

  export class SearchByEntityCode {
    public entityCode;

    static readonly type = \`[\${FEATURE_NAME}] Search by entity code\`;

    constructor(entityCode) {
        this.entityCode = entityCode;
    }
}
    `;
}
