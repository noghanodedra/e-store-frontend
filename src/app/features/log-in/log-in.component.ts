import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { checkAuth, login } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogInComponent implements OnInit {
  hide;
  form: FormGroup;
  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.store.dispatch(checkAuth());
    this.form = this.fb.group({
      username: ['dev@dev.com', Validators.email],
      password: ['Noghan12345', Validators.required],
    });
  }

  // tslint:disable-next-line: typedef
  async onSubmit() {
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        this.store.dispatch(login({ username, password }));
      } catch (err) {}
    }
  }
}
