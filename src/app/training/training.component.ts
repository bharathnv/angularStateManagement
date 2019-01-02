import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { ExerciseModel } from './exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  private ongoingTraining: boolean = false;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.exerciseChanged.subscribe((exercise: ExerciseModel)=> {
      if (exercise) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    });
  }

}
