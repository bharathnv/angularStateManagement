import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTimerComponent } from './stop-timer/stop-timer.component';
import { TrainingService } from '../training.service';
import { ExerciseModel } from '../exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  progress: number = 0;
  timer: any;
  currentExercise: ExerciseModel;

  constructor(private dialog: MatDialog,
    private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.exerciseChanged.subscribe((exercise) => {
      this.currentExercise = exercise;
      if (exercise) {
        this.startOrResumeTimer();
      }
    });
  }

  startOrResumeTimer() {
    const step = this.currentExercise.duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress === 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  stopTimer() {
    clearInterval(this.timer);
    let dialogRef = this.dialog.open(StopTimerComponent, {
      data: {progress: this.progress}
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data === true) {
        this.trainingService.cancelExercise(this.progress);
        this.progress = 0;
        this.trainingService.exerciseChanged.next(null);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
