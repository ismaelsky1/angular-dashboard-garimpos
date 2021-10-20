import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {SalaryService} from './salary.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  public modal: any = {isVisibled: false, title: 'Novo cadastro', loading: false};
  public salaries: any[];
  public loadingDataGrid: any;
  public formModal: any;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private salaryService: SalaryService
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
    this.salaryService.index().subscribe(response => {
      this.loadingDataGrid = false;
      this.salaries = response;
    }, error => {
      this.loadingDataGrid = false;
    });
  }

  show(id: string) {
    this.loadingDataGrid = true;
    this.salaryService.show(id).subscribe(response => {
      this.formModal.patchValue(response);
      this.modal.title = `Editando registro ${response.name}`;
      this.openModal();
      this.loadingDataGrid = false;
    });
  }

  add() {
    this.modal.loading = true;
    this.salaryService.store(this.formModal.value).subscribe(response => {
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
    this.salaryService.update(this.formModal.value).subscribe(response => {

      this.modal.loading = false;
      this.closeModal();

      this.index();

    }, error => {
      this.modal.loading = false;
    });
  }

  delete(id: string) {
    this.salaryService.delete(id).subscribe(response => {
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
