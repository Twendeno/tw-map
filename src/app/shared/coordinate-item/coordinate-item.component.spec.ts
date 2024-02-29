import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateItemComponent } from './coordinate-item.component';

describe('CoordinateItemComponent', () => {
  let component: CoordinateItemComponent;
  let fixture: ComponentFixture<CoordinateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinateItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordinateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
