import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ViewModelService {


    private dataSubject = new BehaviorSubject(null);
    data$ = this.dataSubject.asObservable();

    private _data: any;
    set data(value: any) {
        this._data = value? JSON.parse(value) : null;
        this.dataSubject.next(this._data);
    }

    get data(): any {
        return this._data;
    }
}
