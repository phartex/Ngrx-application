import { createAction, props } from "@ngrx/store";
import { Book } from "./book";



export const invokeBooksApi = createAction(
    "[Books API] invoke books fetch API"
)

export const booksFetchAPISuccess = createAction(
    "[Books API] books fetch api success ",
    props<{allBooks:Book[]}>()
)
