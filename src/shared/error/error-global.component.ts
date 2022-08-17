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
      console.log("Error from Server :" + params.get('message'));

      // To Do : message can be logged and save in DB for debugging purpose.

      this.message = 'An unknown error occurred';
    });
  }

  // TO Do : This page can be made more fancier
  // To Do : Write Unit test for this component.


}
