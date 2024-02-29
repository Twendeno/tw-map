import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMenuCardComponent } from './item-menu-card.component';

describe('ItemMenuCardComponent', () => {
  let component: ItemMenuCardComponent;
  let fixture: ComponentFixture<ItemMenuCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemMenuCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemMenuCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
