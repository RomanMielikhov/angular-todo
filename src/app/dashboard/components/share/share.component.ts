import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  of,
  switchMap,
  Observable,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

import { ShareService } from 'src/app/shared/services/share/share.service';
import { UserService } from 'src/app/shared/services/user/user.service';

import { IShare } from 'src/app/shared/interfaces/share.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'read', 'write', 'delete'];
  users$: Observable<IUser[]> = of([]);
  dataSource: IShare[] = [];

  isSubmitting: boolean = false;

  shareForm: FormGroup = this.formBuilder.group({
    user: ['', [Validators.required]],
    read: [false],
    write: [false],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly shareService: ShareService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute
  ) {
    this.users$ = this.shareForm.get('user')!.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap((name) => this.userService.getByName(name))
    );
  }

  get userId(): string {
    return this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getShareList();
  }

  public displayFn(data: any): string {
    return typeof data === 'object' ? `${data.name}(${data.email})` : data;
  }

  private getShareList(): void {
    this.shareService
      .getShareList(this.userId)
      .subscribe((v) => (this.dataSource = Object.values(v)));
  }

  public onSubmit(): void {
    const { user, ...res } = this.shareForm.value;
    this.shareService
      .addShareUser(this.userId, {
        ...res,
        user: { name: user.name, email: user.email, uid: user.uid },
      })
      .subscribe(() => this.getShareList());
  }

  public remove(item: IShare): void {
    this.shareService
      .deleteShareUser(this.userId, item)
      .subscribe(() => this.getShareList());
  }
}
