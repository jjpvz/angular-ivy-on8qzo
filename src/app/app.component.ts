import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, VERSION } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  of,
  debounceTime,
  switchMap,
  tap,
  distinctUntilChanged,
} from 'rxjs';

interface obs {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  form: FormGroup;
  search: FormControl;
  obs$: Observable<obs[]> = of([
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
  ]);
  x: obs[];
  se$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  res$ = combineLatest([this.se$, this.obs$]).pipe(
    map(([term, items]) =>
      items.filter((item) => term === '' || item.name === term)
    )
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.search = new FormControl();

    this.form = this.fb.group({
      name: ['', Validators.required],
      layouts: this.fb.array([
        this.fb.group({
          layoutName: ['', Validators.required],
          duration: ['', Validators.required],
          content: [''],
        }),
      ]),
    });
    this.search.valueChanges.pipe().subscribe((x) => this.se$.next(x));

    this.obs$.subscribe((x) => (this.x = x));

    this.layouts.valueChanges.subscribe(() => {
      console.log('changed');
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.layoutControls,
      event.previousIndex,
      event.currentIndex
    );
  }

  onSubmit() {
    if (this.form.valid && this.layouts.valid) {
      console.log('submitted');
    } else {
      console.log('fill in form');
    }
  }

  get layouts() {
    return this.form.get('layouts') as FormArray;
  }

  get layoutControls(): AbstractControl<FormGroup>[] {
    return (this.form.get('layouts') as FormArray).controls;
  }

  addLayout() {
    if (this.layouts.valid) {
      this.layouts.push(
        this.fb.group({
          layoutName: ['', Validators.required],
          duration: ['', Validators.required],
          content: [''],
        })
      );
    }
  }
}
