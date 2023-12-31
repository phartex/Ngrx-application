import { createAction, props } from "@ngrx/store";
import { Book } from "./book";



export const invokeBooksApi = createAction(
    "[Books API] invoke books fetch API"
)

export const booksFetchAPISuccess = createAction(
    "[Books API] books fetch api success ",
    props<{allBooks:Book[]}>()
)

export const invokeSaveBookAPI = createAction(
    "[Books API] invoke save book API",
    props<{payload:Book}>()
)

export const saveBookAPISuccess = createAction(
    "[Books API] save book api success",
    props<{response:Book}>()
)