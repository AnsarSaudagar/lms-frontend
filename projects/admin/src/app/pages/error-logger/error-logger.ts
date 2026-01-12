import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag'
@Component({
  selector: 'app-error-logger',
  imports: [CommonModule, ButtonModule, Tag],
  templateUrl: './error-logger.html',
  styleUrl: './error-logger.css',
})
export class ErrorLogger {
selectedError: any = null;

  // Mock data from your DB
  errorLogs = [
    {
      id: 'ERR-4002',
      type: 'DatabaseConnectionError',
      message: 'Connection pool exhausted while fetching user session.',
      severity: 'danger',
      timestamp: 'Just now',
      userId: 'USR_882',
      ip: '192.168.1.45',
      browser: 'Chrome 120',
      stack: 'Error: Connection pool limit reached\n  at Pool.acquire (pg-pool.js:145:12)\n  at Query.execute (db.service.ts:88:4)'
    },
    {
      id: 'ERR-4003',
      type: 'ReferenceError',
      message: 'variable "courseId" is not defined',
      severity: 'warning',
      timestamp: '5 mins ago',
      userId: 'USR_112',
      ip: '10.0.0.8',
      browser: 'Safari Mobile',
      stack: 'ReferenceError: courseId is not defined\n  at CourseComponent.save (course.component.ts:122:15)'
    }
  ];

  getSeverity(severity: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (severity) {
      case 'danger': return 'danger';
      case 'warning': return 'warn';
      default: return 'info';
    }
  }

  getMeta(err: any) {
    return [
      { label: 'Timestamp', value: err.timestamp },
      { label: 'User ID', value: err.userId },
      { label: 'IP Address', value: err.ip },
      { label: 'Browser', value: err.browser }
    ];
  }

  markResolved() {
      // Logic to update DB status
      console.log('Error resolved:', this.selectedError.id);
  }
}
