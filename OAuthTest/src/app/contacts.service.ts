
import { Injectable }              from '@angular/core';
import { IContact, GoogleContact } from './contact';

import { GoogleLoginService } from './googlelogin.service';

@Injectable()
export class ContactsService {

    constructor (private _loginService: GoogleLoginService) {}

    contacts = new Array<IContact>();


    getContacts(startFrom:number = 1): Promise<IContact[]> {
        console.log("Start from: " + startFrom);
        var request = this._loginService.getGapi().client.request({
            'method': 'GET',
            'path': '/m8/feeds/contacts/default/full?alt=json&v=3.0&start-index=' + startFrom,
            'params': {}
        });

        // let contacts = new Array<IContact>();

        return request.then((data) => this.parseResult(this.contacts,data));
        
        // function(data) {
                // for (let contact of data.result.feed.entry) {
                //     console.log("Contact: " + contact);
                //     let newContact:IContact = new GoogleContact();

                //     newContact.source = "Google";
                //     newContact.id = contact.id['$t'];
                //     newContact.title = contact.title['$t'];
                //     newContact.email = contact["gd$email"] ? contact["gd$email"][0]['address'] : "none";
                //     // newContact.name = contact['gd$name']["gd$fullName"];
                //     contacts.push(newContact);
                // }

                // // Check if there is a "next page"

                // for (let link of data.result.feed.link) {
                //     if (link.rel == "next") {
                //         console.log("there is more");
                //         let startFrom = getParameterByName(link.href,"start-index");
                //         return 
                //     }
                // }



                // return contacts;
        // });
    }

    parseResult(contacts,data:any): Promise<IContact[]> {
         for (let contact of data.result.feed.entry) {
                console.log("Contact: " + contact);
                let newContact:IContact = new GoogleContact();

                newContact.source = "Google";
                newContact.id = contact.id['$t'];
                newContact.title = contact.title['$t'];
                newContact.email = contact["gd$email"] ? contact["gd$email"][0]['address'] : "none";
                // newContact.name = contact['gd$name']["gd$fullName"];
                contacts.push(newContact);
                console.log("Pushing: " + newContact.title + " length: " + contacts.length)
            }

            // Check if there is a "next page"

            let foundNext = false;
            for (let link of data.result.feed.link) {
                if (link.rel == "next") {
                    console.log("there is more");
                    let startFrom = Number(getParameterByName("start-index",link.href,));
                    console.log("link: " + link.href + " start from: " + startFrom);
                    foundNext = true;
                    return this.getContacts(startFrom);
                }
            }
            let promise = Promise.resolve(contacts);
            return promise;
    }
}

function getParameterByName(name, url) {

    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}