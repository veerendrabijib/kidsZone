import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameInfo } from './name-info';

describe('NameInfo', () => {
  let component: NameInfo;
  let fixture: ComponentFixture<NameInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
