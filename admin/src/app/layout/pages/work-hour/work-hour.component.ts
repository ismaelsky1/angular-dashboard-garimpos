import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {WorkHourService} from './work-hour.service';

@Component({
  selector: 'app-work-hour',
  templateUrl: './work-hour.component.html',
  styleUrls: ['./work-hour.component.css']
})
export class WorkHourComponent implements OnInit {
  public workHours: any;
  public loadingDataGrid: any;
  public modal: any = {isVisibled: false, title: 'Novo cadastro', loading: false};
  public formModal: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private workHourService: WorkHourService
  ) { }

  ngOnInit() {
    this.formModal = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required]
    });

    this.index();
  }

  openModal() {
    this.modal.isVisibled = true;
  }

  closeModal() {
    this.modal.isVisibled = false;
  }

  submitFormModal() {
    if (this.formModal.value.id) {
      this.update();
    } else {
      this.add();
    }
  }

  index() {
    this.loadingDataGrid = true;
    this.workHourService.index().subscribe(response => {
      this.loadingDataGrid = false;
      this.workHours = response;
    }, error => {
      this.loadingDataGrid = false;
    });
  }

  show(id: string) {
    this.loadingDataGrid = true;
    this.workHourService.show(id).subscribe(response => {
      this.formModal.patchValue(response);
      this.modal.title = `Editando registro ${response.name}`;
      this.openModal();
      this.loadingDataGrid = false;
    });
  }

  add() {
    this.modal.loading = true;
    this.workHourService.store(this.formModal.value).subscribe(response => {

      this.modal.loading = false;
      this.closeModal();
      this.index();

      this.notification.create(
        'success',
        'Sucesso',
        'Item cadastrado com sucesso'
      );

      this.formModal.reset();

    }, error => {
      this.modal.loading = false;
    });
  }

  update() {
    this.modal.loading = true;
    this.workHourService.update(this.formModal.value).subscribe(response => {

      this.modal.loading = false;
      this.closeModal();

      this.index();

    }, error => {
      this.modal.loading = false;
    });
  }

  delete(id: string) {
    this.workHourService.delete(id).subscribe(response => {
      this.index();
      this.notification.create(
        'success',
        'Sucesso',
        'Registro excluído com sucesso.'
      );
    }, error => {
    });
  }
}
