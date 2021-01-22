import { getAllCards } from './../../store/card.selectors';
import { cardActionTypes } from './../../store/card.actions';
import { AppState } from './../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from './../../model/card.model';
import { CardService } from './../../services/card.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsListComponent implements OnInit {

  cards$: Observable<Card[]>;

  isUpdateActivated = false;

  minDate:Date=new Date()
  form = this.fb.group({
    id: [],
    cardNumber: ['', Validators.required],
    cardHolder: ['', Validators.required],
    expirationDate: ['', [Validators.required]],
    securityCode: ['', [Validators.pattern('(^[0-9]{3}$)')]],
    amount: ['',[Validators.required,Validators.min(0)]]

  });

  constructor(private cardService: CardService, private store: Store<AppState>,private fb:FormBuilder) { }

  ngOnInit() {
    this.cards$ = this.store.select(getAllCards);
  }

  deleteCard(cardId: string) {
    this.store.dispatch(cardActionTypes.deleteCard({cardId}));
  }

  showUpdateForm(card: Card) {
    this.form.patchValue(card);
    this.isUpdateActivated = true;
  }

  updateCard(form) {
    let {value,invalid}=form;
    const update: Update<Card> = {
      id: value.id,
      changes: value
    };

    this.store.dispatch(cardActionTypes.updateCard({update}));

    this.isUpdateActivated = false;
  }
}
