import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProDetails } from './pro-details';

describe('ProDetails', () => {
  let component: ProDetails;
  let fixture: ComponentFixture<ProDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ProDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
