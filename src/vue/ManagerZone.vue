<template>
<b-container class="ManagerZone">
    <b-row>
        <b-col cols="12"	sm="12"	md="12"	lg="12"	xl="12">
            <b-card no-body>
                <b-tabs card>
                    <b-tab  title="Ajouter salarié" active>
                            <b-col cols="12"	sm="5"	md="12"	lg="12"	xl="12">
                                <b-form-group id="firstname"
                                label="Prénom:"
                                label-for="firstnameInput"
                                description="We'll never share your email with anyone else.">
                                    <b-form-input id="firstnameInput"
                                    type="text"
                                    v-model="NewUser.firstname"
                                    required
                                    placeholder="Enter firstname"></b-form-input>
                                </b-form-group>
                            </b-col>
                                                        <b-col cols="12"	sm="5"	md="12"	lg="12"	xl="12">

                            <b-form-group id="lastname"
                                label="Nom:"
                                label-for="lastnameInput">
                                <b-form-input id="lastnameInput"
                                    type="text"
                                    v-model="NewUser.lastname"
                                    required
                                    placeholder="Enter lastname"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col 	sm="5">
                                <b-form-group id="mailAdresseLabel"
                                label="Email address:"
                                label-for="mailAdresseInput"
                                description="We'll never share your email with anyone else.">
                                    <b-form-input id="mailAdresseInput"
                                    type="email"
                                    v-model="NewUser.mail"
                                    required
                                    placeholder="Enter email"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col  cols="12"	sm="5"	md="12"	lg="12"	xl="12">
                                <b-form-group id="telLabel"
                                label="Téléphone :"
                                label-for="telInput">
                                    <b-form-input id="telInput"
                                    v-model="NewUser.tel">
                                    </b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12"	sm="5"	md="12"	lg="12"	xl="12">
                                <b-form-group id="AdresseLabel"
                                label="Adresse:"
                                label-for="AdresseInput">
                                    <b-form-input id="AdresseInput"
                                    type="text"
                                    v-model="NewUser.adress.street"
                                    required
                                    placeholder="Enter rue">
                                    </b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12"	sm="5"	md="12"	lg="12"	xl="12">
                                <b-form-group id="ZipCodeLabel"
                                label="ZipCode:"
                                label-for="ZipCodeInput">
                                    <b-form-input id="ZipCodeInput"
                                    type="text"
                                    v-model="NewUser.adress.zipCode"
                                    required
                                    placeholder="Enter rue">
                                    </b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12"	sm="5"	md="12"	lg="12"	xl="12">
                                <b-form-group id="numberLabel"
                                label="number:"
                                label-for="numberInput">
                                    <b-form-input id="numberInput"
                                    type="text"
                                    v-model="NewUser.adress.number"
                                    required
                                    placeholder="Enter rue">
                                    </b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-button type="submit" v-on:click="newSalarie" variant="primary">Submit</b-button>
                        
                    </b-tab>
                    <b-tab  title="Planning Équipe">
                        <b-form-select v-model="selectedSalarie" @input="refresh">
                          <option v-for="(salarie) in salarieResponsable" v-bind:key = "salarie.id" :value="salarie"> {{salarie.firstname}}</option>
                          </b-form-select>
                            <full-calendar :config="config" :events="events" />
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-col>
    </b-row>
</b-container>
</template>
<script>
import salarie from "../../data/manager/salaries.json";
import moment from "moment";

