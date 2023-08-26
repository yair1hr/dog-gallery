import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dogs-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DogDetailsComponent implements OnInit {
  @Input() _img: string;

  constructor() {
    this._img = '';
  }

  public get img(): string { return this._img; }
  public set img(value: string) { this._img = value; }

  ngOnInit(): void {
  }

}
