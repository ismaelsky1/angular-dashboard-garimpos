import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {RewardService} from './reward.service';
import {Reward} from './reward.model';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})
export class RewardComponent implements OnInit {

  public modal: any = {isVisibled: false, title: 'Novo cadastro', loading: false};
  public loadingDataGrid: any;
  public formModal: FormGroup;
  public rewards: Reward[];

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private rewardService: RewardService
  ) { }

  ngOnInit(){
    this.formModal = this.formBuilder.group({
      id: [null, Validators.required],
      description: [null, Validators.required],
      quantity: [null, Validators.required],
      price: [null, Validators.required],
      active: [true, Validators.required]
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
    this.rewardService.show(id).subscribe(response => {

      this.openModal();
      this.formModal.patchValue(response);

      this.modal.title = `Editando cadastro ${response.description}`;
      this.loadingDataGrid = false;

    }, error => {
      this.loadingDataGrid = false;
    });
  }

  index() {
    this.loadingDataGrid = true;
    this.rewardService.index().subscribe(response => {
      this.loadingDataGrid = false;
      this.rewards = response;
    }, error => {
      this.loadingDataGrid = false;
    });
  }

  add() {
    this.modal.loading = true;
    this.rewardService.store(this.formModal.value).subscribe(response => {

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
    this.rewardService.update(this.formModal.value).subscribe(response => {

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
    this.rewardService.delete(id).subscribe(response => {
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
