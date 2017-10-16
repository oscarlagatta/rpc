import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from  '@angular/forms'
import { ExecutionType } from '../../models/executionType.interface';

@Component({
    selector: 'rpc-calculation-selector',
    styleUrls: ['rpc-calculation-selector.component.scss'],
    templateUrl: './rpc-calculation-selector.component.html'
})
export class RpcCalculationSelectorComponent {
    @Input()
    parent: FormGroup

    @Input()
    executionTypes: ExecutionType[];

    @Output()
    calculated = new EventEmitter<any>();


    get notSelected() {
        return (
            !this.parent.get('calculationSelector.type_id').value
        );
    }

    get noInputValues(){
        return (
            !(this.parent.get('calculationInput.limit').value) || 
            !(this.parent.get('calculationInput.retention').value) 
        )
    }
    get calculationExists() {
        return this.parent.hasError('calculationExists') && 
        this.parent.get('calculationSelector.type_id').dirty;
    }

    onAddCalculation() {
        this.calculated.emit({
            
            type: this.parent.get('calculationSelector').value,
            input: this.parent.get('calculationInput').value
        });

        this.parent.get('calculationInput').reset({
            limit: '',
            retention: ''
        });

        this.parent.get('calculationSelector').reset({
            type_id: '',
        });
    }
}
