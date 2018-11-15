<template>
<b-container class="ManagerZone">
    <b-row>
        <b-col cols="12"	sm="12"	md="12"	lg="12"	xl="12">
            <b-card no-body>
                <b-tabs card>
                    <b-tab  title="Informations Personnelles" active>
                        <b-form>
                            <b-col cols="12"	sm="5"	md="12"	lg="12"	xl="12">
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
                            <b-button type="submit" variant="primary">Submit</b-button>
                        </b-form>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-col>
    </b-row>
</b-container>
</template>
<script>
const uuid = require('uuidv4');

export default {
  name: "Manager",
  data() {
    return {
        NewUser:{
            
            "id":null,
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
  }
};
</script>