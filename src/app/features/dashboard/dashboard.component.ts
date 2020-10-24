import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAuthenticated } from 'src/app/store';
import { checkAuth } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(checkAuth());
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
