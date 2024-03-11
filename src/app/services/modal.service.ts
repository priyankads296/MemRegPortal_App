import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }
  openEmployeeModal$:Subject<void>=new Subject<void>;
  closeEmployeeModal$:Subject<void>=new Subject<void>;

  openEmployeeModal():void{
    this.openEmployeeModal$.next();
  }
  closeEmployeeModal():void{
    this.closeEmployeeModal$.next();
  }
  
}
