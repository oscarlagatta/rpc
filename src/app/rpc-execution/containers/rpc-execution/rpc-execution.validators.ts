import { AbstractControl } from '@angular/forms';

export class ExecutionValidators {

    /**
     * 
     * @param control 
     */
    static checkCalculationTypeExists(control: AbstractControl) {
        const calculationItem = control.get('calculation');
        const selector = control.get('calculationSelector');

        const input = control.get('calculationInput');

        // safety check
        if (!(selector && calculationItem)) return null;

        const exists = calculationItem.value.some((calculationItem) => {
            return calculationItem.type_id === selector.value.type_id;
        });
        
        return exists ? { calculationExists: true } : null;
    }
}