import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CboService} from './cbo.service';
import {Cbo} from './cbo.model';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-cbo',
  templateUrl: './cbo.component.html',
  styleUrls: ['./cbo.component.css']
})
export class CboComponent implements OnInit {
  public filter: any;
  public loadingDataGrid: any;
  public cbos: Cbo[];
  public formModal: FormGroup;
  public modal: any = {isVisibled: false, title: 'Novo cadastro', loading: false};

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private cboService: CboService,
  ) { }

  ngOnInit() {
    this.formModal = this.formBuilder.group({
      id: [null, Validators.required],
      code: [null, Validators.required],
      name: [null, Validators.required],
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

  show(id: string) {
    this.loadingDataGrid = true;
    this.cboService.show(id).subscribe(response => {

      this.openModal();
      this.formModal.patchValue(response);

      this.modal.title = `Editando cadastro ${response.name}`;
      this.loadingDataGrid = false;

    }, error => {
      this.loadingDataGrid = false;
    });
  }

  index() {
    this.loadingDataGrid = true;
    this.cboService.index().subscribe(response => {
      this.loadingDataGrid = false;
      this.cbos = response;
    }, error => {
      this.loadingDataGrid = false;
    });
  }

  add() {
    this.modal.loading = true;
    this.cboService.store(this.formModal.value).subscribe(response => {

      this.modal.loading = false;

      this.closeModal();
      this.index();

      this.notification.create(
        'success',
        'Sucesso',
        'Item cadastrada com sucesso'
      );

      this.formModal.reset();

    }, error => {
      this.modal.loading = false;
    });
  }

  update() {
    this.modal.loading = true;
    this.cboService.update(this.formModal.value).subscribe(response => {

      this.modal.loading = false;
      this.closeModal();

      this.index();

      this.notification.create(
        'success',
        'Sucesso',
        'Registro atualizado com sucesso'
      );

    }, error => {
      this.modal.loading = false;
    });
  }

  delete(id: string) {
    this.cboService.delete(id).subscribe(response => {
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
