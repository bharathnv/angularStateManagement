import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExerciseModel } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UiService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  displayedColumns: any[] = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<ExerciseModel>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  private loadingSubscription: Subscription;
  private isLoading: boolean = false;

  constructor(private trainingSource: TrainingService,
    private uiService: UiService) { }

  ngOnInit() {
    this.trainingSource.getCompletedExercises();
    this.trainingSource.completedExercisesChanged.subscribe((pastExercises: ExerciseModel[]) => {
      this.dataSource.data = pastExercises;
    });

    this.loadingSubscription = this.uiService.isLoadingChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filterOnText(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
