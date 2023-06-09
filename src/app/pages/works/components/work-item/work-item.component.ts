import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WorkService } from '@app/core/controllers/work.controller';
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
  previewControl = new FormControl('', [Validators.required]);
  projectControl = new FormControl('', [Validators.required]);
  repositoryControl = new FormControl('', []);
  startDateControl = new FormControl('', [Validators.required]);
  technologiesControl = new FormControl('', []);
  titleControl = new FormControl('', [Validators.required]);
  urlControl = new FormControl('', []);

  constructor(
    private dialogSvc: AppDialogService,
    private fb: FormBuilder,
    private workSvc: WorkService
  ) {}

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

  onSaveClick() {
    if (this.form.valid) {
      this.workSvc.update(this.item.id, this.form.value).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
