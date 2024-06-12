import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTableComponent } from './ag-table.component';

describe('AgTableComponent', () => {
  let component: AgTableComponent;
  let fixture: ComponentFixture<AgTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgTableComponent]
    });
    fixture = TestBed.createComponent(AgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
