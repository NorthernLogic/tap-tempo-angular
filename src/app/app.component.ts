import { APP_SHELL_DIRECTIVES } from '@angular/app-shell';
import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

import { BpmComponent } from './bpm.component';
import { TapSoundComponent } from './tapSound.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `
<md-toolbar color="primary">
  Tap Tempo
  <span class="fill-remaining-space"></span>

  <div [ngSwitch]="soundEnabled" (click)="soundEnabled = !soundEnabled">
    <md-icon *ngSwitchCase="true">volume_up</md-icon>
    <md-icon *ngSwitchCase="false">volume_mute</md-icon>
  </div>
  <md-toolbar-row>
    <tap-bpm #bpm></tap-bpm>
  </md-toolbar-row>
  <tap-sound *shellNoRender [interval]="bpm.bpmStats ? bpm.bpmStats.avgMs : null" [playing]="soundEnabled"></tap-sound>
</md-toolbar>

<div class="content">
  <p class="instructions">To determine the BPM, tap the button to the rhythm of the music.</p>

  <div class="tap-area" (click)="bpm.tap()">
    <button md-fab>Tap</button>
  </div>

  <div class="brand">
    <a href="http://wearenorthern.com/" target="_blank">
      <img src="images/nl-mark.png" height="72" alt="Northern Logic logo">
    </a>
  </div>
</div>
  `,
  styles: [`
.fill-remaining-space {
  flex: 1 1 auto;
}`,
    `
.content {
  padding: 8px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 128px);
  text-align: center;
}

.instructions {
  flex: 1 0;
}

.tap-area {
  flex: 2 0;
}

[md-fab] {
  width: 128px;
  height: 128px;
}

.brand {
  margin: 1em auto;
}`,
  ],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    BpmComponent,
    TapSoundComponent,
    APP_SHELL_DIRECTIVES,
  ],
  providers: [
    MdIconRegistry,
    HTTP_PROVIDERS,
  ]
})
export class AppComponent {
  private soundEnabled = true;
}
