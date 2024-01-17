import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComeBackComponent } from './come-back.component';

describe('ComeBackComponent', () => {
  let component: ComeBackComponent;
  let fixture: ComponentFixture<ComeBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComeBackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComeBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
