<template>
<b-container class="SalariedZone">
  <div id="nav">
            <b-navbar  toggleable="md" type="dark" variant="info">

  <b-navbar-toggle  target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand  href="#">NavBar</b-navbar-brand>

  <b-collapse  is-nav id="nav_collapse">

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#" v-on:click="logout">Deconnexion</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
        </div>
    <b-row>
      <b-col cols="12"	sm="12"	md="12"	lg="12"	xl="12"><h1>Bonjour {{user.firstname +" "+ user.lastname}}</h1></b-col>
    </b-row>
    <b-row>
      <b-col cols="12"	sm="12"	md="12"	lg="12"	xl="12">
            <b-card no-body>
                <b-tabs card>
                  <b-tab  title="Informations Personnelles" active>
                    <b-form>
                      <b-col cols="12"	sm="5"	md="12"	lg="12"	xl="12">
                      <b-form-group id="mailAdresseLabel"
                            label="Email address:"
                            label-for="mailAdresseInput">
                              <b-form-input id="mailAdresseInput"
                                type="email"
                                v-model="newuser.mail"
                                required
                                placeholder="Enter email">
                        </b-form-input>
                      </b-form-group>
                      </b-col>
                      <b-col  cols="12"	sm="5"	md="12"	lg="12"	xl="12">
                        <b-form-group id="telLabel"
                    label="Téléphone :"
                    label-for="telInput">
        <b-form-input id="telInput"
                      v-model="newuser.tel">
        </b-form-input>
      </b-form-group>
                      </b-col>
                      <b-col cols="12"	sm="5"	md="12"	lg="12"	xl="12">
      <b-form-group id="AdresseLabel"
                    label="Adresse:"
                    label-for="AdresseInput">
        <b-form-input id="AdresseInput"
                      type="text"
                      v-model="newuser.adress.street"
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
                      v-model="newuser.adress.zipCode"
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
                      v-model="newuser.adress.number"
                      required
                      placeholder="Enter rue">
        </b-form-input>
      </b-form-group>
                      </b-col>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
                  </b-tab>
                  <b-tab title="Planning" >
                    <b-row>
                      <b-col cols="12">
                               <calendar :contrat="currentContrat"></calendar>

                      </b-col>
                    </b-row>
                  </b-tab>
                  <b-tab title="Tableau de Bord">
                    <b-row>
                      <b-col cols="12" v-if="totalConge&&soldeConge">
                            <b-progress :max="totalConge">
                            <b-progress-bar :value="soldeConge">
                              <strong>{{ soldeConge }} / {{ totalConge }}</strong>
                            </b-progress-bar>
                            </b-progress>
                      </b-col>
                      <b-col cols="12">
                        <b-form-select v-model="selectedContract">
                          <option v-for="(contrat) in contracts" v-bind:key = "contrat.id" :value="{id:contrat.id,startDate:contrat.startDate,endDate:contrat.endDate,weeklyHour:contrat.weeklyHour}"> Contract {{contrat.id}}</option>
                          </b-form-select>
                      </b-col>
                      <b-col>
                          <b-table v-if="contractsAffichage" striped hover :items="contractsAffichage" :fields="fields"></b-table>
                      </b-col>
                    </b-row>
                                          <p>Compteur Hebdomadaire : {{compteurHebdomadaire}}h travaillé</p>
                                          <p>Compteur Mensuel : {{compteurMensuelle}}h travaillé</p>
                                          <p>Compteur Annuel : {{compteurAnnuelle}}h travaillé</p>

                  </b-tab>
                  <b-tab title="Demande">
                    <b-col cols="12">
                    <b-form-group label="Type demande">
      <b-form-radio-group id="radios2" v-model="selectedTypeDemande" name="radioSubComponent">
        <b-form-radio value="conge">Congé payé</b-form-radio>
        <b-form-radio value="recup">Récupération de temps de travail </b-form-radio>
      </b-form-radio-group>
    </b-form-group>
                    </b-col>
                    <b-col cols="6">
                      <div v-if="selectedTypeDemande==='conge'">
                        <date-picker v-model="demandeVac.dateDebVacanceDemande" :config="options"></date-picker>
                        <date-picker v-model="demandeVac.dateFinVacanceDemande" :config="options"></date-picker>
                        <textarea id="story" name="story" placeholder="commentaire"></textarea>
                        <b-button>Envoyer</b-button>
                      </div>
                      <div v-if="selectedTypeDemande==='recup'">
                        <date-picker v-model="demandeVac.dateDebVacanceDemande" :config="options"></date-picker>
                        <date-picker v-model="demandeVac.dateFinVacanceDemande" :config="options"></date-picker>
                        <textarea id="story" name="story" placeholder="commentaire"></textarea>
                        <b-button>Envoyer</b-button>
                      </div>
                    </b-col>
                  </b-tab>
                </b-tabs>
            </b-card>
            </b-col>
    </b-row>
