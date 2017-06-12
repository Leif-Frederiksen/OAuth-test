import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ContactsService } from "app/contacts.service";
import { GoogleLoginService } from 'app/googlelogin.service';

import { IContact, GoogleContact } from './contact';


declare const gapi: any;
var auth2:any;

// var dataService;

// Enter an API key from the Google API Console:
//   https://console.developers.google.com/apis/credentials
var apiKey = 'AIzaSyDotkSrVFENRJmg-rZmKY7I9eBU-5qB04o ';
// Enter the API Discovery Docs that describes the APIs you want to
// access. In this example, we are accessing the People API, so we load
// Discovery Doc found here: https://developers.google.com/people/api/rest/
var discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"];
// Enter a client ID for a web application from the Google API Console:
//   https://console.developers.google.com/apis/credentials?project=_
// In your API Console project, add a JavaScript origin that corresponds
//   to the domain where you will be running the script.
var clientId = '759552122503-jpd2b3c7l9c5qk0kt65kss8o6jpi8ak3.apps.googleusercontent.com';
// Enter one or more authorization scopes. Refer to the documentation for
// the API or https://developers.google.com/people/v1/how-tos/authorizing
// for details.
var scopes = 'https://www.google.com/m8/feeds/contacts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private ref: ChangeDetectorRef, private _dataService: ContactsService, private loginService: GoogleLoginService) {
      console.log("dataservice: " + this._dataService);
      // dataService = this._dataService;
  }

  ngAfterViewInit(): void {
    this.loginService.handleClientLoad(apiKey,discoveryDocs,clientId,scopes);
  }

  title = 'app works!!!';

  contacts = new Array<IContact>();
  
  authorizeButton = document.getElementById('authorize-button');
  signoutButton = document.getElementById('signout-button');

  login() {
    this.loginService.signIn();
  }

  logout() {
    this.loginService.signOut();
    this.contacts = null;
  }

  showStatus() {
    console.log("Signed in? " + gapi.auth2.getAuthInstance().isSignedIn.get());
    console.log("Contacts: " + this.contacts);
  }

  getData() {
    this._dataService.getContacts().then(
          contacts =>  this.assignContactsArray(contacts) 
      );
  }

  assignContactsArray(contacts) {
    this.contacts = contacts;
    this.ref.detectChanges();

  }

  isSignedIn():boolean {
    return this.loginService.isSignedIn();
  }

}