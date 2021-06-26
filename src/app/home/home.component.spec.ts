import { TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/services/auth.service';
import { adminTab, HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let auth: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule],
      declarations: [HomeComponent],
      providers: [
        AuthService,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    });
    auth = TestBed.inject(AuthService);
    component = TestBed.createComponent(HomeComponent).componentInstance;
  });

  it('should hide admin tab if unauthenticated', () => {
    let hasAdminTab = component.tabs.find((tab) => tab.route === adminTab.route) != null;
    expect(hasAdminTab).toBeFalse();
    component.onAuthStateChanges(false);
    hasAdminTab = component.tabs.find((tab) => tab.route === adminTab.route) != null;
    expect(hasAdminTab).toBeFalse();
  });

  it('should show admin tab if authenticated', () => {
    let hasAdminTab = component.tabs.find((tab) => tab.route === adminTab.route) != null;
    expect(hasAdminTab).toBeFalse();
    component.onAuthStateChanges(true);
    hasAdminTab = component.tabs.find((tab) => tab.route === adminTab.route) != null;
    expect(hasAdminTab).toBeTrue();
  });
});
