import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ExecutionType } from '../models/executionType.interface';
import { Calculation } from '../models/calculation.interface';
import { CalculationResult } from '../models/calculationResult.interface';




@Injectable()
export class ExecutionService {

    API: string = "http://localhost:3004"; 

    constructor(
        private http: Http){}

    getExecutionTypes() : Observable<ExecutionType[]> {
        return this.http
            .get(`${this.API}/executionTypes`)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    getCalculations() : Observable<Calculation[]> {
        return this.http
            .get(`${this.API}/calculation`)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    getCalculationResults() : Observable<CalculationResult[]> {
        return this.http
            .get(`${this.API}/calculationResults`)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()));
    }
}