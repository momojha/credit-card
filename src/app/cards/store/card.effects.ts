import { cardActionTypes, cardsLoaded, updateCard } from './card.actions';
import { CardService } from './../services/card.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar'
import { of } from 'rxjs';

@Injectable()
export class CardEffects {

  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActionTypes.loadCards),
      concatMap(() => this.cardService.getAllCards()),
      map(cards => cardActionTypes.cardsLoaded({cards}))
    )
  );

  createCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActionTypes.createCard),
      concatMap((action) => this.cardService.createCard(action.card)),
      tap(()=>{
        this.snackBar.open("Card Created Succesfully", "Created", {
          duration: 2000
        });
      }),
      catchError(err => {
        this.snackBar.open("Card Create Failed", "Create Failed", {
          duration: 2000
        });
        return of([])
      }),
      tap(() => this.router.navigateByUrl('/cards'))
    ),
    {dispatch: false}
  );

  deleteCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActionTypes.deleteCard),
      concatMap((action) => this.cardService.deleteCard(action.cardId)),
      tap(()=>{
        this.snackBar.open("Card Deleted Succesfully", "Deleted", {
          duration: 2000
        });
      }),
      catchError(err => {
        this.snackBar.open("Card Delete Failed", "Delete Failed", {
          duration: 2000
        });
        return of([])
      })
    ),
    {dispatch: false}
  );

  updateCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActionTypes.updateCard),
      concatMap((action) => this.cardService.updateCard(action.update.id, action.update.changes)),
      tap(()=>{
        this.snackBar.open("Card Updated Succesfully", "Updated", {
          duration: 2000
        });
      }),
      catchError(err => {
        this.snackBar.open("Card Update Failed", "Update Failed", {
          duration: 2000
        });
        return of([])
      })
    ),
    {dispatch: false}
  );

  constructor(private cardService: CardService, private actions$: Actions, private router: Router,private snackBar: MatSnackBar) {}
}
