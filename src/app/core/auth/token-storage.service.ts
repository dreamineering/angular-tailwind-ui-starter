import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TokenStorage {
  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  setAccessToken(accessToken: string): TokenStorage {
    localStorage.setItem('access_token', accessToken);
    return this;
  }

  getRefreshToken(): Observable<string> {
    const refreshToken: string = localStorage.getItem('refreshToken');
    return of(refreshToken);
  }

  setRefreshToken(refreshToken: string): TokenStorage {
    localStorage.setItem('refresh_token', refreshToken);
    return this;
  }

  getExpireToken() {
    return parseInt(localStorage.getItem('expires_token'), 10);
  }

  setExpiresToken(expiresToken: string): TokenStorage {
    localStorage.setItem('expires_token', expiresToken);
    return this;
  }

  getVendorId() {
    return JSON.parse(localStorage.getItem('vendorId'));
  }

  setVendorId(vendorId: number): TokenStorage {
    localStorage.setItem('vendorId', String(vendorId));
    return this;
  }

  getLastVendorId() {
    return JSON.parse(sessionStorage.getItem('lastVendorId'));
  }

  setLastVendorId(vendorId: number): TokenStorage {
    sessionStorage.setItem('lastVendorId', String(vendorId));
    return this;
  }

  getVendorsToken() {
    return JSON.parse(localStorage.getItem('vendors_token'));
  }

  setVendorsToken(): TokenStorage {
    localStorage.setItem('vendors_token', 'true');
    return this;
  }

  getLockscreenToken() {
    return JSON.parse(localStorage.getItem('lockscreen_token'));
  }

  setLockscreenToken(lockscreenToken: string): TokenStorage {
    localStorage.setItem('lockscreen_token', lockscreenToken);
    return this;
  }

  clearSession() {
    // Clear all localstorage vars and only maintain login details
    const lastUser = localStorage.getItem('user_name');
    const lastOrg = localStorage.getItem('organisation_name');
    sessionStorage.clear();
    localStorage.clear();
    if (lastUser !== null) {
      localStorage.setItem('user_name', lastUser);
    }
    if (lastOrg !== null) {
      localStorage.setItem('organisation_name', lastOrg);
    }
  }

  clearTabsData() {
    sessionStorage.removeItem('tab');
    sessionStorage.removeItem('vld');
  }

  // user preferences
  getUserSchedulerProvider(siteId) {
    return JSON.parse(localStorage.getItem('selected_provider_' + siteId + '_' + this.getVendorId()));
  }

  setUserSchedulerProvider(selectedProvider: any, siteId): TokenStorage {
    localStorage.setItem('selected_provider_' + siteId + '_' + this.getVendorId(), JSON.stringify(selectedProvider));
    return this;
  }

  getUserSchedulerSite() {
    // let vendorId = this.getVendorId();
    return JSON.parse(localStorage.getItem('selected_site_' + this.getVendorId()));
  }

  getUserSchedulerView() {
    return localStorage.getItem('selected_view_' + this.getVendorId());
  }

  getUserSchedulerDate() {
    return localStorage.getItem('selected_date_' + this.getVendorId());
  }

  setUserSchedulerSite(selectedSite: any): TokenStorage {
    localStorage.setItem('selected_site_' + this.getVendorId(), JSON.stringify(selectedSite));
    return this;
  }

  setUserSchedulerView(selectedView: any): TokenStorage {
    localStorage.setItem('selected_view_' + this.getVendorId(), selectedView);
    return this;
  }

  setUserSchedulerDate(selectedDate: any): TokenStorage {
    localStorage.setItem('selected_date_' + this.getVendorId(), selectedDate);
    return this;
  }

  setMenuPrivileges(privileges: any): TokenStorage {
    localStorage.setItem('menu_privileges', JSON.stringify(privileges));
    return this;
  }

  getMenuPrivileges() {
    return JSON.parse(localStorage.getItem('menu_privileges'));
  }

  getSelectedClient() {
    // let vendorId = this.getVendorId();
    return JSON.parse(localStorage.getItem('selected_client_' + this.getVendorId()));
  }

  setSelectedClient(selectedClient: any): TokenStorage {
    localStorage.setItem('selected_client_' + this.getVendorId(), JSON.stringify(selectedClient));
    return this;
  }

  clearSelectedClient(): any {
    localStorage.removeItem('selected_client_' + this.getVendorId());
  }

  setCurrentUser(currentUser: any): TokenStorage {
    sessionStorage.setItem('current_user', JSON.stringify(currentUser));
    return this;
  }

  setDesktopVersion(isDesktop: boolean): any {
    localStorage.setItem('desktop_version', isDesktop.toString());
  }

  IsDesktopVersion() {
    const isDesktop = localStorage.getItem('desktop_version');
    if (isDesktop != null) {
      return isDesktop === 'true';
    } else {
      return false;
    }
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('current_user'));
  }

  getNewAppointmentDuration() {
    const newApptDuration = localStorage.getItem('new_appt_duration');
    if (newApptDuration != null) {
      return newApptDuration;
    } else {
      return 5;
    }
  }

  setNewAppointmentDuration(newApptDuration: any) {
    localStorage.setItem('new_appt_duration', newApptDuration);
  }

  getFillFormAccess() {
    return sessionStorage.getItem('FillFormAccess');
  }

  setFillFormAccess(): TokenStorage {
    sessionStorage.setItem('FillFormAccess', 'TRUE');
    return this;
  }

  getCacheProviderSchedule(providerId: number, siteId: number) {
    return JSON.parse(sessionStorage.getItem('pSchedule' + '_' + providerId + '_' + siteId));
  }

  setCacheProviderSchedule(providerId: number, siteId: number, providerSchedule: any) {
    sessionStorage.setItem('pSchedule' + '_' + providerId + '_' + siteId, JSON.stringify(providerSchedule));
  }
}
