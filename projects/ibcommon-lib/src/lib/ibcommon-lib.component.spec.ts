import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbcommonLibComponent } from './ibcommon-lib.component';

describe('IbcommonLibComponent', () => {
  let component: IbcommonLibComponent;
  let fixture: ComponentFixture<IbcommonLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbcommonLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbcommonLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
