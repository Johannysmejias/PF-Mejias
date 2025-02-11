import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  
  templateUrl: './nav-menu.component.html',
  styles: ``
})
export class NavMenuComponent {
  constructor(private router: Router){}
  menuItems = [
    { path: 'home', label: 'Home' },
    { path: 'students', label: 'Estudiantes' },
    { path: 'courses', label: 'Cursos'}
  ];

  logout():void{
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login'])
  }
}
