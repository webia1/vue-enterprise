<template>
  <v-layout wrap>
    <v-flex xs12 md8 lg9>
      <v-card class="pa-3">
        <v-card-title>
          <h2 class="red--text text--darken-3">Bitte identifizieren Sie sich</h2>
        </v-card-title>
        <v-card-text>
          Der Schutz Ihrer Daten steht bei uns an erster Stelle. Damit wir Ihren Wunsch entgegen nehmen und bearbeiten können, benötigen wir ein paar Daten von Ihnen, um Sie richtig zu identifizieren.
        </v-card-text>
        <v-card-text  @keyup.enter="identify()">
          <v-text-field
            box
            :append-icon="firstName !== '' ? (!errors.firstName ? icons.fieldStates.success : icons.fieldStates.error) : null"
            label="Vorname *"
            :rules="[isValid('firstName')]"
            :success="!errors.firstName"
            v-model="firstName"
          />
          <v-text-field
            box
            :append-icon="lastName !== '' ? (!errors.lastName ? icons.fieldStates.success : icons.fieldStates.error) : null"
            label="Nachname *"
            :rules="[isValid('lastName')]"
            :success="!errors.lastName"
            v-model="lastName"
          />
          <v-text-field
            box
            :append-icon="birthday !== '' ? (!errors.birthday ? icons.fieldStates.success : icons.fieldStates.error) : null"
            return-masked-value
            hint="dd.mm.yyyy"
            label="Geburtstag *"
            mask="##.##.####"
            :rules="[isValid('birthday')]"
            :success="!errors.birthday"
            v-model="birthday"
          />
          <template v-if="withInsuranceNumber">
            <div class="mode-changer">
              <v-text-field
                box
                :append-icon="insuranceNumber !== '' ? (!errors.insuranceNumber ? icons.fieldStates.success : icons.fieldStates.error) : null"
                label="Vertragsnummer *"
                :rules="[isValid('insuranceNumber')]"
                :success="!errors.insuranceNumber"
                v-model="insuranceNumber"
              />
              <p>Die Versicherungsscheinnummer (VNR) beginnt meist mit den Buchstaben SV, LV, KV oder DA gefolgt von 1 bis 9 Ziffern (z.B. KV123456789, LV12345, SV1234567). Leerzeichen und weitere nachfolgende Zeichen bitte nicht eingeben.</p>
              <p>
                <strong>Sie haben Ihre Versicherungsnummer nicht zur Hand?</strong>
                <br>
                <a @click="changeMode()">
                  <v-icon>{{ icons.cta }}</v-icon>Identifizierung über Eingabe der Adressdaten
                </a>
              </p>
            </div>
          </template>
          <div v-if="!withInsuranceNumber" class="mode-changer">
            <v-text-field
              box
              :append-icon="address !== '' ? (!errors.address ? icons.fieldStates.success : icons.fieldStates.error) : null"
              label="Straße / Hausnummer *"
              :rules="[isValid('address')]"
              :success="!errors.address"
              v-model="address"
            />
            <v-layout wrap>
              <v-flex xs12 md4>
                <v-text-field
                  box
                  :append-icon="zip !== '' ? (!errors.zip ? icons.fieldStates.success : icons.fieldStates.error) : null"
                  label="PLZ *"
                  :rules="[isValid('zip')]"
                  :success="!errors.zip"
                  v-model="zip"
                />
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field
                  box
                  :append-icon="location !== '' ? (!errors.location ? icons.fieldStates.success : icons.fieldStates.error) : null"
                  label="Ort *"
                  :rules="[isValid('location')]"
                  :success="!errors.location"
                  v-model="location"
                />
              </v-flex>
            </v-layout>
            <p>
              <strong>Haben Sie Ihre Versicherungsnummer zur Hand?</strong>
              <br>
              <a @click="changeMode()">
                <v-icon>{{ icons.cta }}</v-icon>Identifizierung über Eingabe der Versicherungsnummer
              </a>
            </p>
          </div>
          <p>Bei der Verarbeitung von personenbezogenen Daten beachten wir die Vorschriften der EU-Datenschutz-Grundverordnung. Ausführliche Informationen finden Sie im
            <strong>Datenschutzbereich unserer Website</strong>.
          </p>
          <v-checkbox
            :error="errors.termsAccepted"
            @change="termsCheck()"
            v-model="termsAccepted"
          >
            <div slot="label">
              <v-icon v-if="errors.termsAccepted" color="error">{{ icons.cta }}</v-icon>
              Ich stimme den
              <a href="javascript:void(0)">Nutzungsbestimmungen</a> und
              <a href="javascript:void(0)">Datenschutzhinweisen</a> zu.
            </div>
          </v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn
            large
            color="primary"
            :dark="formIsValid"
            :disabled="!formIsValid"
            @click="identify()"
          >
            <v-icon>{{ icons.cta }}</v-icon>Jetzt identifizieren
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 md4 lg3>
      <v-layout wrap>
        <v-flex>
          <v-card class="pa-3">
            <v-card-title>
              <h3 class="red--text text--darken-3">Bereits registriert?</h3>
            </v-card-title>
            <v-card-text>
              <p>Sind Sie bereits in unserem Serviceportal registriert? Im Kundenbereich
                <strong>"Meine Versicherungen"</strong> verwalten Sie Ihre Versicherungen, Ihre Nachrichten und Ihr Profil - einfach und bequem.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn dark color="secondary" to="/login">
                <v-icon>{{ icons.cta }}</v-icon>Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card class="pa-3">
            <v-card-title>
              <h3 class="red--text text--darken-3">Unsere Hotline</h3>
            </v-card-title>
            <v-card-text>
              <p>Haben Sie Fragen oder brauchen Sie Unterstützung, dann rufen Sie uns gerne an.</p>
              <p class="eye-catcher">
                <strong>0800 3746-000</strong>
              </p>
              <p>(24 h, 7 Tage die Woche, gebührenfrei aus Deutschland)</p>
              <p>Aus dem Ausland:
                <br>
                <strong>+49 211 477-7100</strong>
              </p>
            </v-card-text>
            <v-img src="https://via.placeholder.com/600x400"/>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import validate from 'validate.js';

  import icons from '@/globals/icons';
  import userData from '@/globals/userData';

  @Component({})
  export default class Overview extends Vue {
    @Prop () private successRedirect!: string|object;
    private firstName: string = '';
    private lastName: string = '';
    private birthday: string = '';
    private insuranceNumber: string = '';
    private withInsuranceNumber = true;
    private address: string = '';
    private zip: string = '';
    private location: string = '';
    private termsAccepted = false;
    private errors = {};
    private icons = icons;

    private get formIsValid() {
      const errors = validate({
        firstName: this.firstName,
        lastName: this.lastName,
        birthday: this.birthday,
        insuranceNumber: this.insuranceNumber,
        address: this.address,
        zip: this.zip,
        location: this.location,
      }, {
        firstName: {
          ...this.validationConstraints.name,
        },
        lastName: {
          ...this.validationConstraints.name,
        },
        birthday: {
          presence: { allowEmpty: false },
          birthday: true,
        },
        insuranceNumber: {
          ...this.validationConstraints.withInsuranceNumber,
        },
        address: {
          ...this.validationConstraints.withoutInsuranceNumber,
          ...(!this.withInsuranceNumber ? {
            format: /\w+.*\d+.*/,
          } : {}),
        },
        zip: {
          ...this.validationConstraints.withoutInsuranceNumber,
          ...(!this.withInsuranceNumber ? {
            format: /\d+/,
            length: {
              minimum: 4,
              maximum: 5,
            },
          } : {}),
        },
        location: {
          ...this.validationConstraints.withoutInsuranceNumber,
        },
      });
      this.errors = errors || {};
      return !errors;
    }

    private get validationConstraints() {
      return {
        name: {
          presence: { allowEmpty: false },
          length: {
            minimum: 5,
            maximum: 20,
          },
        },
        birthday: {
          birthday: true,
        },
        withInsuranceNumber: {
          presence: this.withInsuranceNumber ? { allowEmpty: false } : false,
        },
        withoutInsuranceNumber: {
          presence: !this.withInsuranceNumber ? { allowEmpty: false } : false,
        },
      };
    }

    private changeMode() {
      this.withInsuranceNumber = !this.withInsuranceNumber;
      this.insuranceNumber = '';
      this.address = '';
      this.zip = '';
      this.location = '';
      this.termsAccepted = false;
    }

    private isValid(fieldName: string) {
      return () => {
        if (this.errors) {
          return this.errors[fieldName] ? this.errors[fieldName][0] : true;
        }
        return true;
      };
    }

    private identify() {
      this.termsCheck();
      if (this.formIsValid && !(this.errors as any).termsAccepted) {
        if (!this.$store.state.userData.initialized) {
          this.$store.dispatch('userData/initializeUserData', userData);
        }
        this.$router.push(this.successRedirect);
      }
    }

    private termsCheck() {
      Vue.set(this.errors, 'termsAccepted', this.termsAccepted !== true);
      return this.termsAccepted === true;
    }
  }
</script>
