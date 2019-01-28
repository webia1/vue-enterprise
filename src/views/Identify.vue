<template>
  <v-layout>
    <v-flex>
      <v-content>
        <h2>Bitte identifizieren Sie sich</h2>
        <p>
          Der Schutz Ihrer Daten steht bei uns an erster Stelle. Damit wir Ihren Wunsch entgegen nehmen und bearbeiten können, benötigen wir ein paar Daten von Ihnen, um Sie richtig zu identifizieren.
        </p>
        <v-alert class="mb-4" type="info" :value="true">
          Bei der Verarbeitung von personenbezogenen Daten beachten wir die Vorschriften der EU-Datenschutz-Grundverordnung.<br>
          Ausführliche Informationen finden Sie im <a :href="env.dataSecurityLink">Datenschutzbereich unserer Website</a>.
        </v-alert>
        <div @keyup.enter="identify()">
          <v-layout wrap>
            <v-flex xs8 sm4>
              <v-text-field
                box
                persistent-hint
                :append-icon="firstName !== '' ? (!errors.firstName ? icons.fieldStates.success : icons.fieldStates.error) : null"
                :error-messages="errors.firstName"
                hint="Erforderlich"
                label="Vorname"
                :success="firstName !== '' && !errors.firstName"
                v-model="firstName"
              />
            </v-flex>
            <v-flex xs8 sm4>
              <v-text-field
                box
                persistent-hint
                :append-icon="lastName !== '' ? (!errors.lastName ? icons.fieldStates.success : icons.fieldStates.error) : null"
                :error-messages="errors.lastName"
                hint="Erforderlich"
                label="Nachname"
                :success="lastName !== '' && !errors.lastName"
                v-model="lastName"
              />
            </v-flex>
            <v-flex xs8 sm4>
              <v-text-field
                box
                persistent-hint
                return-masked-value
                :append-icon="birthday !== '' ? (!errors.birthday ? icons.fieldStates.success : icons.fieldStates.error) : null"
                :error-messages="errors.birthday"
                hint="Erforderlich"
                label="Geburtstag"
                mask="##.##.####"
                placeholder="dd.mm.yyyy"
                :success="birthday !== '' && !errors.birthday"
                v-model="birthday"
              />
            </v-flex>
            <v-flex xs8 sm4>
              <v-text-field
                box
                persistent-hint
                :append-icon="confirmationEmail !== '' ? (!errors.confirmationEmail ? icons.fieldStates.success : icons.fieldStates.error) : null"
                :error-messages="errors.confirmationEmail"
                hint="Erforderlich"
                label="E-Mail zur Bestätigung"
                :success="confirmationEmail !== '' && !errors.confirmationEmail"
                v-model="confirmationEmail"
              />
            </v-flex>
          </v-layout>
          <v-divider class="mb-3 mt-3" />
          <template v-if="withInsuranceNumber">
            <div class="mode-changer">
              <h3>
                Versicherungsnummer
                <v-menu
                  open-on-hover
                  class="tooltip"
                  :nudge-left="16"
                  :nudge-top="16"
                  :max-width="$vuetify.breakpoint.mdAndUp ? '500px' : null"
                >
                  <v-icon slot="activator">
                    info_outline
                  </v-icon>
                  <v-card
                    dark
                    color="secondary"
                  >
                    <v-card-text>
                      <v-icon class="tooltip__icon">
                        info_outline
                      </v-icon>
                      <div class="tooltip__text">
                        Die Versicherungsnummer beginnt entweder mit zwei Buchstaben, danach kommen bis zu 9 Ziffern (z.B. KV123456789, LV12345, SV1234567) oder sie hat 13 Ziffern, die mit 10 beginnt.
                        Leerzeichen und weitere nachfolgende Zeichen geben Sie bitte nicht ein.
                      </div>
                    </v-card-text>
                  </v-card>
                </v-menu>
              </h3>
              <v-text-field
                box
                persistent-hint
                :append-icon="insuranceNumber !== '' ? (!errors.insuranceNumber ? icons.fieldStates.success : icons.fieldStates.error) : null"
                :error-messages="errors.insuranceNumber"
                hint="Erforderlich"
                label="Versicherungsnummer"
                :success="insuranceNumber !== '' && !errors.insuranceNumber"
                v-model="insuranceNumber"
              />
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
            <h3>Adresse</h3>
            <v-layout wrap>
              <v-flex xs8 sm3>
                <v-text-field
                box
                persistent-hint
                :append-icon="road !== '' ? (!errors.road ? icons.fieldStates.success : icons.fieldStates.error) : null"
                :error-messages="errors.road"
                hint="Erforderlich"
                label="Straße, Hausnummer"
                :success="road !== '' && !errors.road"
                v-model="road"
              />
              </v-flex>
              <v-flex xs8 sm2>
                <v-text-field
                  box
                  persistent-hint
                  :append-icon="zip !== '' ? (!errors.zip ? icons.fieldStates.success : icons.fieldStates.error) : null"
                  :error-messages="errors.zip"
                  hint="Erforderlich"
                  label="PLZ"
                  :success="zip !== '' && !errors.zip"
                  v-model="zip"
                  @blur="autoCity()"
                />
              </v-flex>
              <v-flex xs8 sm3>
                <v-text-field
                  box
                  persistent-hint
                  :append-icon="city !== '' ? (!errors.city ? icons.fieldStates.success : icons.fieldStates.error) : null"
                  :disabled="zipRequest"
                  :error-messages="errors.city"
                  hint="Erforderlich"
                  label="Ort"
                  :loading="zipRequest"
                  :success="city !== '' && !errors.city"
                  v-model="city"
                />
              </v-flex>
            </v-layout>
            <!-- <CountryField preset="Deutschland" v-model="country" /> -->
            <p>
              <strong>Haben Sie Ihre Versicherungsnummer zur Hand?</strong>
              <br>
              <a @click="changeMode()">
                <v-icon>{{ icons.cta }}</v-icon>Identifizierung über Eingabe der Versicherungsnummer
              </a>
            </p>
          </div>
        </div>
        <v-card-actions>
          <v-btn
            outline
            round
            color="primary"
            @click="identify()"
          >
            Jetzt identifizieren
          </v-btn>
        </v-card-actions>
      </v-content>
      <!-- <v-divider class="mt-5" />
      <v-content>
        <v-layout wrap justify-center>
          <v-flex xs8 sm4 class="text-xs-center">
            <h4 class="text--disabled">Servicewelt</h4>
            <h2 class="black--text font-weight-bold">
              Praktische Services, die Ihnen schnelle Hilfe bieten
            </h2>
          </v-flex>
          <v-flex>
            <v-layout wrap justify-center>
              <v-flex xs8 md3>
                <v-card class="fill-height">
                  <v-card-title>
                    <h3 class="red--text text--darken-3">Bereits registriert?</h3>
                  </v-card-title>
                  <v-card-text>
                    <p>Sind Sie bereits in unserem Serviceportal registriert? Im Kundenbereich
                      <strong>"Meine Versicherungen"</strong> verwalten Sie Ihre Versicherungen, Ihre Nachrichten und Ihr Profil - einfach und bequem.
                    </p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      dark
                      outline
                      round
                      class="mr-4"
                      color="secondary"
                    >
                      Zum Login
                    </v-btn>
                    <v-btn
                      dark
                      outline
                      round
                      class="mr-4"
                      color="secondary"
                    >
                      Jetzt registrieren
                    </v-btn>
                  </v-card-actions>
                  <v-img
                    contain
                    :src="`https://lorempixel.com/1200/800/business?random=${Math.floor(Math.random() * 0x1000)}`"
                    :lazy-src="`https://via.placeholder.com/300x200`"
                  />
                </v-card>
              </v-flex>
              <v-flex xs8 md3>
                <v-card>
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
                  <v-img
                    contain
                    :src="`https://lorempixel.com/1200/800/business?random=${Math.floor(Math.random() * 0x1000)}`"
                    :lazy-src="`https://via.placeholder.com/300x200`"
                  />
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-content> -->
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import validate from 'validate.js';

