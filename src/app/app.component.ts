import { Component } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';

import { BpmComponent } from './bpm.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [
    'app.component.css',
    'utils.css',
  ],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    BpmComponent,
  ]
})
export class AppComponent {
}
