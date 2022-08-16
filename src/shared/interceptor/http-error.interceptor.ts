import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

  constructor(public router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((exception) => {
        console.log('error is intercept')
        // TO Do :  Here we could add logging to DB
        // TO Do :  differnt message or error pages could be added for error handling.

        this.router.navigateByUrl(`/error/${exception.error.ErrorMessage}`);
        return throwError(exception.message);
      })
    )
  }
}
 // To Do : Write Unit test for this component.
