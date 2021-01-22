import { Card } from '../model/card.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { cardActionTypes, cardsLoaded } from './card.actions';

export interface CardState extends EntityState<Card> {
  cardsLoaded: boolean;
}

export const adapter: EntityAdapter<Card> = createEntityAdapter<Card>();

export const initialState = adapter.getInitialState({
  cardsLoaded: false
});

export const cardReducer = createReducer(
  initialState,

  on(cardActionTypes.cardsLoaded, (state, action) => {
    return adapter.addMany(
      action.cards,
      {...state, cardsLoaded: true}
    );
  }),

  on(cardActionTypes.createCard, (state, action) => {
    return adapter.addOne(action.card, state);
  }),

  on(cardActionTypes.deleteCard, (state, action) => {
    return adapter.removeOne(action.cardId, state);
  }),

  on(cardActionTypes.updateCard, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
