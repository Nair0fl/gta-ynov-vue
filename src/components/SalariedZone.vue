<template>
<b-container class="SalariedZone">
    <b-row>
      <b-col><h1>Bonjour {{user.firstname +" "+ user.lastname}}</h1></b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
            <b-card no-body>
                <b-tabs card>
                  <b-tab  title="Informations Personnelles" active>
                    <b-form>
                      <b-form-group id="mailAdresseLabel"
                            label="Email address:"
                            label-for="mailAdresseInput"
                            description="We'll never share your email with anyone else.">
                            <b-form-input id="mailAdresseInput"
                                type="email"
                                v-model="user.mail"
                                required
                                placeholder="Enter email">
                        </b-form-input>
                      </b-form-group>
      <b-form-group id="AdresseLabel"
                    label="Adresse:"
                    label-for="AdresseInput">
        <b-form-input id="AdresseInput"
                      type="text"
                      v-model="user.adress.street"
                      required
                      placeholder="Enter rue">
        </b-form-input>
      </b-form-group>
            <b-form-group id="ZipCodeLabel"
                    label="ZipCode:"
                    label-for="ZipCodeInput">
        <b-form-input id="ZipCodeInput"
                      type="text"
                      v-model="user.adress.zipCode"
                      required
                      placeholder="Enter rue">
        </b-form-input>
      </b-form-group>
            <b-form-group id="numberLabel"
                    label="number:"
                    label-for="numberInput">
        <b-form-input id="numberInput"
                      type="text"
                      v-model="user.adress.number"
                      required
                      placeholder="Enter rue">
        </b-form-input>
      </b-form-group>
      <b-form-group id="telLabel"
                    label="Téléphone :"
                    label-for="telInput">
        <b-form-input id="telInput"
                      v-model="user.tel">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
                  </b-tab>
                  <b-tab title="Planning" >
                    <b-row>
                      <b-col cols="12">
                        <full-calendar :config="config" :events="events"/>
                      </b-col>
                    </b-row>
                  </b-tab>
                  <b-tab title="Tableau de Bord">
                    <b-form-select v-model="selectedContract">
      <option v-for="(contrat) in contracts" v-bind:key = "contrat.id" :value="{id:contrat.id,startDate:contrat.startDate,endDate:contrat.endDate,weeklyHour:contrat.weeklyHour}"> 
        Contract {{contrat.id}}
      </option>
      </b-form-select>
      <p>Solde de Congé : {{soldeConge}} jour(s)</p>
     <p>Contrat</p>
     <div v-if="selectedContract">
    <p>Date debut : {{selectedContract.startDate}}</p>
      <p>Date fin : {{selectedContract.endDate}}</p>
     <p>Heure hebdomadaires : {{selectedContract.weeklyHour}}</p>
     </div>

    <p>Contrat Actuel</p>
     <div v-if="currentContrat">
    <p>Date debut : {{currentContrat.startDate}}</p>
      <p>Date fin : {{currentContrat.endDate}}</p>
     <p>Heure hebdomadaires : {{currentContrat.weeklyHour}}</p>
     </div>
                  </b-tab>
                  <b-tab title="Demande">
                  </b-tab>
                </b-tabs>
            </b-card>
            </b-col>
    </b-row>
</b-container>
</template>

<script>
import jsonUser from "../../data/users1.json";
import ContractUser from "../../data/contrat.json";
import VacationUser from "../../data/vacations.json";
import moment from "moment";
import Planning from "../../data/planning.json";
import Absence from "../../data/absence.json";

import { FullCalendar } from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.css";

export default {
  name: "Salaried",
  data() {
    return {
      user: jsonUser,
      contracts: ContractUser,
      selectedContract: null,
      currentContrat: null,
      soldeConge: null,
      vacation: VacationUser,
      absence: Absence,
      planning: Planning,
      selectedTypeDemande: null,
      config: {
        defaultView: "month"
      },
      events: []
    };
  },
  components: {
    FullCalendar
  },
  mounted: function() {
    this.$nextTick(function() {
      for (var vacance in this.vacation.vacation) {
        this.events.push({
          title: "Vacances",
          start: moment(this.vacation.vacation[vacance].startDate),
          end: moment(this.vacation.vacation[vacance].endDate).add("24", "h")
        });
      }
      for (let date in this.absence.absence) {
        for (let hour in this.absence.absence[date].hours)
          this.events.push({
            title: this.absence.absence[date].Type,
            start: moment(
              moment(
                this.absence.absence[date].date +
                  this.planning.hours[date].hours[hour].start,
                "MM-DD-YYYYHH:mm"
              )
            ),
            end: moment(
              moment(
                this.absence.absence[date].date +
                  this.planning.hours[date].hours[hour].end,
                "MM-DD-YYYYHH:mm"
              )
            )
          });
      }
      for (var date in this.planning.hours) {
        for (var hour in this.planning.hours[date].hours)
          this.events.push({
            title: "Heure de travail",
            start: moment(
              moment(
                this.planning.hours[date].date +
                  this.planning.hours[date].hours[hour].start,
                "MM-DD-YYYYHH:mm"
              )
            ),
            end: moment(
              moment(
                this.planning.hours[date].date +
                  this.planning.hours[date].hours[hour].end,
                "MM-DD-YYYYHH:mm"
              )
            )
          });
      }
      for (var contrat in this.contracts) {
        var end = moment(this.contracts[contrat].endDate).format("DD-MM-YYYY");
        if (
          moment(end, "DD-MM-YYYY")
            .fromNow()
            .includes("in")
        ) {
          this.currentContrat = this.contracts[contrat];
          var year = moment().format("YYYY");
          var yeardiff = moment().diff(moment("01-01-" + year), "month");
          let diff;
          if (yeardiff >= 0) {
            diff = yeardiff;
          } else {
            diff = moment().diff(
              moment(this.contracts[contrat].startDate),
              "months"
            );
          }
          this.soldeConge = Math.ceil(diff * 2.08) - this.vacation.totalPrit;
        }
      }
    });
  },
  methods: {}
};
</script>
