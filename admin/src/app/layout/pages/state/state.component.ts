import { Component, OnInit } from '@angular/core';
import {State} from './state.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {StateService} from './state.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  public filter: any;
  public loadingDataGrid: any;
  public states: State[];
  public formModal: FormGroup;
  public modal: any = {isVisibled: false, title: 'Novo cadastro', loading: false};

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.formModal = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      initials: [null, Validators.required],
      active: [null, Validators.required],
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
    this.stateService.show(id).subscribe(response => {

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
    this.stateService.index().subscribe(response => {
      this.loadingDataGrid = false;
      this.states = response;
    }, error => {
      this.loadingDataGrid = false;
    });
  }

  add() {
    this.modal.loading = true;
    this.stateService.store(this.formModal.value).subscribe(response => {

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
    this.stateService.update(this.formModal.value).subscribe(response => {

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
    this.stateService.delete(id).subscribe(response => {
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
