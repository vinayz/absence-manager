import { Component } from '@angular/core';
import members from '../json_files/members.json';
import absences from '../json_files/absences.json';
import { createEvent, download } from './event-download.utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor() { }
  absentMembers = [];             //To store merged data from members and absences json files
  absentMembersData = [];         // To store absentMembers array's data
  memberObj;
  userName;
  absentType;


  ngOnInit() {
    this.mapMembersWithAbsences();
  }

  //Map members with their absences and return an array of objects
  mapMembersWithAbsences() {

    absences.payload.forEach(element => {
      let member = members.payload.find(item => (item.userId === element.userId));
      this.memberObj = element;
      this.memberObj.name = member.name;
      this.absentMembers.push(this.memberObj);
    });

    this.absentMembersData = this.absentMembers;

  }

  //This will return an array as per input
  search() {

    this.absentMembers = this.absentMembersData;

    if (this.userName && (this.absentType && (this.absentType != 'all'))) {

      this.absentMembers = this.absentMembers.filter(item => {
        return ((item.type == this.absentType) && (item.name.toLowerCase() == this.userName.toLowerCase()));
      });

    } else if (this.userName) {

      this.absentMembers = this.absentMembers.filter(item => {
        return (item.name.toLowerCase() == this.userName.toLowerCase());
      });

    } else if (this.absentType && (this.absentType != 'all')) {

      this.absentMembers = this.absentMembers.filter(item => {
        return (item.type == this.absentType);
      });

    } else {

      this.absentMembers = this.absentMembersData;

    }

  };

  //Download the iCalender file
  download() {
    const content = createEvent(this.absentMembers);
    download('crew.ics', content);
  };

};
