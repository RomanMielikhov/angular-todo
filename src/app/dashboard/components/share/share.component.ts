import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShareService } from 'src/app/shared/services/share/share.service';
import { IShare } from 'src/app/shared/interfaces/share.interface';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';

const ELEMENT_DATA: IShare[] = [
  {
    email: 'alsmdal@asda.com',
    name: 'Hydrogen',
    read: true,
    write: true,
    share: true,
  },
  {
    email: 'alsmdal@asda.com1',
    name: 'sdfsdfsd',
    read: true,
    write: true,
    share: true,
  },
  {
    email: 'alsmdal@asda.com2',
    name: 'sdfsdfs',
    read: true,
    write: true,
    share: true,
  },
  {
    email: 'alsmdal@asda.com3',
    name: 'we12',
    read: true,
    write: true,
    share: true,
  },
  {
    email: 'alsmdal@asda.com4',
    name: 'fasfas',
    read: true,
    write: true,
    share: true,
  },
];

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  displayedColumns: string[] = ['name', 'read', 'write', 'share'];
  users$: Observable<IUser[]> = of([]);
  dataSource: IShare[] = [];

  isSubmitting: boolean = false;

  shareForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    read: [false],
    write: [false],
    share: [true],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly shareService: ShareService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute
  ) {
    this.users$ = this.shareForm.get('name')!.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap((name) => this.userService.getByName(name))
    );
    this.users$.subscribe((v) => console.log(v));
  }

  get userId(): string {
    return this.route.snapshot.params['id'];
  }

  displayFn(data: any) {
    return typeof data === 'object' ? `${data.name}(${data.email})` : data;
  }

  ngOnInit(): void {
    this.shareService.getShareList(this.userId).subscribe(
      (v) =>
        (this.dataSource = Object.entries(v).map(([email, data]) => ({
          ...data,
          email,
        })))
    );
  }

  public onSubmit(): void {
    console.log(this.shareForm.value);

    const data: IShare = {
      ...this.shareForm.value,
      email: 'asdasdad123@gmail.com',
      uid: '12312412412412412',
    };

    this.shareService.addShareUser(this.userId, data).subscribe((v) => {
      this.dataSource.push(data);
    });
  }
}
