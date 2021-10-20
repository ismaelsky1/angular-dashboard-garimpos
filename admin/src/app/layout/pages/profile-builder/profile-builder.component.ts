import { Component, OnInit } from '@angular/core';
import {ProfileBuilder} from './profile-builder.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {ProfileBuilderService} from './profile-builder.service';
import {SalaryService} from '../salary/salary.service';
import {CboService} from '../cbo/cbo.service';
import {WorkHourService} from '../work-hour/work-hour.service';
import {WorkHour} from '../work-hour/work-hour.model';
import {Salary} from '../salary/salary.model';
import {Cbo} from '../cbo/cbo.model';
import * as jwt_decode from 'jwt-decode';
import {AuthenticationService} from '../../../services/authentication.service';
import {City} from '../city/city.model';
import {CityService} from '../city/city.service';
import {JobService} from '../job/job.service';
import {Router} from '@angular/router';
import {JobStepService} from '../job/job-step.service';

@Component({
  selector: 'app-profile-builder',
  templateUrl: './profile-builder.component.html',
  styleUrls: ['./profile-builder.component.css']
})
export class ProfileBuilderComponent implements OnInit {

  private personId: string;

  public profileBuilders: ProfileBuilder[];
  public workHours: WorkHour[];
  public salaries: Salary[];
  public cbos: Cbo[];
  public cities: City[];
  public loadingDataGrid: boolean;
  public filter: any = {};
  public modal: any = {isVisibled: false, title: 'Novo cadastro', loading: false};
  public profileBuilderSwitchActive: boolean;

  public formModal: FormGroup;

  constructor(
    private profileBuilderService: ProfileBuilderService,
    private formBuilder: FormBuilder,
    private route: Router,
    private notification: NzNotificationService,
    private jobService: JobService,
    private salaryService: SalaryService,
    private cboService: CboService,
    private workHourService: WorkHourService,
    private cityService: CityService,
    private authenticationService: AuthenticationService,
    private jobStepService: JobStepService
  ) {}

  ngOnInit() {
    this.formModal = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      age_range_start: ['', Validators.required],
      age_range_end: ['', Validators.required],
      age_weight_start: ['', Validators.required],
      age_weight_end: ['', Validators.required],
      age_height_start: ['', Validators.required],
      age_height_end: ['', Validators.required],
      salary_id: ['', Validators.required],
      work_hour_id: ['', Validators.required],
      city_id: ['', Validators.required],
      cbo_id: ['', Validators.required],
      gender: ['', Validators.required],
      human_characteristics: ['', Validators.required],
      technical_characteristics: ['', Validators.required],
      experiences: ['', Validators.required],
      observations: ['', Validators.required],
      active: ['', Validators.required],
      key_words: ['', Validators.required],
    });

    const company = jwt_decode(this.authenticationService.getToken());

    if (company.person_id) {
      this.personId = company.person_id;
    }

    this.index();
  }

  openModal() {
    this.formModal.reset({active: true});
    this.modal.isVisibled = true;
    this.indexCbos();
    this.indexCbos();
    this.indexSalaries();
    this.indexWorkHours();
    this.indexCities();
  }

  submitFormModal() {
    if (this.formModal.value.id) {
      this.update();
    } else {
      this.add();
    }
  }

  closeModal() {
    this.modal.isVisibled = false;
  }

  index() {
    this.loadingDataGrid = true;
    this.profileBuilderService.index().subscribe(response => {
      this.loadingDataGrid = false;
      this.profileBuilders = response;
    }, error => {
      this.loadingDataGrid = false;
    });
  }

  show(id: string) {
    this.profileBuilderService.show(id).subscribe(response => {
      this.openModal();
      this.formModal.patchValue(response);
      this.modal.title = `Editando cadastro ${response.title}`;
    });
  }

  add() {
    this.modal.loading = true;
    this.formModal.value.company_id = this.personId;
    this.formModal.value.status = 'PENDENT';
    this.formModal.value.key_words = 'teste';
    this.profileBuilderService.store(this.formModal.value).subscribe(response => {
      this.modal.loading = false;
      this.closeModal();
      this.index();
      this.notification.create(
        'success',
        'Sucesso',
        'Perfil cadastrado com sucesso'
      );
    }, error => {
      this.modal.loading = false;
    });
  }

  update() {
    this.modal.loading = true;

    this.formModal.value.company_id = this.personId;
    this.formModal.value.status = 'PENDENT';
    this.formModal.value.key_words = 'teste';
    this.profileBuilderService.update(this.formModal.value).subscribe(response => {
      this.modal.loading = false;
      this.closeModal();
      this.index();
      this.notification.create(
        'success',
        'Sucesso',
        'Perfil atualizado com sucesso'
      );
    }, error => {
      this.modal.loading = false;
    });
  }

  changeActive(profileBuilder: ProfileBuilder) {
    this.profileBuilderSwitchActive = true;
    this.profileBuilderService.update({id: profileBuilder.id, active: profileBuilder.active}).subscribe(response => {
      this.profileBuilderSwitchActive = false;
    }, error => {
      this.profileBuilderSwitchActive = false;
    });
  }

  delete(id: string) {
    this.profileBuilderService.delete(id).subscribe(response => {
      this.index();
      this.notification.create(
        'success',
        'Sucesso',
        'Perfil excluído com sucesso.'
      );
    });
  }

  indexCbos() {
    this.cboService.index().subscribe(response => {
      this.cbos = response;
    });
  }

  indexWorkHours() {
    this.workHourService.index().subscribe(response => {
      this.workHours = response;
    });
  }

  indexSalaries() {
    this.salaryService.index().subscribe(response => {
      this.salaries = response;
    });
  }

  indexCities() {
    this.cityService.index().subscribe(response => {
      this.cities = response;
    });
  }

  buildJob(item) {
    item.id = '';
    this.jobService.store(item).subscribe(response => {
      console.log(response)
      this.createJobSteps(response);
    });
  }

  createJobSteps(response) {
    this.jobStepService.store({sequence: 1, job_id: response.id, name: 'Caixa de Entrada'}).subscribe(data => {
      this.route.navigate(['/job-detail', response.id]);
      this.notification.create(
        'success',
        'Sucesso',
        'Vaga gerada com sucesso.'
      );
    });
  }
}
