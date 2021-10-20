import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loadingDataGrid: any;
  users = [
    {
      id: 1,
      name: 'João Fernando de Souza',
      document: '756.452.963-78',
      email: 'joao.fernando@gmail.com',
      telphone: '(77) 99909-6539',
      created_at: '2020-05-09',
      active: true
    },
    {
      id: 1,
      name: 'Marília Fernanda de Lima',
      document: '523.451.796-33',
      email: 'marilia.lima@outlook.com.br',
      telphone: '(77) 99909-6539',
      created_at: '2020-05-09',
      active: true
    },
    {
      id: 1,
      name: 'Carlos Henrique de Matos',
      document: '478.412.763-73',
      email: 'carlos.henrique@gmail.com',
      telphone: '(77) 99909-6539',
      created_at: '2020-05-09',
      active: true
    }
  ];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.index().pipe(first()).subscribe(data => {

    }, error => {

    });
  }

  openModal() {

  }
}
