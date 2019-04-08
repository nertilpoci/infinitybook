import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IBCommonComponent } from './ib-common.component';

describe('IBCommonComponent', () => {
  let component: IBCommonComponent;
  let fixture: ComponentFixture<IBCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IBCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IBCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
