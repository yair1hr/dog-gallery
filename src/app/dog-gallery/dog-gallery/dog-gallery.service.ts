import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogGalleryService {
  private _count: number;
  private _breed: string;

  constructor(private http: HttpClient) {
    this._count = 0;
    this._breed = '';
  }

  public get count(): number { return this._count; }
  public set count(value: number) { this._count = value; }
  public get breed(): string { return this._breed; }
  public set breed(value: string) { this._breed = value; }

  getDogBreedsData() {
    return this.getHttpData('https://dog.ceo/api/breeds/list/all')
    .pipe(
      map(breeds => { return this.getEmptyBreeds(breeds.message) }),
      tap(breeds => console.log("getByBreedData Map data" , breeds))
    );

  }

  getByBreedData(): Observable<any> {
    if(this.breed && this.count) {
      return this.getHttpData('https://dog.ceo/api/breed/' + this.breed + '/images/random/' + this.count)
      .pipe(
        map(byBreed => byBreed.message),
        tap(byBreed => console.log("getByBreedData Map data" , byBreed))
      )
    } else {
      return new Observable();
    }

  }

  getHttpData(url: string): Observable<any> {
    return this.http.get(url);
  }

  private getEmptyBreeds(data: any) {
    const breeds: any[] = [];
    let key: keyof typeof data;
    for(key in data) {
      !data[key].length ? breeds.push(key) : '';
    }
    return breeds;
  }

}
