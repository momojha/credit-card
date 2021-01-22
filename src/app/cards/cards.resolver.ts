import { areCardsLoaded } from './store/card.selectors';
import { loadCards, cardsLoaded } from './store/card.actions';
import { AppState } from './../store/reducers/index';
import { Card } from './model/card.model';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';

@Injectable()
export class CardResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
    .pipe(
        select(areCardsLoaded),
        tap((cardsLoaded) => {
          if (!cardsLoaded) {
            this.store.dispatch(loadCards());
          }

        }),
        filter(cardsLoaded => cardsLoaded),
        first()
    );
  }
}
