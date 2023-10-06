import { LightningElement,wire} from 'lwc';
//this funtion is used to extract field value
import { getFieldValue} from 'lightning/uiRecordApi';
//car__c schema
import NAME_FIELD from '@salesforce/schema/Car__c.Name';
import PICTURE_URL_FIELD from '@salesforce/schema/Car__c.Picture_URL__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';
import MSRP_FIELD from '@salesforce/schema/Car__c.MSRP__c';
import FUEL_TYPE from '@salesforce/schema/Car__c.Fuel_Type__c';
import SEATS_FIELD from '@salesforce/schema/Car__c.Number_of_Seats__c';
import CONTROL_FIELD from '@salesforce/schema/Car__c.Control__c';

export default class CarCard extends LightningElement {
//Id of Car__c to display
recordId="a0B2w00000C4hHiEAJ";

//exposing fields to make them available in the template
categoryField = CATEGORY_FIELD;
makeField = MAKE_FIELD;
msrpField=MSRP_FIELD;
fuelField=FUEL_TYPE;
seatsField=SEATS_FIELD;
controlField=CONTROL_FIELD;


//car fields displayed with specific format
carName;
carPictureUrl;
handleRecordLoaded(event){
    const {records} = event.detail;
    const recordData = records[this.recordId]
    this.carName=getFieldValue(recordData,NAME_FIELD);
    this.carPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD);
}
}