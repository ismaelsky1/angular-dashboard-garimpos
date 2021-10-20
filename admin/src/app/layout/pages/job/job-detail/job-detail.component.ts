import { Component, OnInit } from '@angular/core';
import {JobService} from '../job.service';
import {Job} from '../job.model';
import {ActivatedRoute} from '@angular/router';
import {JobStepService} from '../job-step.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {JobStepCandidate, JobStepCandidateService} from '../job-step-candidate.service';
import {CandidateService} from '../../candidate/candidate.service';
import {Candidate} from '../../candidate/candidate.model';

@Component({
  selector: 'app-job-offer-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  public jobId: string;
  public job: Job;
  public candidate: Candidate;
  public modal: any = {isVisibled: false, title: '', loading: false};

  constructor(
    private jobService: JobService,
    private jobStepService: JobStepService,
    private jobStepCandidateService: JobStepCandidateService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private candidateService: CandidateService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('id');
      this.show(this.jobId);
    });
  }

  show(id: string) {
    this.jobService.showWithSteps(id).subscribe(response => {
      this.job = response;
      const key_words = response.key_words;
      this.job.key_words = key_words.split(',');
    });
  }

  addNewStep(jobId: string, sequence: number){
    const signo = prompt('Informe o nome da coluna');
    if(signo){
      this.jobStepService.store({sequence: (sequence + 1), job_id: jobId, name: signo}).subscribe(data => {
        this.notification.create(
          'success',
          'Sucesso',
          'Nova coluna criada com sucesso'
        );
        this.show(this.jobId);
      });
    }
  }

  removeStep(jobId: string, id: string) {
    this.jobStepService.delete(id).subscribe(data => {
      this.notification.create(
        'success',
        'Sucesso',
        'Coluna removida com sucesso'
      );
      this.show(this.jobId);
    });
  }

  changeCandidateNextStep(jobStepCandidate: JobStepCandidate, jobStepId: string) {
    console.log(jobStepCandidate)
    this.jobStepCandidateService.update({id: jobStepCandidate.id, check: true}).subscribe(response => {
      this.jobStepCandidateService.store({candidate_id: jobStepCandidate.candidate_id, job_step_id: jobStepId, check: false}).subscribe(data => {
        this.show(this.jobId);
      });
    });
  }

  openModalCandidate(candidateId: string) {
    this.candidateService.show(candidateId).subscribe(response => {
      this.candidate = response;
      this.modal.isVisibled = true;
    });
  }

  closeModalCandidate() {
    this.modal.isVisibled = false;
  }

}
