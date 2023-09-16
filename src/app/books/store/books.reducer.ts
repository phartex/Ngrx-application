import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { booksFetchAPISuccess, saveBookAPISuccess } from "./books.action";

export const initialState : ReadonlyArray<Book>= [];

export const bookReducer = createReducer(
    initialState,
    on(booksFetchAPISuccess, (state,{allBooks}) => {
      return allBooks
    }),
    on(saveBookAPISuccess,(state,{response})=>{
      let newState = [...state];
      newState.unshift(response);
      return newState
    })
)