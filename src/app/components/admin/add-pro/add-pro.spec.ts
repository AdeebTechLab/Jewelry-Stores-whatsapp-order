import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPro } from './add-pro';

describe('AddPro', () => {
  let component: AddPro;
  let fixture: ComponentFixture<AddPro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPro],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
