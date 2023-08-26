import { Component, OnInit, ViewChild } from '@angular/core';
import { DogGalleryService } from './dog-gallery.service';
import { MatAccordion } from '@angular/material/expansion';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subject, combineLatest, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'dogs-dog-gallery',
  templateUrl: './dog-gallery.component.html',
  styleUrls: ['./dog-gallery.component.scss']
})
export class DogGalleryComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  private _countResults: FormControl;
  private _dogBreeds: FormControl;
  private _breeds: Observable<any[]>;
  private _byBreed: Observable<any[]>

  constructor(private dogGalleryService: DogGalleryService) {
    this._destroy$ = new Subject<boolean>();
    this._countResults = new FormControl('', [Validators.required, Validators.max(50), Validators.min(1)])
    this._dogBreeds = new FormControl('', []);
    this._breeds =  new Observable();
    this._byBreed = new Observable();
  }

  public get countResults(): FormControl { return this._countResults; }
  public set countResults(value: FormControl) { this._countResults = value; }
  public get dogBreeds(): FormControl { return this._dogBreeds; }
  public set dogBreeds(value: FormControl) { this._dogBreeds = value; }
  public get byBreed(): Observable<any[]> { return this._byBreed; }
  public set byBreed(value: Observable<any[]>) { this._byBreed = value; }
  public get breeds(): Observable<any[]> { return this._breeds; }
  public set breeds(value: Observable<any[]>) { this._breeds = value; }

  ngOnInit(): void {
    this.breeds = this.dogGalleryService.getDogBreedsData();
    this.subscribeToCountChange();
    this.subscribeToBreedChange();
  }

  subscribeToCountChange() {
    combineLatest([this.countResults.valueChanges, this.countResults.statusChanges])
    .pipe(
      debounceTime(500),
      takeUntil(this._destroy$)
    )
    .subscribe(([values, status])=>{
      if(status === 'VALID') {
        this.dogGalleryService.count = values;
        this.byBreed = this.dogGalleryService.getByBreedData();
      }
    });
    this.countResults.setValue(50);
    this.countResults.markAsTouched();
  }

  subscribeToBreedChange() {
    this.dogBreeds.valueChanges
    .pipe(takeUntil(this._destroy$))
    .subscribe(breed => {
      this.dogGalleryService.breed = breed;
      this.byBreed = this.dogGalleryService.getByBreedData();
    });
  }

  ngOnDestroy () {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

}
