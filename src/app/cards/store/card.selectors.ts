import { CardState } from './card.reducers';
import { Card } from '../model/card.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll, selectIds } from './card.reducers';

export const cardFeatureSelector = createFeatureSelector<CardState>('cards');

export const getAllCards = createSelector(
  cardFeatureSelector,
  selectAll
);

export const areCardsLoaded = createSelector(
  cardFeatureSelector,
  state => state.cardsLoaded
);
