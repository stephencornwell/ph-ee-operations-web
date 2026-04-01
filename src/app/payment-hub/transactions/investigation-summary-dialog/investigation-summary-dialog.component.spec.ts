import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationSummaryDialogComponent } from './investigation-summary-dialog.component';

describe('InvestigationSummaryDialogComponent', () => {
  let component: InvestigationSummaryDialogComponent;
  let fixture: ComponentFixture<InvestigationSummaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationSummaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
