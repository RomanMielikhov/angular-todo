import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  of,
  Subject,
  switchMap,
  takeUntil,
  Observable,
  debounceTime,
  Subscription,
  distinctUntilChanged,
} from 'rxjs';

import { IUser } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user/user.service';
import { IMainUserInfo } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'email', 'delete'];
  users$: Observable<IMainUserInfo[]> = of([]);

  user: IUser | null = null;

  subscription$ = new Subscription();
  destroy$ = new Subject();

  isSubmitting: boolean = false;

  shareForm: FormGroup = this.formBuilder.group({
    user: ['', [Validators.required]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute
  ) {
    this.users$ = this.shareForm.get('user')!.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      switchMap((name) => this.userService.getByName(name))
    );
  }

  get userId(): string {
    return this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.subscription$ = this.userService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  public displayFn(data: any): string {
    return typeof data === 'object' ? `${data.name}(${data.email})` : data;
  }

  public onSubmit(): void {
    const {
      user: { id, email, name },
    } = this.shareForm.value;
    console.log(this.shareForm.value);

    this.userService.share({ id, email, name } as IMainUserInfo).subscribe();
  }

  public remove(id: number): void {
    this.userService.unshare(id).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
