import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";


@Component({
  template: `
     <h2>{{message}}.</h2>
  `
})
export class GlobalErrorComponent {
  message = ""

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.message = params.get('message') ?? 'An unknown error occurred';
    });
  }


}
