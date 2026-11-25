import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFront } from './public-front';

describe('PublicFront', () => {
  let component: PublicFront;
  let fixture: ComponentFixture<PublicFront>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicFront],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicFront);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
