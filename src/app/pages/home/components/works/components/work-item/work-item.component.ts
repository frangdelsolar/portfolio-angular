import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Work } from '@app/core/models/work.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.scss'],
})
export class WorkItemComponent implements OnInit {
  @Input() item: Work;

  editModeOn: boolean = false;

  form: FormGroup;
  clientControl = new FormControl('', [Validators.required]);
  contentControl = new FormControl('', [Validators.required]);
  previewControl = new FormControl('', [Validators.required, Validators.email]);
  projectControl = new FormControl('', [Validators.required]);
  repositoryControl = new FormControl('', [Validators.required]);
  startDateControl = new FormControl('', [Validators.required]);
  technologiesControl = new FormControl('', [Validators.required]);
  titleControl = new FormControl('', [Validators.required]);
  urlControl = new FormControl('', [Validators.required]);

  constructor(private dialogSvc: AppDialogService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      client: this.clientControl,
      content: this.contentControl,
      preview: this.previewControl,
      project: this.projectControl,
      repository: this.repositoryControl,
      start_date: this.startDateControl,
      technologies: this.technologiesControl,
      title: this.titleControl,
      url: this.urlControl,
    });

    this.dialogSvc.DialogDataObservable.subscribe((res) => {
      this.item = res.data;
      this.form.patchValue(this.item);
    });
  }

  onSaveClick() {}
}
