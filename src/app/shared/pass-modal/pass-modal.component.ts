import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {ToastService} from '../toast/toast.service';

@Component({
  templateUrl: './pass-modal.component.html',
  styleUrls: ['./pass-modal.component.css']
})
export class PassModalComponent {
  @Output() close = new EventEmitter<void>();
  @ViewChild('passForm', {static: false}) passForm: NgForm;

  constructor(private authService: AuthService,
              private toastService: ToastService) {
  }

  closeModal() {
    this.close.emit();
  }

  changePassWord() {
    this.authService.changePassword(this.passForm.value.pass).subscribe(
      (res) => {
        this.toastService.show('Succeed', 'password is changed', 'succeed');
        this.closeModal();
      },
    (errorMessage) => {
      this.toastService.show('Error', 'password is not changed', 'error');
      this.closeModal();

    }
  )
    ;
  }
}
