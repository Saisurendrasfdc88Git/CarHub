import { LightningElement,wire } from 'lwc';
import getCars from '@salesforce/apex/CarController.getCars';
import { subscribe,MessageContext } from 'lightning/messageService';
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/CarsFiltered__c';
export default class CarTileList extends LightningElement {

    cars;
    error;
    filters={};
    carFiltersSubscription;
    @wire(getCars,{filters:'$filters'})
    carsHandler({data,error}){
        if(data){
        console.log(data);
        this.cars=data;
        console.log(this.cars);
        }
       if(error){
            this.error=error;
            console.error(error);
        }
    }

    @wire(MessageContext)
    messageContext

    connectedCallback(){
        this.subscribeHandler()
    }
    subscribeHandler(){
        this.carFiltersSubscription = subscribe(this.messageContext,CARS_FILTERED_MESSAGE,(message)=>this.handleFilterChanges(message))
    }

    handleFilterChanges(message){
        console.log(message.filters)
        this.filters={...message.filters}
    }
}