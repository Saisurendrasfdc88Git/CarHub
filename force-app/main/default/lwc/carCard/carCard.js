import { LightningElement,wire} from 'lwc';
//this funtion is used to extract field value
import { getFieldValue} from 'lightning/uiRecordApi';
//navigate to recorddetails page
import {NavigationMixin} from 'lightning/navigation';
//car__c schema
import CAR_OBJECT from '@salesforce/schema/Car__c';
import NAME_FIELD from '@salesforce/schema/Car__c.Name';
import PICTURE_URL_FIELD from '@salesforce/schema/Car__c.Picture_URL__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';
import MSRP_FIELD from '@salesforce/schema/Car__c.MSRP__c';
import FUEL_TYPE from '@salesforce/schema/Car__c.Fuel_Type__c';
import SEATS_FIELD from '@salesforce/schema/Car__c.Number_of_Seats__c';
import CONTROL_FIELD from '@salesforce/schema/Car__c.Control__c';
//lightning message channel

import { subscribe,MessageContext, unsubscribe } from 'lightning/messageService';
import CARS_SELECTED_MESSAGE from '@salesforce/messageChannel/CarSelected__c';

export default class CarCard extends NavigationMixin(LightningElement) {
//Id of Car__c to display
//recordId="a0B2w00000C4hHiEAJ";

@wire(MessageContext)
messageContext

//exposing fields to make them available in the template
categoryField = CATEGORY_FIELD;
makeField = MAKE_FIELD;
msrpField=MSRP_FIELD;
fuelField=FUEL_TYPE;
seatsField=SEATS_FIELD;
controlField=CONTROL_FIELD;


//car fields displayed with specific format
recordId;
carName;
carPictureUrl;
carSelectionSubscription;

//subscription reference for carseleted

handleRecordLoaded(event){
    const {records} = event.detail;
    const recordData = records[this.recordId]
    this.carName=getFieldValue(recordData,NAME_FIELD);
    this.carPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD);
}
connectedCallback(){
    this.subscribeHandler()
}
subscribeHandler(){
    this.carSelectionSubscription = subscribe(this.messageContext,CARS_SELECTED_MESSAGE,(message)=>this.handleCarSelected(message))
}

handleCarSelected(message){
    //console.log('subcribe',carId);
    this.recordId = message.carId;
    //console.log('from cardComponent',recordId,'carid from subscribe',recordId);
}
disconnectedCallback(){
unsubscribe(this.carSelectionSubscription)
this.carSelectionSubscription=null;
}

handleNavigateToRecord(){
    this[NavigationMixin.Navigate]({
        type:'standard__recordPage',
        attributes:{
            recordId:this.recordId,
            objectApiName:CAR_OBJECT.objectApiName,
            actionName:'view'
        }
    })
}
}