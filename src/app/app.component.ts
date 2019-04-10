import { Component } from '@angular/core';
import { PluginsService } from 'src/shared/services/plugins.service';
import { Plugins } from 'protractor/built/plugins';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InfinityBook';
  constructor(private pluginService:PluginsService){
    if(!pluginService.loaded) pluginService.load();
  }
}
