import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemCardService implements InMemoryDbService {
  createDb() {
    let cards = [

    ];
    return {cards};
  }
}
