import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: 'sign-in-dialog.component.html',
  styleUrls: ['sign-in-dialog.component.scss'],
})
export class SignInDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SignInDialogComponent>,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: this.fb.control(null, Validators.required),
      password: this.fb.control(null, Validators.required),
    });
  }

  onSignIn() {
    const username = this.form.get('username')?.value as string;
    const password = this.form.get('password')?.value as string;
    this.authService
      .signIn(username, password)
      .then(() => this.dialogRef.close())
      .catch((error) => console.error(error));
  }
}