</b-container>
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';

import moment from "moment";

import Calendar from '../components/Calendar';

import ContractUser from "../../data/salarie/contrat.json";
import vacationUser from "../../data/salarie/vacations.json";
import planning from "../../data/salarie/planning.json";



let jsonUser = JSON.parse(window.localStorage.getItem('user'));


export default {
  name: "Salaried",
  data() {
    return {
      options: {
          format: 'MM-DD-YYYY',
          useCurrent: false,
        } ,
      user: jsonUser,
      fields: [ 'startDate', 'endDate', 'weeklyHour' ],
      contracts: ContractUser,
      demandeVac:{
        dateFinVacanceDemande:null,
        dateDebVacanceDemande:null,
        commentaire:null
      },
      newuser:jsonUser,
      demandeRecup:{
        dateFinRecupDemande:null,
        dateDebRecupDemande:null,
        commentaire:null
      },
      contractsAffichage: null,
      selectedContract: null,
      currentContrat: null,
      soldeConge: null,
      totalConge:null,
      compteurAnnuelle:0,
      compteurMensuelle:0,
      compteurHebdomadaire:0,
      selectedTypeDemande: null,
      config: {
        defaultView: "month"
      },

    };
  },
  components: {
    datePicker,
    Calendar
  },
  watch: {
    'selectedContract': function() {
      this.contractsAffichage=[this.selectedContract]
      }
      },
  mounted: function() {
    this.$nextTick(function() {
      this.getcompteur("week")
      this.getcompteur("month")
      this.getcompteur("year")

      for (var contrat in this.contracts) {
        

        var end = moment(this.contracts[contrat].endDate).format("DD-MM-YYYY");
        if (
          moment(end, "DD-MM-YYYY")
            .fromNow()
            .includes("in")
        ) {
          this.currentContrat = this.contracts[contrat];
          this.contractsAffichage=[this.currentContrat]
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
          this.totalConge= Math.ceil(diff * 2.08)
          this.soldeConge = this.totalConge- vacationUser.totalPrit;
        }
      }
    });
  },
  methods: {
    logout(){
      window.sessionStorage.removeItem('user')
      this.$router.push('/')
    },
    getcompteur(duree){
      var start = moment();
      var actuel=moment()
      start.lang('fr'); // week start on monday
      start.startOf(duree);
      var d=moment.duration(start.diff(start));
      while(start.isBefore(actuel,'day')){
         var a= planning.hours.findIndex((elem)=>{
            return Object.keys(elem)[0]===start.format("MM-DD-YYYY")
          } )
          if(a!=-1){
            let planningjour=planning.hours[a][start.format("MM-DD-YYYY")];
            let startMorning= moment(start.format("MM-DD-YYYY")+planningjour.startMorning,"MM-DD-YYYYHH:mm");
            let endMorning= moment(start.format("MM-DD-YYYY")+planningjour.endMorning,"MM-DD-YYYYHH:mm");
            let startAfternoon= moment(start.format("MM-DD-YYYY")+planningjour.startAfternoon,"MM-DD-YYYYHH:mm");
            let endAfternoon= moment(start.format("MM-DD-YYYY")+planningjour.endAfternoon,"MM-DD-YYYYHH:mm");
            let ds=moment.duration(endMorning.diff(startMorning));
            ds.add(moment.duration(endAfternoon.diff(startAfternoon)))
            d.add(ds);
          }
          start.add(1,'day')
        }
          var h = Math.floor( (d/(1000*60*60)) )
          var m = Math.floor( (d/1000/60) % 60 );
          var s=h+":"+m
          switch (duree) {
              case 'year':
                this.compteurAnnuelle=s;
                break;
              case 'month':
                this.compteurMensuelle=s
                break;
              case 'week':
                this.compteurHebdomadaire=s;
                break;
            }
    },
    changeInformation(){
      //Call APi with new Change
    }
  }
};
</script>
<style>
</style>
