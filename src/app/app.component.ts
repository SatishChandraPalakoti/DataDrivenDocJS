import { Component } from '@angular/core';
import { external } from './external';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public test : external[]=[];
  title = 'D3Js';
  constructor(){
    var input =[{
      "alpha":"satish",
      "beta":24
    },
    {
      "alpha":"chandra",
      "beta":27
    }
  ]

  input.forEach((val: external)=>{

    console.log("Pushing "+ JSON.stringify(val))
    this.test.push(val);
    console.log("Value of test now is ")
    console.log(this.test)
  })

  }
}
