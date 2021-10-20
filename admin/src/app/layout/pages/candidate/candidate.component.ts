import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {Cbo} from '../cbo/cbo.model';
import {CandidateService} from './candidate.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  public filter: any;
  public loadingDataGrid: any;
  public candidates: any[];
  public formModal: FormGroup;
  public modal: any = {isVisibled: false, title: 'Novo cadastro', loading: false};

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private candidateService: CandidateService
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
    this.candidateService.show(id).subscribe(response => {

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
    this.candidateService.index().subscribe(response => {
      this.loadingDataGrid = false;
      this.candidates = response;
    }, error => {
      this.loadingDataGrid = false;
    });
  }

  add() {
    this.modal.loading = true;
    this.candidateService.store(this.formModal.value).subscribe(response => {

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
    this.candidateService.update(this.formModal.value).subscribe(response => {

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
}
