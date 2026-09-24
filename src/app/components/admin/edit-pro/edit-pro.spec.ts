import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPro } from './edit-pro';

describe('EditPro', () => {
  let component: EditPro;
  let fixture: ComponentFixture<EditPro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPro],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
