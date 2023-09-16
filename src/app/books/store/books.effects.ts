import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { BooksService } from "../books.service";
import { booksFetchAPISuccess, invokeBooksApi } from "./books.action";




@Injectable()

export class BooksEffect {
    constructor(private action$: Actions, private bookService: BooksService) {

    }

    loadAllBooks$ = createEffect(() =>
        this.action$.pipe(
            ofType(invokeBooksApi),
            switchMap(()=>{
                return this.bookService.getBooks().pipe(map((data)=> 
                booksFetchAPISuccess({allBooks : data})
                )
                )
            })
        )

    )
}