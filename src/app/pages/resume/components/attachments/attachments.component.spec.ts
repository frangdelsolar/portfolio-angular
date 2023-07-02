import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttachmentsComponent } from './attachments.component';
import { FormBuilder } from '@angular/forms';
import { AttachmentService } from '@app/core/controllers/attachment.controller';
import { of, Subject } from 'rxjs';
import { Attachment } from '@app/core/models/attachment.interface';
import { HttpClient } from '@angular/common/http';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ConfirmationService } from 'primeng/api';

const mockAttachmentService = {
  get: () => {},
};

const mockConfirmationService = {
  confirm: () => {},
};

class MockReloadService {
  reload() {}
}

const mockDialogService = {
  show: () => {},
  DialogShowSubject: new Subject<boolean>(),
  DialogShowObservable: () =>
    mockDialogService.DialogShowSubject.asObservable(),
};

describe('AttachmentsComponent', () => {
  let component: AttachmentsComponent;
  let fixture: ComponentFixture<AttachmentsComponent>;
  let attachmentService: AttachmentService;
  let dialogService: any;
  let confirmationService: ConfirmationService;
  let reloadService: MockReloadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttachmentsComponent],
      providers: [
        FormBuilder,
        { provide: AttachmentService, useValue: mockAttachmentService },
        { provide: HttpClient },
        { provide: AppDialogService, useValue: mockDialogService },
        { provide: ConfirmationService, useValue: mockConfirmationService },
        { provide: MockReloadService, useClass: MockReloadService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsComponent);
    component = fixture.componentInstance;
    attachmentService = TestBed.inject(AttachmentService);
    dialogService = TestBed.inject(AppDialogService);
    confirmationService = TestBed.inject(ConfirmationService);
    reloadService = TestBed.inject(MockReloadService);

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

    spyOn(dialogService, 'show');
    spyOn(dialogService.DialogShowSubject, 'next');
    spyOn(confirmationService, 'confirm');
    spyOn(reloadService, 'reload');

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
});
