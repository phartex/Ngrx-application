import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { BooksService } from '../books.service';
import {
  booksFetchAPISuccess,
  invokeBooksApi,
  invokeSaveBookAPI,
  saveBookAPISuccess,
} from './books.action';
import { selectBooks } from './books.selector';

@Injectable()
export class BooksEffect {
  constructor(private action$: Actions, private bookService: BooksService,
    private appStore: Store<Appstate>, private store: Store) {}

  loadAllBooks$ = createEffect(() =>
    this.action$.pipe(
      ofType(invokeBooksApi),      
      withLatestFrom(this.store.pipe(select(selectBooks))),
      switchMap(([,booksFromStore]) => {
        if(booksFromStore.length > 0){
            return EMPTY
        }
        return this.bookService
          .getBooks()
          .pipe(map((data) => booksFetchAPISuccess({ allBooks: data })));
      })
    )
  );

  saveNewBook$ = createEffect(() =>
    this.action$.pipe(
      ofType(invokeSaveBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
        return this.bookService
          .createBook(action.payload)
          .pipe(map((data) =>
          {
            this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}})) 
            return saveBookAPISuccess({ response: data })
          }
          ));
      })
    )
  );
}
