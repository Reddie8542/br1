import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/services/auth/auth.service';
import { SignInDialogComponent } from './sign-in-dialog.component';

describe('SignInDialogComponent', () => {
  let auth: AuthService;
  let component: SignInDialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [SignInDialogComponent],
      providers: [AuthService, { provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }],
    });
    auth = TestBed.inject(AuthService);
    component = TestBed.createComponent(SignInDialogComponent).componentInstance;
    component.ngOnInit();
  });

  it('should interact with AuthService when clicking "Sign In"', () => {
    spyOn(auth, 'signIn').and.returnValue(new Promise((resolve, reject) => resolve()));
    expect(auth.signIn).not.toHaveBeenCalled();
    component.onSignIn();
    expect(auth.signIn).toHaveBeenCalled();
  });
});
