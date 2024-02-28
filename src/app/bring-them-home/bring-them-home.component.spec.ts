import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BringThemHomeComponent } from './bring-them-home.component';

describe('BringThemHomeComponent', () => {
  let component: BringThemHomeComponent;
  let fixture: ComponentFixture<BringThemHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BringThemHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BringThemHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
