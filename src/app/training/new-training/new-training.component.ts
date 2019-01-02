import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { ExerciseModel } from '../exercise.model';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  availableExercises: ExerciseModel[];
  private loadingSubscription: Subscription;
  private isLoading: boolean = false;

  constructor(private trainingService: TrainingService,
    private uiService: UiService) { }

  ngOnInit() {
    this.trainingService.getAvailableExercises();
    this.trainingService.exercisesChanged.subscribe((exercises: ExerciseModel[]) => {
      this.availableExercises = exercises;
    });

    this.loadingSubscription = this.uiService.isLoadingChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  selectExercise(exercise: ExerciseModel) {
    this.trainingService.startTheExercise(exercise.id);
  }

  fetchAgain() {
    this.trainingService.getAvailableExercises();
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
