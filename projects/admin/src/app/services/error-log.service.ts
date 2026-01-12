import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ErrorLogService {

    private ERROR_LOG_API_URL = environment.API_URL + '/error-logger';
  
  constructor(private http: HttpClient){}

  getAllErrorLogs(){
    return this.http.get(this.ERROR_LOG_API_URL);
  }
}
