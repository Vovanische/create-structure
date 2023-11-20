export function detailsTemplateContent(entityName, entityNameWithSlashes) {
    return `
    <app-content-page-layout>
    <ng-template [appLayoutType]="TemplateType.Body">
      <p-card>
        <ng-template pTemplate="header">
          <div class="flex justify-content-end gap-3 pt-3 px-4">
            <p-button (onClick)="onAddDetail()" [disabled]="isFieldsLocked" icon="pi pi-plus"
              styleClass="p-button-lg p-button-secondary"></p-button>
            <p-button (onClick)="onSaveDetail()" [disabled]="isFieldsLocked" icon="pi pi-save"
              styleClass="p-button-warning p-button-lg"></p-button>
            <p-button (onClick)="onDeleteDetail()" [disabled]="isFieldsLocked" icon="pi pi-trash" styleClass="p-button-lg"
              class="pr-4"></p-button>
          </div>
        </ng-template>
  
        <div class="grid formgrid">
          <div class="col-12 md:col-6">
            <ng-container *ngIf="detailList$ | async as entities">
              <app-table-paginator 
              [pageSize]="pageSize"
              [showWhenEmpty]="true"
              [totalCount]="totalCount$ | async"
              [firstPage]="currentPageFirstItemIndex$ | async"
              (pageChange)="onChangePage($event)"            
              ></app-table-paginator>
              <p-table selectionMode="single" 
                [selection]="selectedItem" 
                dataKey="xxx" 
                [value]="entities"
                [scrollable]="true" 
                [rowHover]="true"
                (selectionChange)="onSelectionChanged($event)"
               >
                <ng-template pTemplate="header">
                  <tr class="white-space-nowrap white-space-nowrap">
                    <th>{{ '${entityName}.xxx' | translate }}</th>
                  </tr>
                </ng-template>
  
                <ng-template pTemplate="body" let-entity>
                  <tr class="white-space-nowrap" [pSelectableRow]="entity">
                    <td>{{ entity.xxx }}</td>
                  </tr>
                </ng-template>
              </p-table>
            </ng-container>
          </div>
  
          <div class="col-12 md:col-6">
            <form [formGroup]="editForm" [ngxsForm]="formPath">
              <p-card>
                <div class="col-12">
                  <div class="grid formgrid">
                    <div class="col-12 field">
                      <label for="xxx">{{ '${entityName}.xxx' | translate }}</label>
                      <input formControlName="xxx" id="xxx" pInputText class="w-full p-inputtext-sm" />
                    </div>                 
                  </div>
                </div>
              </p-card>
            </form>
          </div>
        </div>
      </p-card>
    </ng-template>
  </app-content-page-layout>
  
  <app-confirm-dialog-wrapper key="${entityNameWithSlashes}"></app-confirm-dialog-wrapper>
      `;
  }