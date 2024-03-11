import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClaimModalComponent } from './view-claim-modal.component';

describe('ViewClaimModalComponent', () => {
  let component: ViewClaimModalComponent;
  let fixture: ComponentFixture<ViewClaimModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClaimModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClaimModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
