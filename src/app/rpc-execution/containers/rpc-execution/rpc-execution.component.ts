import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ExecutionType } from '../../models/executionType.interface';
import { Calculation } from '../../models/calculation.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { ExecutionService } from '../../services/execution.service';
import { CalculationResult } from '../../models/calculationResult.interface';

import { DataTable, Message } from 'primeng/primeng'
import {MessageService} from 'primeng/components/common/messageservice';

import { ExecutionValidators } from './rpc-execution.validators';

@Component({
    selector: 'rpc-execution',
    styleUrls: ['./rpc-execution.component.scss'],
    templateUrl: './rpc-execution.component.html'
})
export class RpcExecutionComponent implements OnInit {
    
    executionTypes: ExecutionType[];
    
    calculationResults: CalculationResult[];

    /** Map used for finding the execution type name */
    executionTypeMap: Map<number, ExecutionType>;

    /** Progress bar visible option */
    inProgress: boolean = false;

    messages: Message[] = [];

    constructor(private fb: FormBuilder, 
        private executionService: ExecutionService,
        private messageService: MessageService) {
    }

    form = this.fb.group({
        calculationInput: this.fb.group({
            referenceDate: '',
            limit: ['', Validators.required], // Main Limit (monetary, greater than 0, usually entered in millions of £, e.g. £2,000,000)
            retention: ['', Validators.required], // Main Retention (as for Main Limit)
        }),
        calculationSelector: this.fb.group({
            type_id: ['', Validators.required] // Type of Execution (available values: Simple, Complex)
        }),
        calculation: this.fb.array([]),
        calculationResults: this.fb.array([])
    }, { validator: ExecutionValidators.checkCalculationTypeExists });

    ngOnInit() {
        const types = this.executionService.getExecutionTypes();
        const calculations = this.executionService.getCalculations();
        const calculationResults = this.executionService.getCalculationResults();

        Observable
            .forkJoin(types, calculations, calculationResults)
            .subscribe(([types, calculations, calculationResults]: [ExecutionType[], Calculation[], CalculationResult[]]) => {

                const myMap = types
                    .map<[number, ExecutionType]>(type => [type.id, type]);

                this.executionTypeMap = new Map<number, ExecutionType>(myMap);

                this.executionTypes = types;               

                // for p-table
                this.calculationResults = calculationResults;

                // populate the form group
                calculations.forEach( item => {                    
                    return this.addCalculation(item);
                });

                calculationResults.forEach( item => {
                    return this.addCalculationResults(item);
                });
            });

    }

    addCalculationFromSelect(calculation) {
        const control = this.form.get('calculation') as FormArray;

        control.push(
            this.fb.group( {
                type_id: calculation.type.type_id,
                referenceDate: Date.now(),
                limit: calculation.input.limit,
                retention: calculation.input.retention
            })
        );

    }

    createCalculation(calculation) {
        return this.fb.group({
            type_id: calculation.type_id,
            referenceDate: parseFloat(calculation.referenceDate) || Date.now(),
            limit: calculation.limit || '',
            retention: calculation.retention || ''
        })
    } 

    createCalculationResult(calculationResult) {
        return this.fb.group({
            referenceDate: calculationResult.referenceDate,
            benchmark1: calculationResult.benchmark1, 
            benchmark2: calculationResult.benchmark2, 
        })
    }

    addCalculation(calculationData) {
        const control = this.form.get('calculation') as FormArray;
        control.push(this.createCalculation(calculationData));
    }

    addCalculationResults(calculationResult) {
        const control = this.form.get('calculationResults') as FormArray;
        control.push(this.createCalculationResult(calculationResult));

        this.calculationResults = control.value;
    }

    removeCalculation({ group, index} : {group: FormGroup, index: number}) {
        const control = this.form.get('calculation') as FormArray;
        control.removeAt(index);
    }

    /**
     * 
     * @param item the current calculation
     */
    processCalculation(item) {
        return (
            {
                referenceDate: item.referenceDate,
                benchmark1: item.limit * 22.5/100,
                benchmark2: item.retention * 22.5/100
            }
        );
    }

    // Reset form to initial state
    onAddedCalculation() {
        this.form.get('calculationInput').reset({
            limit: '',
            retention: ''
        });
        this.form.get('calculationSelector').reset({
            type_id: '',
        });

        // clean the form array with current calculations
        const control = this.form.get('calculation') as FormArray;
        for (var index = 0; index < control.length; index++) {
            const control = this.form.get('calculation') as FormArray;
            control.removeAt(index);
        }
    }
    
    // submitting the form
    onSubmit() {
        const calculation =  this.form.value.calculation;

        this.inProgress = true;

        setTimeout(() => {
            // process the calculation
            calculation.forEach(item => {

                // process calculation
                const result = this.processCalculation(item);

                // add the data to the results
                this.addCalculationResults(result);

                // reset the form
                this.onAddedCalculation();
            });

            this.inProgress = false;

            this.messageService.add({severity:'success', summary:'Calculation Entry Created', detail:'Your Calculation has been created'});
            
        }, 2000);

        
    }
}