const uuidv4 = require('uuid/v4');
let salarieResponsable=salarie.users
export default {
  name: "Manager",
  data() {
    return {
        events:[],
        config: {
        defaultView: 'month',
        },
        selectedSalarie:null,
        salarieResponsable:salarieResponsable,
        NewUser:{
            
            "id":uuidv4(),
            "firstname":null,
            "lastname":null,
            "type":"Salaried",
            "birthDate":null,
            "adress":{
                "zipCode":null,
                "street": null,
                "number":null
            },
            "mail":null,
            "tel":null
        }
    };
  },
  methods:{
      newSalarie(){
             this.salarieResponsable.push(this.NewUser)
             this.NewUser.id=uuidv4()
             this.NewUser.firstname=null
             this.NewUser.lastname=null
             this.NewUser.birthDate=null
             this.NewUser.adress.zipCode=null
             this.NewUser.adress.street=null
             this.NewUser.adress.number=null
             this.NewUser.mail=null
             this.NewUser.tel=null
      },
      refresh(){
          this.events=[]
          var jour=moment(this.selectedSalarie.contratEnCours.startDate,"MM-DD-YYYY");
          while(jour.isBefore(moment(this.selectedSalarie.contratEnCours.endDate,'MM-DD-YYYY'))){
            var inPresence=this.selectedSalarie.planning.presence.findIndex((elem)=>{
                return Object.keys(elem)[0]===jour.format("MM-DD-YYYY")
            } )
            if(inPresence===-1){
                var inVacation=this.selectedSalarie.planning.vacations.findIndex((elem)=>{
                    return Object.keys(elem)[0]===jour.format("MM-DD-YYYY")
                })
                if(inVacation===-1){
                    var inAbsence=this.selectedSalarie.planning.absences.findIndex((elem)=>{
                        return Object.keys(elem)[0]===jour.format("MM-DD-YYYY")
                    })
                    if(inAbsence===-1){
                        if(jour.day()<6&&jour.day()>0){
                        this.events.push({    
                            title:"Horraire matin",
                            start:moment(jour.format("MM-DD-YYYY")+this.selectedSalarie.planning.presenceprevu.startMorning,"MM-DD-YYYYHH:mm"),
                            end:moment(jour.format("MM-DD-YYYY")+this.selectedSalarie.planning.presenceprevu.endMorning,"MM-DD-YYYYHH:mm"),
                        })
                        this.events.push({    
                            title:"Horraire après-Midi",
                            start:moment(jour.format("MM-DD-YYYY")+this.selectedSalarie.planning.presenceprevu.startAfternoon,"MM-DD-YYYYHH:mm"),
                            end:moment(jour.format("MM-DD-YYYY")+this.selectedSalarie.planning.presenceprevu.endAfternoon,"MM-DD-YYYYHH:mm"),
                        })
                        }
                    }else{
                        let jourencours=this.selectedSalarie.planning.absences[inAbsence][jour.format("MM-DD-YYYY")]
                        this.events.push({    
                            title:jourencours.Type,
                            start:moment(jour.format("MM-DD-YYYY")+this.selectedSalarie.planning.presenceprevu.startMorning,"MM-DD-YYYYHH:mm"),
                            end:moment(jour.format("MM-DD-YYYY")+this.selectedSalarie.planning.presenceprevu.endMorning,"MM-DD-YYYYHH:mm"),
                            color: '#FF0000',
                        })
                        this.events.push({    
                            title:jourencours.Type,
                            start:moment(jour.format("MM-DD-YYYY")+this.selectedSalarie.planning.presenceprevu.startMorning,"MM-DD-YYYYHH:mm"),
                            end:moment(jour.format("MM-DD-YYYY")+this.selectedSalarie.planning.presenceprevu.endMorning,"MM-DD-YYYYHH:mm"),
                            color: '#FF0000',
                        })
                        jour.add(1,"day")
                    }
                }else{
                    let jourencours=this.selectedSalarie.planning.vacations[inVacation][jour.format("MM-DD-YYYY")]
                    while(jour.isBefore(jourencours.endDate)||jour.isSame(jourencours.endDate)){
                    this.events.push({    
                        title:"Vacances",
                        start:moment(jour.format("MM-DD-YYYY")+this.selectedSalarie.planning.presenceprevu.startMorning,"MM-DD-YYYYHH:mm"),
                        end:moment(jour.format("MM-DD-YYYY")+this.selectedSalarie.planning.presenceprevu.endMorning,"MM-DD-YYYYHH:mm"),
                            color: '#378006',

                    })
                    this.events.push({    
                        title:"Vacances",
                        start:moment(jour.format("MM-DD-YYYY")+this.selectedSalarie.planning.presenceprevu.startAfternoon,"MM-DD-YYYYHH:mm"),
                        end:moment(jour.format("MM-DD-YYYY")+this.selectedSalarie.planning.presenceprevu.endAfternoon,"MM-DD-YYYYHH:mm"),
                            color: '#378006',

                    })
                    jour.add(1,"day")
                    }
                }
            }else{
                let jourencours=this.selectedSalarie.planning.presence[inPresence][jour.format("MM-DD-YYYY")]
                this.events.push({    
                    title:"Horraire matin",
                    start:moment(jour.format("MM-DD-YYYY")+jourencours.startMorning,"MM-DD-YYYYHH:mm"),
                    end:moment(jour.format("MM-DD-YYYY")+jourencours.endMorning,"MM-DD-YYYYHH:mm"),
                })
                this.events.push({    
                    title:"Horraire après-Midi",
                    start:moment(jour.format("MM-DD-YYYY")+jourencours.startAfternoon,"MM-DD-YYYYHH:mm"),
                    end:moment(jour.format("MM-DD-YYYY")+jourencours.endAfternoon,"MM-DD-YYYYHH:mm"),
                })
                //jour.add(1,"day")

            }
                        jour.add(1,"day")

          }
    }
  }
};
</script>