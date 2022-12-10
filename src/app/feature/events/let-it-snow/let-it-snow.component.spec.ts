import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetItSnowComponent } from './let-it-snow.component';

describe('LetItSnowComponent', () => {
  let component: LetItSnowComponent;
  let fixture: ComponentFixture<LetItSnowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetItSnowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetItSnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
