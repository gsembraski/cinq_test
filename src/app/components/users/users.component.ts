import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../providers/user.service';
import { User } from '../../common/user';
import { CsvDataService } from '../../providers/csv-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList: Array<User>;
  checkAll: boolean;
  checkedAll: boolean = false;
  inputFind: string;

  constructor(private userService: UserService,
    private csvDataService: CsvDataService,
    private router: Router) { }

  ngOnInit() {
    this.userList = new Array<User>();
    this.userService.getAll().subscribe((data) => {
      this.userList.push(data);
    }, (err) => {
      console.log('error: ', err);
    });
  }

  public isNotChecked() {
    let checked = true;
    this.userList.forEach(function (item) {
      if (item.checked)
        checked = false;
    });
    return checked;
  }

  public validChecked(check) {
    this.userList.forEach(function (item) {
      if (!item.checked)
        check.checked = false;
    });
  }

  public setCheck(checked) {
    this.userList.forEach(function (item) {
      item.checked = checked;
    });
  }

  public setCheckItem(id, checked, check) {
    this.userList.forEach(function (item) {
      if (item.id == id)
        item.checked = checked;
    });
    this.validChecked(check);
  }

  public deleteItem(id) {
    this.userService.deleteItem(this.userList.filter(function (value, index, arr) {
      return value.id != id;
    }));
    this.getUsers("");
  }

  public deleteSelected() {
    this.userService.deleteSelected(this.userList);
    this.getUsers("");
  }

  public getUsers(text) {
    if (text && text.length) {
      this.userList = new Array<User>();
      this.userService.getByName(text).subscribe((data) => {
        this.userList.push(data);
      }, (err) => {
        console.log('error: ', err);
      });
    } else {
      this.userList = new Array<User>();
      this.userService.getAll().subscribe((data) => {
        this.userList.push(data);
      }, (err) => {
        console.log('error: ', err);
      });
    }
  }

  public getCountSelectec() {
    return this.userList.filter(function (value, index, arr) {
      return value.checked;
    }).length;
  }

  public goToUserDatails(id) {
    this.router.navigate(['/user-details'], { queryParams: { id: id } });
  }

  public download() {
    this.csvDataService.exportToCsv("users.csv", this.userList);
  }
}
