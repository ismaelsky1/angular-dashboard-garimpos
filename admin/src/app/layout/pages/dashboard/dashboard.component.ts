import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public opportunityLoading: boolean;
  public contactLoading: boolean;
  public proposalLoading: boolean;
  public saleLoading: boolean;

  lastSubscriptions = [
    {
      id: 1,
      candidate: {id: 1, name: 'João Mendes Silva'},
      company: {id: 1, name: 'Brasa e CIA'},
      cbo: {id: 1, description: 'Administrador de Empresas'},
      created_at: '2020-05-09',
      status: 'CONFIRMED'
    },
    {
      id: 1,
      candidate: {id: 1, name: 'João Mendes Silva'},
      company: {id: 1, name: 'Brasa e CIA'},
      cbo: {id: 1, description: 'Administrador de Empresas'},
      created_at: '2020-05-09',
      status: 'CANCELED'
    }
  ];

  constructor(
  ){}

  ngOnInit() {
  }

}
