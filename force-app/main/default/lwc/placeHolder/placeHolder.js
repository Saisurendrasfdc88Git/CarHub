import { LightningElement,api } from 'lwc';
import PLACE_HOLDER_IMAGE from '@salesforce/resourceUrl/placeholderimage'; 

export default class PlaceHolder extends LightningElement {


    @api message;
    placeholderUrl=PLACE_HOLDER_IMAGE;
    
}