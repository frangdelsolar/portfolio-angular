import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttachmentsComponent } from './attachments.component';
import { FormBuilder } from '@angular/forms';
import { AttachmentService } from '@app/core/controllers/attachment.controller';
import { of } from 'rxjs';
import { Attachment } from '@app/core/models/attachment.interface';
import { HttpClient } from '@angular/common/http';

const mockAttachmentService = {
  get: () => {},
};

describe('AttachmentsComponent', () => {
  let component: AttachmentsComponent;
  let fixture: ComponentFixture<AttachmentsComponent>;
  let attachmentService: AttachmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttachmentsComponent],
      providers: [
        FormBuilder,
        { provide: AttachmentService, useValue: mockAttachmentService },
        HttpClient,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsComponent);
    component = fixture.componentInstance;
    attachmentService = TestBed.inject(AttachmentService);

    spyOn(attachmentService, 'get').and.returnValue(
      of([
        {
          id: 1,
          name: 'Attachment 1',
          description: 'Description 1',
          file_url: 'http://example.com/file1.pdf',
        },
        {
          id: 2,
          name: 'Attachment 2',
          description: 'Description 2',
          file_url: 'http://example.com/file2.pdf',
        },
      ])
    );

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch attachments on initialization', () => {
    expect(attachmentService.get).toHaveBeenCalled();
    expect(component.files.length).toBe(2);
    expect(component.files[0].name).toBe('Attachment 1');
    expect(component.files[1].name).toBe('Attachment 2');
  });

  it('should render attachments with correct data', () => {
    const attachments = fixture.nativeElement.querySelectorAll('.file');
    expect(attachments.length).toBe(2);

    const firstAttachment = attachments[0];
    expect(firstAttachment.querySelector('h4').textContent).toContain(
      'Attachment 1'
    );
    expect(firstAttachment.querySelector('small').textContent).toContain(
      'Description 1'
    );
    expect(firstAttachment.querySelector('a').getAttribute('href')).toBe(
      'http://example.com/file1.pdf'
    );

    const secondAttachment = attachments[1];
    expect(secondAttachment.querySelector('h4').textContent).toContain(
      'Attachment 2'
    );
    expect(secondAttachment.querySelector('small').textContent).toContain(
      'Description 2'
    );
    expect(secondAttachment.querySelector('a').getAttribute('href')).toBe(
      'http://example.com/file2.pdf'
    );
  });
});
