import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputImageComponent } from './input-image.component';
import { By } from '@angular/platform-browser';

describe('InputImageComponent', () => {
  let component: InputImageComponent;
  let fixture: ComponentFixture<InputImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputImageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputImageComponent);
    component = fixture.componentInstance;
    component.item = {
      name: 'bfs',
      description: '',
      image_url: 'http://localhost:8000/media/images/bfs.jpeg',
      thumbnail_url: 'http://localhost:8000/media/thumbnails/bfs_thumbnail.jpg',
    };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the image with correct attributes', () => {
    const image: HTMLImageElement = fixture.debugElement.query(
      By.css('.image')
    ).nativeElement;
    component.item = {
      description: 'Test Image',
      image_url: 'http://example.com/image.jpg',
    };
    fixture.detectChanges();

    expect(image.alt).toBe('Test Image');
    expect(image.src).toBe('http://example.com/image.jpg');
  });

  it('should show the overlay and handle file upload when edit mode is on', () => {
    component.editModeOn = true;
    fixture.detectChanges();

    const overlay: HTMLDivElement = fixture.debugElement.query(
      By.css('.overlay')
    ).nativeElement;
    const fileUploadComponent = fixture.debugElement.query(
      By.css('p-fileUpload')
    );

    expect(overlay).toBeTruthy();
    expect(fileUploadComponent).toBeTruthy();
  });

  it('should log the upload event when onUpload is called', () => {
    spyOn(console, 'log');
    const event = {
      /* mock event data */
    };
    component.onUpload(event);
    expect(console.log).toHaveBeenCalledWith(event);
  });
});
