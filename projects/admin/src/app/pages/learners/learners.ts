import { Component } from '@angular/core';
import { Badge, BadgeTone } from '../../core/components/ui/badge/badge';
import { LEARNERS } from '../../data/learners.data';
import { Learner } from '../../models/learner.model';

const STATUS_TONE: Record<Learner['status'], BadgeTone> = {
  active: 'success',
  inactive: 'neutral',
  flagged: 'warning',
};

@Component({
  selector: 'app-learners',
  imports: [Badge],
  templateUrl: './learners.html',
})
export class LearnersComponent {
  learners = LEARNERS;
  protected readonly STATUS_TONE = STATUS_TONE;
}
