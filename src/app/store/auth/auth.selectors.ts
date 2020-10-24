import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authFeatureName, AuthState } from './auth.reducer';

export const getAuthFeatureState = createFeatureSelector(authFeatureName);

export const selectIsAuthenticated = createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.isLoggedIn
);

export const selectuserInfo = createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.profile
);
