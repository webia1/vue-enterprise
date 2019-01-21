<template>
  <v-layout wrap @keyup.enter="submit()">
    <v-flex xs12>
      <v-card class="pa-3">
        <v-card-title>
          <h2 class="red--text text--darken-3 mb-0">Änderung Adresse und Kommunikationsdaten</h2>
        </v-card-title>
        <v-card-text>
          <h3 class="red--text text--darken-3 mb-0">Persönliche Angaben</h3>
          <h4 class="mb-3">Hallo {{ fields.firstName }} {{ fields.lastName }},</h4>
          <p>tragen Sie hier Ihre neuen Daten ein</p>

          <!-- <v-layout wrap>
            <v-flex>
              <v-text-field
                box
                disabled
                label="Yorks dritter Vorname"
                v-model="fields.firstName"
              />
            </v-flex>
            <v-flex>
              <v-text-field
                box
                disabled
                label="Schroerens alternativer Nachname"
                v-model="fields.lastName"
              />
            </v-flex>
          </v-layout> -->

          <h3 class="red--text text--darken-3 mb-0">Anschrift</h3>
          <p>Tragen Sie hier Ihre neue Anschrift ein</p>
          <v-text-field
            box
            :append-icon="iconState('address')"
            label="Straße / HNr."
            :rules="[isValid('address')]"
            :success="!!hasChanges('address') && !errors.address"
            v-model="fields.address"
          >
            <v-menu
              slot="append-outer"
              left
              :nudge-top="15"
              :nudge-left="30"
              :open-on-click="false"
              open-on-hover
            >
              <v-icon slot="activator" @click="useGeolocation()">
                {{ icons.findLocation }}
              </v-icon>
              <v-card dark color="secondary">
                <v-card-text>
                  Meinen aktuellen Standort verwenden
                </v-card-text>
              </v-card>
            </v-menu>
          </v-text-field>
          <v-layout wrap>
            <v-flex xs12 md4>
              <v-text-field
                box
                :append-icon="iconState('zip')"
                :error-messages="errors.zip"
                label="PLZ"
                :success="!!hasChanges('zip') && !errors.zip"
                v-model="fields.zip"
                @blur="autoCity()"
              />
            </v-flex>
            <v-flex xs12 md8>
              <v-text-field
                box
                :append-icon="iconState('city')"
                :disabled="zipRequest"
                :error-messages="errors.city"
                label="Ort"
                :loading="zipRequest"
                :success="!!hasChanges('city') && !errors.city"
                v-model="fields.city"
              />
            </v-flex>
            <v-flex xs12>
              <CountryField :preset="fields.country" v-model="fields.country" />
            </v-flex>
          </v-layout>

          <h3 class="red--text text--darken-3 mb-0">Kontaktmöglichkeiten</h3>
          <p>Tragen Sie hier Ihre neuen Kommunikationsdaten ein.</p>
          <v-flex v-for="(item, i) in fields.communications" :key="`${i}`" xs12>
            <v-layout>
              <v-flex xs4>
                <v-menu
                  full-width
                >
                  <v-overflow-btn
                    readonly
                    class="mt-0 pt-0"
                    :label="getLabelForCommunication(item, 15)"
                    slot="activator"
                  />
                  <v-list>
                    <v-list-tile
                      v-for="(option, i) in communicationOptions"
                      :key="i"
                      @click="changeCommunication({ item, settings: option.value })"
                    >
                      {{ option.text }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>
              <v-flex xs7>
                <v-layout v-if="item.channel === 'email'">
                  <v-flex>
                    <v-text-field
                      box
                      :append-icon="errors[`communication_${i}`] ? icons.fieldStates.error : null"
                      label="E-Mail-Adresse"
                      :rules="[isValid(`communication_${i}`)]"
                      :success="!errors[`communication_${i}`]"
                      v-model="item.value"
                    />
                  </v-flex>
                </v-layout>
                <PhoneNumberField
                  v-else
                  v-model="item.value"
                />
              </v-flex>
              <v-flex xs1>
                <v-icon class="my-3" color="secondary" @click="removeCommunicationItem(i)">remove_circle_outline</v-icon>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex>
            <v-layout>
              <v-flex xs4>
                <v-menu
                  full-width
                >
                  <v-overflow-btn
                    readonly
                    class="mt-0 pt-0"
                    label="Auswahl"
                    slot="activator"
                  />
                  <v-list>
                    <v-list-tile
                      v-for="(option, i) in communicationOptions"
                      :key="i"
                      @click="addCommunicationItem(option.value)"
                    >
                      {{ option.text }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>
              <v-flex xs7>
                <v-layout>
                  <v-flex xs12>
                    <v-text-field
                      box
                      disabled
                      class="communication-placeholder"
                      label="Telefonnummer / E-Mail"
                    />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex>
            <!-- <v-card>
              <v-card-text> -->
                <h3 class="red--text text--darken-3 mb-0">Einwilligungserklärung</h3>
                <p>
                  Ich willige ein, dass ich künftig
                  <span class="mx-1" style="cursor: pointer;" @click="keweElectronic = !keweElectronic"><v-icon>{{ keweElectronic ? icons.forms.checkbox_checked : icons.forms.checkbox_blank }}</v-icon> per elektronischer Post</span>
                  <span class="mx-1" style="cursor: pointer;" @click="kewePhone = !kewePhone"><v-icon>{{ kewePhone ? icons.forms.checkbox_checked : icons.forms.checkbox_blank }}</v-icon> per Telefon</span>
                  (bitte zutreffendes ankreuzen)
                  über Versicherungs- und Finanzprodukte von Unternehmen und Vermittlern informiert werde.<br>
                  Sie können mich auch zur Kundenbefragung kontaktieren.
                </p>
                <p>
                  Meine Daten dürfen hierfür verarbeitet werden. Diese Einwilligung gilt unabhängig davon, ob ein Vertrag besteht. Ich kann sie jederzeit formlos für die Zukunft widerrufen.
                </p>
              <!-- </v-card-text>
            </v-card> -->
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-btn
            large
            color="primary"
            :dark="formIsValid"
            :disabled="!formIsValid"
            @click="submit()"
          >
            <v-icon large>{{ icons.cta }}</v-icon>
            Speichern
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import validate from 'validate.js';

import icons from '@/globals/icons';

import CommunicationItem from '@/globals/definitions/communication-item';
import communicationLabels from '@/globals/communication-labels';
import { AddressService, AddressServiceErrors } from '@/globals/services/address';
import GeolocationService from '@/globals/services/geolocation';
import CountryField from '@/components/forms/country-field/CountryField.vue';
import PhoneNumberField from '@/components/forms/phone-number-field/PhoneNumberField.vue';

@Component({
  components: {
    CountryField,
    PhoneNumberField,
  },
  filters: {
    ellipsis: (text: string, limit: number) => limit ? `${text.substr(0, limit)}...` : text,
  },
})
export default class ChangeContact extends Vue {
  private fields: { [key: string]: any } = {};
  private zipRequest = false;
  private newChannel = null;
  private errors: any = {};

  private keweElectronic = false;
  private kewePhone = false;

  private communicationOptions: any = [
    {
      channel: 'mobile',
      publicness: 'private',
    },
    {
      channel: 'phone',
      publicness: 'private',
    },
    {
      channel: 'email',
      publicness: 'private',
    },
    {
      channel: 'mobile',
      publicness: 'business',
    },
    {
      channel: 'phone',
      publicness: 'business',
    },
    {
      channel: 'email',
      publicness: 'business',
    },
    {
      channel: 'fax',
      publicness: '',
    },
  ];

  private icons = {
    ...icons,
    communications: {
      channel: icons.contact,
      publicness: icons.publicness,
    },
  };

  private labels = communicationLabels;

  private validationRules = {
    mail: {
      email: true,
    },
    phone: {
      format: {
        pattern: /^\+?(\d|\s){3,6}\/?(\d|\s)+/,
      },
    },
    name: {
      presence: { allowEmpty: false },
      length: {
        minimum: 3,
      },
    },
    address: {
      format: {
        pattern: /([a-zäöü]+.*\d+.*)?/i,
      },
    },
    zip: {
      format: {
        pattern: /(\d{4,5})?/,
        message: 'Ungültige PLZ!',
      },
    },
    city: {
      format: {
        pattern: /([a-zäöü]{3,})?/i,
        message: 'Bitte geben Sie eine gültige Stadt ein!',
      },
    },
  };

  private get communicationItems() {
    return this.fields.communications
      .map((item: any, index) => ({
        item,
        index,
      }))
      .filter(({ item }: { item: { value: any } }) => item.value)
      .reduce(
        (
          carry: any,
          { item, index }: { item: CommunicationItem; index: number },
        ) => {
          carry.items = [...carry.items, item];
          carry.values[`communication_${index}`] = item.value;
          carry.validationRules[`communication_${index}`] = {
            ...(item.channel === 'email' ? this.validationRules.mail : this.validationRules.phone),
          };

          return carry;
        },
        {
          items: [],
          values: {},
          validationRules: {},
        },
      );
  }

  private get formIsValid() {
    const errors = validate(
      {
        ...this.fields,
        ...this.communicationItems.values,
      },
      {
        firstName: {
          ...this.validationRules.name,
        },
        lastName: {
          ...this.validationRules.name,
        },
        address: {
          ...this.validationRules.address,
        },
        zip: {
          ...this.validationRules.zip,
        },
        city: {
          ...this.validationRules.city,
        },
        ...this.communicationItems.validationRules,
      },
      {

      },
    );
    this.errors = errors || {};
    return !errors;
  }

  private changeCommunication({
    item,
    settings,
    type,
    value,
  }: {
    item: CommunicationItem,
    settings: CommunicationItem,
    type: 'channel' | 'publicness',
    value: any,
  }) {
    if (settings) {
      item.channel = settings.channel;
      item.publicness = settings.publicness;
    } else {
      if (type === 'channel') {
        const oldChannel = item.channel;
        if (value === 'fax') {
          item.publicness = '';
        } else if (oldChannel === 'fax') {
          item.publicness = 'private';
        }
      }
      item[type] = value;
    }
  }

  private addCommunicationItem({ channel, publicness }) {
    this.newChannel = null;
    this.fields.communications.push({
      channel: channel || 'mobile',
      publicness: publicness || 'private',
      value: '',
    });
  }

  private autoCity() {
    if (this.fields.zip !== '' && !this.errors.zip) {
      this.fields.city = '';
      this.zipRequest = true;

      AddressService.findLocationByZipcode(this.fields.zip)
        .then((results: any[]) => {
          if (results.length === 1) {
            const [entry] = results;
            this.fields.city = entry.city;
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

  private removeCommunicationItem(index: number) {
    this.fields.communications.splice(index, 1);
  }

  private getLabelForCommunication(item: CommunicationItem, limit?: number) {
    const channelLabel = this.labels.communications.channel[item.channel];
    const publicnessLabel =
      item.channel !== 'fax' ? `(${this.labels.communications.publicness[item.publicness]})` : '';
    const label = `${channelLabel} ${publicnessLabel}`;
    if (limit && label.length > limit) {
      return `${label.substr(0, limit)}...`;
    }
    return label;
  }

  private hasChanges(fieldName: string) {
    return (
      this.fields[fieldName] !== ''
      && this.fields[fieldName] !== this.$store.state.userData.personal[fieldName]
    );
  }

  private iconState(fieldName: string) {
    if (this.hasChanges(fieldName)) {
      const hasErrors = this.errors[fieldName];
      return hasErrors ? this.icons.fieldStates.error : this.icons.fieldStates.success;
    }
    return null;
  }

  private isValid(fieldName: string) {
    return () => {
      if (this.errors) {
        return this.errors[fieldName] ? this.errors[fieldName][0] : true;
      }
      return true;
    };
  }

  private submit() {
    if (this.formIsValid) {
      this.$store.dispatch('userData/updateUser', {
        ...this.fields,
        communications: [...this.communicationItems.items],
      });
      this.$router.push('./success');
    }
  }

  private useGeolocation() {
    GeolocationService.position
      .then((position) => {
        let address = position.road ? position.road : '';
        if (address && position.house_number) {
          address = `${address} ${position.house_number}`;
        }
        this.fields.address = address;

        this.fields.zip = position.postcode ? position.postcode : '';
        this.fields.city = position.city ? position.city : '';
        this.fields.country = position.country ? position.country : '';
      });
  }

  private created() {
    this.communicationOptions = this.communicationOptions.map((item) => ({
      text: this.getLabelForCommunication(item),
      value: item,
    }));
    this.fields = {
      ...this.$store.state.userData.personal,
      // communications: this.$store.state.userData.personal.communications.map(
      //   ({ channel, publicness, value }: CommunicationItem) => ({
      //     channel,
      //     publicness,
      //     value,
      //   }),
      // ),

      // Show only fields which was filled in identify process
      address: '',
      zip: '',
      city: '',
      communications: !this.$store.state.userData.confirmationEmailUsed ? [{
        channel: 'email',
        publicness: 'private',
        value: this.$store.state.userData.confirmationEmail,
      }] : [],
    };
  }
}
</script>

<style lang="stylus" scoped>
.v-text-field.v-text-field--box.communication-placeholder .v-input__slot {
  background-color grey;
}
</style>
