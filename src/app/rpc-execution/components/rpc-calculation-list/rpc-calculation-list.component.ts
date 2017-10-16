import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ExecutionType } from '../../models/executionType.interface';


@Component({
    selector: 'rpc-calculation-list',
    styleUrls: ['rpc-calculation-list.component.scss'],
    templateUrl: './rpc-calculation-list.component.html'
})
export class RpcCalculationListComponent {

    @Input()
    parent: FormGroup;
    
    @Input()
    map: Map<number, ExecutionType>; 

    /**
     * 
     * @param id 
     */
    getExecutionTypeName(id: number) {
        return this.map.get(parseInt(id.toString()));
    }

    get calculations() {
        return (this.parent.get('calculation') as FormArray).controls;
    }

    @Output()
    removed  = new EventEmitter<any>();

    onRemove(group, index) {
        this.removed.emit( { group, index });
    }
}

