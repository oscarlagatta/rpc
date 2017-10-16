import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// allow us to use the component code as the source 
// of true for our model
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import  { DataTableModule, PanelModule, FieldsetModule, GrowlModule } from 'primeng/primeng';  

import {   MatButtonModule, MatProgressBarModule } from '@angular/material'; 

import { RpcExecutionComponent } from './containers/rpc-execution/rpc-execution.component';

import { RpcCalculationInputComponent } from './components/rpc-calculation-input/rpc-calculation-input.component';

import { RpcCalculationSelectorComponent } from './components/rpc-calculation-selector/rpc-calculation-selector.component';

import { RpcCalculationListComponent } from './components/rpc-calculation-list/rpc-calculation-list.component';

import { RpcCalculationResultListComponent } from  './components/rpc-calculation-result-list/rpc-calculation-result-list.component';

import { ExecutionService } from './services/execution.service';
import {MessageService} from 'primeng/components/common/messageservice';

@NgModule({
    declarations: [
        RpcExecutionComponent,
        RpcCalculationInputComponent,
        RpcCalculationSelectorComponent,
        RpcCalculationListComponent,
        RpcCalculationResultListComponent
    ],
    providers: [
        ExecutionService,
        MessageService
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpModule,
        DataTableModule,
        PanelModule,
        FieldsetModule,
        GrowlModule,
        MatButtonModule,
        MatProgressBarModule
    ],
     exports: [
        // so can be used in the app.component
        RpcExecutionComponent
    ]
    
})
export class RpcExecutionModule {

}