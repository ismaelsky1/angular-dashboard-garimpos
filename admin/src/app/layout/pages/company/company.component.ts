import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {Company} from './company.model';
import {CompanyService} from './company.service';
import {City} from '../city/city.model';
import {CityService} from '../city/city.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public filter: any;
  public loadingDataGrid: any;
  public companies: Company[];
  public cities: City[];
  public formModal: FormGroup;
  public modal: any = {isVisibled: false, title: 'Novo cadastro', loading: false};

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private companyService: CompanyService,
    private cityService: CityService
  ) { }

  ngOnInit() {
    this.formModal = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      fantasy_name: [null, Validators.required],
      document: [null, Validators.required],
      street: [null, Validators.required],
      district: [null, Validators.required],
      city_id: [null, Validators.required],
      zipcode: [null, Validators.required],
      number: [null, Validators.required],
      complement: [null, Validators.required],
      reference: [null, Validators.required],
      created_at: [null, Validators.required],
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
    this.companyService.show(id).subscribe(response => {

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
    this.companyService.index().subscribe(response => {
      this.loadingDataGrid = false;
      this.companies = response;
    }, error => {
      this.loadingDataGrid = false;
    });
  }

  add() {
    this.modal.loading = true;
    this.companyService.store(this.formModal.value).subscribe(response => {

      this.modal.loading = false;

      this.closeModal();
      this.index();

      this.notification.create(
        'success',
        'Sucesso',
        'Empresa cadastrada com sucesso'
      );

      this.formModal.reset();

    }, error => {
      this.modal.loading = false;
    });
  }

  update() {
    this.modal.loading = true;
    this.companyService.update(this.formModal.value).subscribe(response => {

      this.modal.loading = false;
      this.closeModal();

      this.index();

      this.notification.create(
        'success',
        'Sucesso',
        'Empresa atualizada com sucesso'
      );

    }, error => {
      this.modal.loading = false;
    });
  }

  delete(id: string) {
    this.companyService.delete(id).subscribe(response => {
      this.index();
      this.notification.create(
        'success',
        'Sucesso',
        'Empresa excluída com sucesso.'
      );
    }, error => {
    });
  }

  indexCities() {
    this.cityService.index().subscribe(response => {
      this.cities = response;
    });
  }
}
