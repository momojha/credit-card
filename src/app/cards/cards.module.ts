import { CardEffects } from './store/card.effects';
import { CardService } from './services/card.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { cardReducer } from './store/card.reducers';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import { CardsListComponent } from './component/cards-list/cards-list.component';
import { CreateCardComponent } from './component/create-card/create-card.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CardsListComponent,
    CreateCardComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatButtonModule,
    RouterModule,

    CommonModule,
    FormsModule,
    StoreModule.forFeature('cards', cardReducer),
    EffectsModule.forFeature([CardEffects])
  ],
  providers: [CardService],
  bootstrap: [],
  exports:[
    CardsListComponent,
    CreateCardComponent
  ]
})
export class CardModule { }
