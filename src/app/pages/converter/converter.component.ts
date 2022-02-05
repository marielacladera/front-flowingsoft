import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeZoneResponse } from 'src/app/response/timeZoneResponse';
import { RequestTime } from 'src/app/_model/requestTime';
import { RequestService } from 'src/app/_service/_service/request.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent {

  public time: string;
  public timeZone: string;
  private requestTime: RequestTime;

  constructor(
    private requestService: RequestService,
    private snackBar: MatSnackBar,
  ) { 
    this.requestTime = new RequestTime();
  }

  public convertTime(): void {
    if(this.isPlusOrMinus()){
      if(this.isIntoRangeTimeZone()){
        this.requestTime.time = this.time;
        this.requestTime.timezone = this.timeZone;
        this.sendData();
      } else {
        this.openSnackBar('The number must be range between 0 and 12', 'Ok');
      }
    }else{
        this.openSnackBar('The number must be have the character + or -', 'Ok');
    } 
  }

  private isPlusOrMinus(): boolean {
    return (this.timeZone.charAt(0) == '+' || this.timeZone.charAt(0) == '-') ? true : false;
  }

  private isIntoRangeTimeZone(): boolean {
    const numberTimeZone: string = this.timeZone.substring(1);
    return (parseInt(numberTimeZone) >= 0 && parseInt(numberTimeZone) <= 12) ? true : false; 
  }

  private sendData(): void {
    this.requestService.calculateTime(this.requestTime).subscribe((response: TimeZoneResponse) =>{
      this.time = response.response.time; 
      this.timeZone = response.response.timezone;
      this.openSnackBar('Succesfull convert', 'Ok');
    });
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
