import { Component } from '@angular/core';
import { UserService } from './providers/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'Angular Test';
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getContentJSON();
  }

  getContentJSON() {
    this.userService.getJSON().subscribe(data => {
      localStorage.setItem('users', JSON.stringify(data));
    },
      err => {
        // Log errors if any
        console.log('error: ', err);
      });
  }
}
