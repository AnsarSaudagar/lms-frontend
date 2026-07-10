import { Component } from '@angular/core';
import { ButtonDirective } from '../../core/components/ui/button/button';
import { Icon } from '../../core/components/ui/icon/icon';
import { StatTile } from '../../core/components/ui/stat-tile/stat-tile';
import { PENDING_ACTIONS, RECENT_ACTIVITY, STAT_CARDS, WEEKLY_ACTIVE_LEARNERS } from '../../data/dashboard.data';
import { PendingActions } from './pending-actions/pending-actions';
import { RecentActivity } from './recent-activity/recent-activity';
import { WeeklyChart } from './weekly-chart/weekly-chart';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonDirective, Icon, StatTile, WeeklyChart, PendingActions, RecentActivity],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  statCards = STAT_CARDS;
  weeklyActiveLearners = WEEKLY_ACTIVE_LEARNERS;
  pendingActions = PENDING_ACTIONS;
  recentActivity = RECENT_ACTIVITY;
}
