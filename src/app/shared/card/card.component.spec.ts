import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'primeng/api';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it(`should show 'test title'`, () => {
  //   component.title = 'test title';
  //   const titleElement = fixture.nativeElement.querySelector('p-card-title');
  //   expect(titleElement.innerText).toEqual('test title');
  // });
});
