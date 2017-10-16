import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
    selector: 'rpc-calculation-result-list',
    styleUrls: ['rpc-calculation-result-list.component.scss'],
    template: `
    <!--div class="calculation-item" [formGroup]="parent">
        <div formArrayName="calculationResults">
                <div 
                    *ngFor="let item of calculationResults; let i = index;">
                    <div class="calculation-item__content">
                        <div class="calculation-item__name">
                            {{ item.value.referenceDate | date: 'dd/MM/yyyy'}}
                        </div>
                        <div class="calculation-item__name">
                            {{ item.value.benchmark1 | currency:'GBP':true   }}
                        </div>
                        <div class="calculation-item__name">
                            {{ item.value.benchmark2  | currency:'GBP':true  }}
                        </div>
                </div>
        </div>

    </div-->

    <div>
        <p-dataTable [value]="results" datakey="referenceDate" [rows]="10" [paginator]="true" [pageLinks]="3" [responsive]="true" resizableColumns="true">
            <p-header>Previous Calculations</p-header>
            <p-column field="referenceDate" header="Date">
                <template pTemplate="body" let-item="rowData">
                        {{item.referenceDate | date: 'dd/MM/yyyy'}}
                </template>
            </p-column>
            <p-column field="benchmark1" header="Benchmark #1" [sortable]="true" >
                <template pTemplate="body" let-item="rowData">
                        {{item.benchmark1 | currency:'GBP':true }}
                </template>
            </p-column>
            <p-column field="benchmark2" header="Benchmark #2" [sortable]="true">
                <template pTemplate="body" let-item="rowData">
                        {{item.benchmark2 | currency:'GBP':true }}
                </template>
            </p-column>
        </p-dataTable>
    </div>
    `
})
export class RpcCalculationResultListComponent {
    @Input()
    parent: FormGroup;

    @Input()
    results;
    
    get calculationResults() {

        return (this.parent.get('calculationResults') as FormArray).controls;
    }
}