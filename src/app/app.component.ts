import { Component } from '@angular/core';
import { PluginsService } from 'src/shared/services/plugins.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InfinityBook';
  constructor(private pluginService:PluginsService){
    if(!this.pluginService.loaded) pluginService.load();
  }
}
