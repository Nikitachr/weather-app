import { Component, Input, OnInit } from '@angular/core';
import { IconService } from '../services/icon.service';

@Component({
  selector: 'app-features-board',
  templateUrl: './features-board.component.html',
  styleUrls: ['./features-board.component.scss']
})
export class FeaturesBoardComponent implements OnInit {
  @Input() item: any;
  constructor(public icon: IconService) { }

  ngOnInit() {
  }

}
