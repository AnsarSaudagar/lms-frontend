import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivityLog } from '../../../models/dashboard.model';

@Component({
  selector: 'app-recent-activity',
  imports: [RouterLink],
  templateUrl: './recent-activity.html',
})
export class RecentActivity {
  @Input({ required: true }) logs: ActivityLog[] = [];
}
