import { Card } from './../../model/card.model';
import { createCard } from './../../store/card.actions';
import { AppState } from './../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCardComponent implements OnInit {

  minDate:Date=new Date()
  form = this.fb.group({
    id: [],
    cardNumber: ['', Validators.required],
    cardHolder: ['', Validators.required],
    expirationDate: ['', [Validators.required]],
    securityCode: ['', [Validators.pattern('(^[0-9]{3}$)')]],
    amount: ['',[Validators.required,Validators.min(0)]]

  });

  constructor(private store: Store<AppState>,private fb:FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(form) {
    let {value,invalid}=form;
    console.log(value);

    if (invalid) {
      return;
    }


    const card: Card = {

      id: uuid.v4(),
      cardNumber: value.cardNumber,
      cardHolder: value.cardHolder,
      expirationDate:value.expirationDate,
      securityCode:value.securityCode,
      amount:value.amount
    };
    this.store.dispatch(createCard({card}));

  }
}
