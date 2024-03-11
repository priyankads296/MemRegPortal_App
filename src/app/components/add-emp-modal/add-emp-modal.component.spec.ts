import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpModalComponent } from './add-emp-modal.component';

describe('AddEmpModalComponent', () => {
  let component: AddEmpModalComponent;
  let fixture: ComponentFixture<AddEmpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
