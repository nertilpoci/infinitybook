import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbBaseboardelementsComponent } from './ib-baseboardelements.component';

describe('IbBaseboardelementsComponent', () => {
  let component: IbBaseboardelementsComponent;
  let fixture: ComponentFixture<IbBaseboardelementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbBaseboardelementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbBaseboardelementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
