import { ExerciseModel } from './exercise.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { UiService } from '../shared/ui.service';

@Injectable()
export class TrainingService {

    constructor(private db: AngularFirestore,
        private uiService: UiService) {}

    private availableExercises: any[] = [];
    private runningExercise: ExerciseModel;
    exerciseChanged = new BehaviorSubject<ExerciseModel>(null);
    exercisesChanged = new BehaviorSubject<ExerciseModel[]>([]);
    completedExercisesChanged = new BehaviorSubject<ExerciseModel[]>([]);

    getAvailableExercises() {
        this.uiService.isLoadingChanged.next(true);
        return this.db.collection('availableExercises')
        .snapshotChanges().pipe(map(docArray  => {
          return docArray.map(document => {
            return {
              id: document.payload.doc.id,
              name: document.payload.doc.data()['name'],
              duration: document.payload.doc.data()['duration'],
              calories: document.payload.doc.data()['calories'],
            };
          });
        })).subscribe((exercises: ExerciseModel[]) => {
            this.uiService.isLoadingChanged.next(false);
            this.availableExercises = [...exercises];
            this.exercisesChanged.next([...exercises]);
        }, (error) => {
            this.uiService.isLoadingChanged.next(false);
            this.uiService.openSnackBar('Some error occured while fetching exercises. Please try again', '');
            this.availableExercises = [null];
            this.exercisesChanged.next([null]);
        });
    }

    startTheExercise(exerciseId: string) {
        this.runningExercise = this.availableExercises.filter(val => val.id === exerciseId)[0];
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise() {
        this.uiService.isLoadingChanged.next(true);
        this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'Completed'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({...this.runningExercise, duration: (this.runningExercise.duration * progress) / 100, calories: (this.runningExercise.calories * progress) / 100, date: new Date(), state: 'Cancelled'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getCompletedExercises() {
        this.uiService.isLoadingChanged.next(true);
        this.db.collection('finishedExercises').snapshotChanges()
            .pipe(map(docArray => {
                return docArray.map(document => {
                    return {
                        id: document.payload.doc.id,
                        name: document.payload.doc.data()['name'],
                        duration: document.payload.doc.data()['duration'],
                        calories: document.payload.doc.data()['calories'],
                        date: document.payload.doc.data()['date'],
                        state: document.payload.doc.data()['state']
                    }
                })
            })).subscribe((completedExercises) => {
                this.uiService.isLoadingChanged.next(false);
                this.completedExercisesChanged.next([...completedExercises]);
            }, (error) => {
                this.uiService.isLoadingChanged.next(false);
                this.uiService.openSnackBar('Some error occured while fetching completed exercises. Please try again', '');
                this.availableExercises = [null];
                this.exercisesChanged.next([null]);
            });
    }

    private addDataToDatabase(exercise: ExerciseModel) {
        this.db.collection('finishedExercises').add(exercise).then(() => {
            this.uiService.isLoadingChanged.next(false);
        }).catch((error)=> {
            this.uiService.isLoadingChanged.next(false);
            this.uiService.openSnackBar('Some error occured while updating the record. Please try again.', '');
        });
    }
}