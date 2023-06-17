import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputImageComponent } from './input-image.component';
import { environment } from '@env/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FileUploadModule } from 'primeng/fileupload';

describe('InputImageComponent', () => {
  let component: InputImageComponent;
  let fixture: ComponentFixture<InputImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputImageComponent],
      imports: [HttpClientTestingModule, FileUploadModule], // Import HttpClientTestingModule to mock HTTP requests
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
