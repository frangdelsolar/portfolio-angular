import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AttachmentFormComponent } from './attachment-form.component';
import { AttachmentService } from '@app/core/controllers/attachment.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { of } from 'rxjs';
import { throwError } from 'rxjs';
const mockDialogSvc = {
  close: () => {},
  DialogDataObservable: of({ data: {} }),
};

const mockAttachmentSvc = {
  create: () => {},
  update: () => {},
};

const mockToastSvc = {
  add: () => {},
};

describe('AttachmentFormComponent', () => {
  let component: AttachmentFormComponent;
  let fixture: ComponentFixture<AttachmentFormComponent>;
  let attachmentService: AttachmentService;
  let dialogService: AppDialogService;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [AttachmentFormComponent],
      providers: [
        { provide: AttachmentService, useValue: mockAttachmentSvc },
        { provide: AppDialogService, useValue: mockDialogSvc },
        { provide: ToastService, useValue: mockToastSvc },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentFormComponent);
    component = fixture.componentInstance;
    attachmentService = TestBed.inject(AttachmentService);
    dialogService = TestBed.inject(AppDialogService);
    toastService = TestBed.inject(ToastService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.form.get('name')?.value).toEqual('');
    expect(component.form.get('description')?.value).toEqual('');
    expect(component.form.get('file')?.value).toEqual('N/A');
  });

  // it('should set form values based on the item input', () => {
  //   const item = {
  //     id: 1,
  //     name: 'Attachment 1',
  //     description: 'Description 1',
  //     file_name: 'file1.pdf',
  //     file_size: 1024,
  //   };
  //   component.item = item;

  //   expect(component.nameControl.value).toEqual('Attachment 1');
  //   expect(component.descriptionControl.value).toEqual('Description 1');
  //   expect(component.fileControl.value).toEqual({
  //     name: 'file1.pdf',
  //     size: 1024,
  //   });
  // });

  it('should update the form control values when file is uploaded', () => {
    const event = {
      files: [
        new File(['file content'], 'file.pdf', { type: 'application/pdf' }),
      ],
    };
    component.uploadHandler(event);
    fixture.detectChanges();

    expect(component.form.get('file')?.value).toEqual(event.files[0]);
  });

  it('should call the attachment service create method on save click', () => {
    spyOn(attachmentService, 'create').and.returnValue(of({ id: 1 }));
    spyOn(dialogService, 'close');
    component.form.patchValue({
      name: 'Attachment 1',
      description: 'Description 1',
      file: new File(['file content'], 'file.pdf', { type: 'application/pdf' }),
    });
    fixture.detectChanges();

    component.onSaveClick();

    expect(attachmentService.create).toHaveBeenCalledWith(component.formData);
    expect(dialogService.close).toHaveBeenCalled();
  });

  it('should call the attachment service update method on update click', () => {
    spyOn(attachmentService, 'update').and.returnValue(of({ id: 1 }));
    spyOn(dialogService, 'close');
    component.item = { id: 1 };
    component.form.patchValue({
      name: 'Attachment 1',
      description: 'Description 1',
      file: new File(['file content'], 'file.pdf', { type: 'application/pdf' }),
    });
    fixture.detectChanges();

    component.onUpdateClick();

    expect(attachmentService.update).toHaveBeenCalledWith(
      1,
      component.formData
    );
    expect(dialogService.close).toHaveBeenCalled();
  });

  it('should display an error toast when create request fails', () => {
    const errorResponse = { error: { detail: 'Create error' } };
    spyOn(attachmentService, 'create').and.returnValue(
      throwError(errorResponse)
    );
    spyOn(toastService, 'add');
    component.form.patchValue({
      name: 'Attachment 1',
      description: 'Description 1',
      file: new File(['file content'], 'file.pdf', { type: 'application/pdf' }),
    });
    fixture.detectChanges();

    component.onSaveClick();

    expect(toastService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Create error',
    });
  });

  it('should display an error toast when update request fails', () => {
    const errorResponse = { error: { detail: 'Update error' } };
    spyOn(attachmentService, 'update').and.returnValue(
      throwError(errorResponse)
    );
    spyOn(toastService, 'add');
    component.item = { id: 1 };
    component.form.patchValue({
      name: 'Attachment 1',
      description: 'Description 1',
      file: new File(['file content'], 'file.pdf', { type: 'application/pdf' }),
    });
    fixture.detectChanges();

    component.onUpdateClick();

    expect(toastService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Update error',
    });
  });
});
