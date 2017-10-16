import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'rpc-calculation-input',
    styleUrls: ['rpc-calculation-input.component.scss'],
    templateUrl: './rpc-calculation-input.component.html'
})
export class RpcCalculationInputComponent {
    @Input()
    parent: FormGroup    
    
    /**
     * 
     * @param name is the control name being validated
     */
    required(name: string) {
        return (
            this.parent.get(`calculationInput.${name}`).hasError('required') && 
                this.parent.get(`calculationInput.${name}`).touched
        )
    }

    
}
