import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let auth: AuthService;
  let guard: AuthGuard;
  let mockRoute: any = { snapshot: {} };
  let mockRouteState: any = { snapshot: {}, url: '/cookies' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthGuard, AuthService],
    });
    auth = TestBed.inject(AuthService);
    guard = TestBed.inject(AuthGuard);
  });

  it('should redirect an unauthenticated user to the root route', () => {
    spyOnProperty(auth, 'authenticated$', 'get').and.returnValue(of(false));
    (guard.canActivate(mockRoute, mockRouteState) as Observable<boolean | UrlTree>).subscribe((result) =>
      expect(result).toBeInstanceOf(UrlTree)
    );
  });
});
