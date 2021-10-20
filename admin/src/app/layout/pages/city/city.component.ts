import { Component, OnInit } from '@angular/core';
import {City} from './city.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {CityService} from './city.service';
import {State} from '../state/state.model';
import {StateService} from '../state/state.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  public filter: any;
  public loadingDataGrid: any;
  public cities: City[];
  public states: State[];
  public formModal: FormGroup;
  public modal: any = {isVisibled: false, title: 'Novo cadastro', loading: false};

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private cityService: CityService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.formModal = this.formBuilder.group({
      id: [null, Validators.required],
      code: [null, Validators.required],
      name: [null, Validators.required],
      state_id: [null, Validators.required],
      active: [null, Validators.required],
    });

    this.indexStates();
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
    this.cityService.show(id).subscribe(response => {

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
    this.cityService.index().subscribe(response => {
      this.loadingDataGrid = false;
      this.cities = response;
    }, error => {
      this.loadingDataGrid = false;
    });
  }

  add() {
    this.modal.loading = true;
    this.cityService.store(this.formModal.value).subscribe(response => {

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
    this.cityService.update(this.formModal.value).subscribe(response => {

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
    this.cityService.delete(id).subscribe(response => {
      this.index();
      this.notification.create(
        'success',
        'Sucesso',
        'Registro excluído com sucesso.'
      );
    });
  }

  indexStates() {
    this.stateService.index().subscribe(response => {
      this.states = response;
    });
  }

}
