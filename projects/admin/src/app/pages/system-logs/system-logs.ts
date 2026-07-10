import { Component } from '@angular/core';
import { RECENT_ACTIVITY } from '../../data/dashboard.data';

@Component({
  selector: 'app-system-logs',
  templateUrl: './system-logs.html',
})
export class SystemLogsComponent {
  logs = RECENT_ACTIVITY;
}
