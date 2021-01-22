import { Card } from './../model/card.model';
import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';


export const loadCards = createAction(
  '[Cards List] Load Cards via Service',
);

export const cardsLoaded = createAction(
  '[Cards Effect] Cards Loaded Successfully',
  props<{cards: Card[]}>()
);

export const createCard = createAction(
  '[Create Card Component] Create Card',
  props<{card: Card}>()
);

export const deleteCard = createAction(
  '[Cards List Operations] Delete Card',
  props<{cardId: string}>()
);

export const updateCard = createAction(
  '[Cards List Operations] Update Card',
  props<{update: Update<Card>}>()
);

export const cardActionTypes = {
  loadCards,
  cardsLoaded,
  createCard,
  deleteCard,
  updateCard
};
