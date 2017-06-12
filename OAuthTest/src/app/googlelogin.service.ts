import { Injectable }              from '@angular/core';

declare const gapi: any;

@Injectable()
export class GoogleLoginService {

apiKey:string;
discoveryDocs: string[];
clientId: string;
scope:string;

constructor() {}

 handleClientLoad(apiKey:string,discoveryDocs: string[],clientId: string,scope:string) {
    // Load the API client and auth2 library
    this.apiKey = apiKey;
    this.discoveryDocs = discoveryDocs;
    this.clientId = clientId;
    this.scope = scope;
     gapi.load('client:auth2', this.initClient.bind(this));
    //  gapi.load('client:auth2','v1')
    //  .then(
    //      function() { 
    //          console.log("this.initClient");
    //      }
    // );
}

 initClient() {
     let thisObject = this;
    gapi.client.init(
        {
            apiKey: this.apiKey,
            discoveryDocs: this.discoveryDocs,
            clientId: this.clientId,
            scope: this.scope
        }
    ).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(thisObject.updateSigninStatus);
        // Handle the initial sign-in state.
        thisObject.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });

  }
  
  updateSigninStatus(isSignedIn:boolean) {

  }

  public getGapi():any {
      return gapi;
  }

  public signIn() {
    return gapi.auth2.getAuthInstance().signIn(
                                                    {
                                                        ux_mode: 'popup',
                                                        prompt: 'consent', 
                                                    /* prompt: 'select_account', */ 
                                                        scope: this.scope
                                                    }
                                                );
  }

  public signOut() {
    return gapi.auth2.getAuthInstance().signOut();
  }

 public isSignedIn():boolean {
    return gapi.auth2 ? gapi.auth2.getAuthInstance().isSignedIn.get() : false;
 }

}