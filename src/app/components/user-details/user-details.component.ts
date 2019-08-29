import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../providers/user.service';
import { User } from '../../common/user';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {
  private originalFirstName: string;
  private originalLastName: string;
  userItem: User;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getUser();
  }

  public getUser() {
    this.route.queryParams.subscribe(params => {
      this.userService.showItem(Number(params.id)).subscribe((data) => {
        this.userItem = data;
        this.originalFirstName = this.userItem.firstName;
        this.originalLastName = this.userItem.lastName;
      }, (err) => {
        console.log('error: ', err);
      });
    });
  }

  public save() {
    this.userService.saveItem(this.userItem);
    this.location.back();
  }

  public cancel() {
    if (this.isModified()) {
      const modal = this.modalService.open(ModalConfirm);

      modal.result.then((data) => {
        this.location.back();
      });
    } else
      this.location.back();
  }

  private isModified() {
    return this.originalFirstName !== this.userItem.firstName || this.originalLastName !== this.userItem.lastName;
  }
}

@Component({
  selector: 'modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Wait!</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <h3>Are you sure?</h3>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})

export class ModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}