import env from '@/globals/environment';
import icons from '@/globals/icons';
import userData from '@/globals/userData';

import CountryField from '@/components/forms/country-field/CountryField.vue';
import { AddressService, AddressServiceErrors } from '@/globals/services/address';

@Component({
  components: {
    CountryField,
  },
})
export default class Overview extends Vue {
  @Prop () private successRedirect!: string|object;
  private icons = icons;
  private env = env;

  private firstName: string = '';
  private lastName: string = '';
  private birthday: string = '';
  private insuranceNumber: string = '';
  private withInsuranceNumber = true;
  private road: string = '';
  private zip: string = '';
  private city: string = '';
  private country: string = '';
  private errors: any = {};
  private zipRequest = false;

  private confirmationEmail = '';

  private get formIsValid() {
    const errors = validate({
      firstName: this.firstName,
      lastName: this.lastName,
      birthday: this.birthday,
      insuranceNumber: this.insuranceNumber,
      road: this.road,
      zip: this.zip,
      city: this.city,
      confirmationEmail: this.confirmationEmail,
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
      road: {
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
      city: {
        ...this.validationConstraints.withoutInsuranceNumber,
      },
      confirmationEmail: {
        presence: { allowEmpty: false },
        email: true,
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
          minimum: 3,
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

  private autoCity() {
    if (this.zip !== '' && !this.errors.zip) {
      this.city = '';
      this.zipRequest = true;

      AddressService.findLocationByZipcode(this.zip)
        .then((results: any[]) => {
          if (results.length === 1) {
            const [entry] = results;
            this.city = entry.city;
          }
        })
        .catch(({ code }) => {
          if (code === AddressServiceErrors.NoEntryFound) {
            this.errors.zip = ['Postleitzahl konnte nicht gefunden werden!'];
          }
        })
        .then(() => {
          this.zipRequest = false;
        });
    }
  }

  private changeMode() {
    this.withInsuranceNumber = !this.withInsuranceNumber;
    this.insuranceNumber = '';
    this.road = '';
    this.zip = '';
    this.city = '';
    setTimeout(() => {
      if (this.withInsuranceNumber) {
        this.errors.insuranceNumber = [];
      } else {
        this.errors = {
          ...this.errors,
          road: [],
          zip: [],
          city: [],
        };
      }
    }, 0);
  }

  private hasChanges(fieldName: string) {
    return (
      this[fieldName] !== ''
      && this[fieldName] !== this.$store.state.userData.personal[fieldName]
    );
  }

  private identify() {
    if (this.formIsValid && !this.errors.termsAccepted) {
      if (!this.$store.state.userData.initialized) {
        this.$store.dispatch('userData/initializeUserData', {
          ...userData,
          confirmationEmail: this.confirmationEmail,
        });
        this.$store.commit('userData/setIdentity', { firstName: this.firstName, lastName: this.lastName });
      }
      this.$router.push(this.successRedirect);
    }
  }
}
</script>
