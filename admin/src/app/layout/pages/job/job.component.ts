import { Component, OnInit } from '@angular/core';
import {Job} from './job.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobService} from './job.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {Cbo} from "../cbo/cbo.model";
import {Salary} from "../salary/salary.model";
import {SalaryService} from "../salary/salary.service";
import {CboService} from "../cbo/cbo.service";
import {WorkHourService} from "../work-hour/work-hour.service";
import {WorkHour} from "../work-hour/work-hour.model";

@Component({
  selector: 'app-job-offers',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  public jobs: Job[];
  public workHours: WorkHour[];
  public salaries: Salary[];
  public cbos: Cbo[];
  public loadingDataGrid: boolean;
  public filter: any = {};
  public modal: any = {isVisibled: false, title: 'Novo cadastro', loading: false};
  public jobSwitchActive: boolean;

  public formModal: FormGroup;

  constructor(
    private jobService: JobService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private salaryService: SalaryService,
    private cboService: CboService,
    private workHourService: WorkHourService
  ) {}

  ngOnInit() {
    this.index();
    this.formModal = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      created_at: ['', Validators.required],
      expirate_at: ['', Validators.required],
      age_range_start: ['', Validators.required],
      age_range_end: ['', Validators.required],
      age_weight_start: ['', Validators.required],
      age_weight_end: ['', Validators.required],
      age_height_start: ['', Validators.required],
      age_height_end: ['', Validators.required],
      company_id: ['', Validators.required],
      cbo_id: ['', Validators.required],
      salary_id: ['', Validators.required],
      work_hour_id: ['', Validators.required],
      gender: ['', Validators.required],
      human_characteristics: ['', Validators.required],
      technical_characteristics: ['', Validators.required],
      experiences: ['', Validators.required],
      observations: ['', Validators.required],
      active: ['', Validators.required],
      key_words: ['', Validators.required],
    });
  }

  openModal() {
    this.formModal.reset({active: true});
    this.modal.isVisibled = true;
    this.indexCbos();
    this.indexSalaries();
    this.indexWorkHours();
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
    this.jobService.index().subscribe(response => {
      this.loadingDataGrid = false;
      this.jobs = response;
    }, error => {
      this.loadingDataGrid = false;
    });
  }

  show(id: string) {
    this.jobService.show(id).subscribe(response => {
      this.openModal();
      this.formModal.patchValue(response);
      this.modal.title = `Editando cadastro ${response.title}`;
    });
  }

  add() {
    this.modal.loading = true;
    this.jobService.store(this.formModal.value).subscribe(response => {
      this.modal.loading = false;
      this.closeModal();
      this.index();
      this.notification.create(
        'success',
        'Sucesso',
        'Vaga cadastrada com sucesso'
      );
    }, error => {
      this.modal.loading = false;
    });
  }

  update() {
    this.modal.loading = true;
    this.jobService.update(this.formModal.value).subscribe(response => {
      this.modal.loading = false;
      this.closeModal();
      this.index();
      this.notification.create(
        'success',
        'Sucesso',
        'Vaga atualizada com sucesso'
      );
    }, error => {
      this.modal.loading = false;
    });
  }

  changeActive(job: Job) {
    this.jobSwitchActive = true;
    this.jobService.update({id: job.id, active: job.active}).subscribe(response => {
      this.jobSwitchActive = false;
    }, error => {
      this.jobSwitchActive = false;
    });
  }

  indexCbos(){
    this.cboService.index().subscribe(response => {
      this.cbos = response;
    });
  }

  indexWorkHours(){
    this.workHourService.index().subscribe(response => {
      this.workHours = response;
    });
  }

  indexSalaries(){
    this.salaryService.index().subscribe(response => {
      this.salaries = response;
    });
  }

}
