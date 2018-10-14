import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	formdata:  AngularFireList<any>;
	fdata: Observable<any[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public afDB: AngularFireDatabase) {
  		this.formdata = this.afDB.list('/formdata');
  		this.fdata = this.formdata.valueChanges();
  }
submitForm(){

  let prompt = this.alertCtrl.create({
    title: 'New Non-Routine Task',
    message: "Enter the following task information.",
    inputs: [
      {
        name: 'title',
        placeholder: 'Engineer'
      },
      {
      	name: 'Description',
      	placeholder: 'Description'
      },
      {
      	name: 'PartsRequired',
      	placeholder: 'Parts required'
      },
      {
      	name: 'details',
      	placeholder: 'Details'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {

          const newform = this.formdata.push({});
 
          newform.set({
            id: newform.key,
            Engineer: data.title,
            Description: data.Description,
            PartsRequired: data.PartsRequired,
            Details: data.details
          });
        }
      }
    ]
  });
  prompt.present();
}
}
