<template>
<b-container>
  <b-container v-if="modification">
    <b-alert show variant="warning">
      Envoyer modification au manager 
      <b-button  variant="warning" @click.prevent="toValidation" >
       OK
      </b-button>
      </b-alert>
  </b-container>
  <full-calendar :config="config" :events="events" @event-drop="EventsChange"/>
</b-container>
</template>

<script>
import _ from 'lodash';

import planning from "../../data/salarie/planning.json";
import moment from "moment";
import "fullcalendar/dist/fullcalendar.css";
import vacationUser from "../../data/salarie/vacations.json";
import absence from "../../data/salarie/absence.json";

let horraires = [];
let eventsAttenteValidation = [];
let tovalidate=[]
let vacations=[]
let absences=[]

planning.hours.forEach((element) => {
  const key = Object.keys(element)[0];
  const elemMorning = {
    title: key+ ` Morning`,
    start: moment(key+element[key].startMorning,"MM-DD-YYYYHH:mm"),
    end: moment(key+element[key].endMorning,"MM-DD-YYYYHH:mm"),
    editable:false

  };
  const elemAfternoon = {
    title: key+` Afternoon`,
    start: moment(key+element[key].startAfternoon,"MM-DD-YYYYHH:mm"),
    end: moment(key+element[key].endAfternoon,"MM-DD-YYYYHH:mm"),
    editable:false

  };
  horraires.push(elemMorning, elemAfternoon);
});

vacationUser.vacations.forEach((element)=>{
  const elementVacance={
    title:'Vacance',
    start:moment(element.startDate,"MM-DD-YYYY"),
    end:moment(element.endDate,"MM-DD-YYYY"),
    color: '#378006',
editable:false
  }
  vacations.push(elementVacance)
})

absence.absences.forEach((element)=>{
  const elementAbsence={
    title:element.Type,
    start:moment(element.start,"MM-DD-YYYYHH:mm"),
    end:moment(element.end,"MM-DD-YYYYHH:mm"),
    color: '#FF0000',
editable:false
  }
  absences.push(elementAbsence)
})

let allevent=horraires.concat(absences).concat(vacations).concat(eventsAttenteValidation).concat(tovalidate)

export default {
  name: 'calendar',
  data() {
    return {
      modification : null,
      events:allevent,
      config: {
        defaultView: 'month',
      },
    };
  },
  props:['contrat'],
  computed:{
  },
  mounted: function() {
    let actuel=moment()
    while(actuel.isBefore(moment(this.contrat.endDate,"MM-DD-YYYY"))){
      if(actuel.day()<5){
        allevent.push({    title:"Horraire prévu matin",
    start:moment(actuel.format("MM-DD-YYYY")+"09:00","MM-DD-YYYYHH:mm"),
    end:moment(actuel.format("MM-DD-YYYY")+"12:00","MM-DD-YYYYHH:mm"),
    })
     allevent.push({    title:"Horraire prévu après-midi",
    start:moment(actuel.format("MM-DD-YYYY")+"13:00","MM-DD-YYYYHH:mm"),
    end:moment(actuel.format("MM-DD-YYYY")+"17:00","MM-DD-YYYYHH:mm"),
    })
      }
      actuel.add(1,"days")
    }
  },
  methods: {
    EventsChange(valReturn) {
      let key = valReturn.title
      let baseEven = this.events.filter(x => x.title === key)[0]||tovalidate.filter(x => x.title === key)[0]
      if(baseEven.start != valReturn.start || baseEven.end != valReturn.end){
        let element = { title : key , start : valReturn.start, end : valReturn.end, color: '#FF7F50'	}
        _.remove(eventsAttenteValidation, x => x.title === key)
        _.remove(tovalidate, x => x.title === key)
        _.remove(horraires, x => x.title === key)
        _.remove(this.events, x => x.title === key)
        this.events.push(element)
        eventsAttenteValidation.push(element)
        this.modification=true
      }
    },
    toValidation(){
      //Send for validention to the API
      this.modification=false

      eventsAttenteValidation.forEach((element)=>{
        let event={ title : element.title , start : element.start, end : element.end, color: '#00BFFF'	}
        _.remove(tovalidate, x => x.title === element.title)
        _.remove(this.events, x => x.title === element.title)
        tovalidate.push(event)
        this.events.push(event)
      })
    }
  },
};

</script>