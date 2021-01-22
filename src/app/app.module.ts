import { CreateCardComponent } from './cards/component/create-card/create-card.component';
import { CardResolver } from './cards/cards.resolver';
import { CardsListComponent } from './cards/component/cards-list/cards-list.component';
import { EffectsModule } from '@ngrx/effects';
import { CardModule } from './cards/cards.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InMemCardService } from './in.memory-http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';


const routes = [
  {
    path: 'cards',
    component: CardsListComponent,
    resolve: {
      cards: CardResolver
    }
  },
  {path: 'create-card', component: CreateCardComponent},
  {path: '**', redirectTo: 'create-card'}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatSidenavModule,
    MatButtonModule,
    CardModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemCardService),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({maxAge: 25}),
  ],
  exports:[

    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],

  providers: [CardResolver,InMemCardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
