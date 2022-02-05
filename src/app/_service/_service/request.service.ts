import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeZoneResponse } from 'src/app/response/timeZoneResponse';
import { RequestTime } from 'src/app/_model/requestTime';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  public calculateTime(request: RequestTime): Observable<TimeZoneResponse> {
    return this.http.post<TimeZoneResponse>(environment.HOST, request);
  }
}
