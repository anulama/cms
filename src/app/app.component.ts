import { Component } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'cms';
  // title = 'cms';
  selectedFeature: string = 'documents';

  switchView(selectedFeature: string){
    this.selectedFeature = selectedFeature;
  }


}
