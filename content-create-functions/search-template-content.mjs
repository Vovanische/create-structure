export function searchTemplateContent(entityName) {
    return `
    <app-content-page-layout>
    <ng-template [appLayoutType]="TemplateType.Body">
      <form [formGroup]="filterForm" [ngxsForm]="formPath" (ngSubmit)="search()">
        <p-panel [toggleable]="true" expandIcon="pi pi-chevron-up" collapseIcon="pi pi-chevron-down"
          styleClass="custom-p-panel">
          <ng-template pTemplate="header"> 
              <app-search-panel-header
              [title]="'${entityName}.title' | translate"
              [disabled]="isLoading$ | async"
              [isSearchOnly]="isSearchOnly"
              (search)="search()"
              (add)="create()"
              (extractAll)="onExtractAll(entityIDName)"
              (closeFeature)="closeFeature()"
              (downloadFile)="downloadFileExcel()"
            ></app-search-panel-header>
          </ng-template>
  
          <div class="grid formgrid">
            <div class="col-12 md:col-6">
              <div class="field grid">
                <label for="xxx" class="col-12 md:col-3">{{ '${entityName}.xxx' | translate
                  }}</label>
                <div class="col-10 md:col-8">
                  <input class="p-inputtext-sm w-full" formControlName="xxx" type="text" id="xxx" pInputText />
                </div>
              </div>           
  
            </div>
  
            <div class="col-12 md:col-6">
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
        <p-table *ngIf="entities.length" [value]="entities" [scrollable]="true" [rowHover]="true" (onSort)="onSort($event)" [lazy]="true">
          <ng-template pTemplate="header">
            <tr class="white-space-nowrap white-space-nowrap">
              <th pSortableColumn='xxx' class='py-1'>{{ '${entityName}.' | translate }} <p-sortIcon field='xxx' class='px-3'></p-sortIcon></th>
         
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