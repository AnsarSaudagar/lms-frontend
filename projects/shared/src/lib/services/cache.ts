import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cache {
  private cache = new Map<string, [Date | null, HttpResponse<any>]>();
}
