import { Card } from './../model/card.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class CardService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>('/api/cards');
  }

  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>('/api/cards', card);
  }

  deleteCard(cardId: string): Observable<any> {
    return this.http.delete('/api/cards/' + cardId);
  }

  updateCard(cardId: string | number, changes: Partial<Card>): Observable<any> {
    return this.http.put('/api/cards/' + cardId, changes);
  }
}
