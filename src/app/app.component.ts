import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

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
    MD_ICON_DIRECTIVES,
    BpmComponent,
  ],
  providers: [
    MdIconRegistry,
    HTTP_PROVIDERS,
  ]
})
export class AppComponent {
  private soundEnabled = true;

  public toggleSound(bpmController: BpmComponent) {
    this.soundEnabled = !this.soundEnabled;
    bpmController.soundSubject.next(this.soundEnabled);
  }
}
