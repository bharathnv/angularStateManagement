import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TrainingService } from '../../training.service';

@Component({
  selector: 'app-stop-timer',
  templateUrl: './stop-timer.component.html',
  styleUrls: ['./stop-timer.component.scss']
})
export class StopTimerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private passedData: any, private trainingService: TrainingService) { }

  ngOnInit() {}
}
