<template>
  <v-layout wrap>
    <v-flex xs8>
      <v-content @keyup.enter="submit()">
        <h2>Änderung Adresse und Kommunikations&shy;daten</h2>
        <p>tragen Sie hier Ihre neuen Daten ein oder pflegen Sie bereits bestehende Angaben. Natürlich können Sie auch zusätzliche Kommunikationsdaten zu Ihrem Profil ergänzen.</p>

        <h4>Zu Ihrer Person</h4>
        <h3>{{ fields.firstName }} {{ fields.lastName }},</h3>
        <p>können Sie folgende Informationen anpassen oder aktualisieren:</p>

        <h3>Anschrift</h3>
        <v-layout wrap>
          <v-flex xs7 sm2>
            <v-text-field
              box
              :append-icon="iconState('zip')"
              :error-messages="hasChanges('zip') ? errors.zip : []"
              label="PLZ"
              :success="!!hasChanges('zip') && !errors.zip"
              v-model="fields.zip"
              @blur="autoCity()"
            />
          </v-flex>
          <v-flex xs7 sm5>
            <v-text-field
              box
              :append-icon="iconState('city')"
              :disabled="zipRequest"
              :error-messages="hasChanges('city') ? errors.city : []"
              label="Ort"
              :loading="zipRequest"
              :success="!!hasChanges('city') && !errors.city"
              v-model="fields.city"
            />
          </v-flex>
          <v-flex xs7>
            <v-text-field
              box
              :append-icon="iconState('road')"
              label="Straße, Hausnummer"
              :rules="[isValid('road')]"
              :success="!!hasChanges('road') && !errors.road"
              v-model="fields.road"
            />
          </v-flex>
          <v-flex xs1>
            <v-menu
              slot="append-outer"
              left
              :nudge-top="15"
              :nudge-left="30"
              :open-on-click="false"
              open-on-hover
            >
              <v-icon slot="activator" class="my-3" @click="useGeolocation()">
                {{ icons.findLocation }}
              </v-icon>
              <v-card dark color="secondary">
                <v-card-text>
                  Meinen aktuellen Standort verwenden
                </v-card-text>
              </v-card>
            </v-menu>
          </v-flex>
        </v-layout>

        <h3>Kommunikationdaten</h3>
        <div v-for="(item, i) in fields.communications" :key="`${i}`">
          <v-layout wrap>
            <v-flex xs7 sm2>
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
            <v-flex xs7 sm5>
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
              <v-icon class="my-3" @click="removeCommunicationItem(i)">delete</v-icon>
            </v-flex>
          </v-layout>
        </div>
        <div>
          <v-layout>
            <v-flex xs7 sm2>
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
            <v-flex xs7 sm5>
              <v-text-field
                box
                disabled
                class="communication-placeholder"
                label="Telefonnummer / E-Mail"
              />
            </v-flex>
          </v-layout>
        </div>

        <h3>Bestimmen Sie den Zeitpunkt der Gültigkeit ihrer Änderungen</h3>
        <v-layout wrap>
          <v-flex xs8 sm2>
            <v-radio-group mandatory v-model="useCurrentDate">
              <v-radio
                label="Gültig ab sofort"
                :value="true"
                change="dateFrom = new Date().toLocaleDateString();"
              >
              </v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs8 sm5>
            <v-text-field
              slot="activator"
              box
              readonly
              :disabled="useCurrentDate"
              label="Datum"
              ref="datePickerActivator"
              v-model="formattedDate"
              @click.native="useCurrentDate = false; openDatepicker = true;"
            >
            </v-text-field>
            <v-menu
              v-if="$refs.datePickerActivator"
              right
              :attach="$refs.datePickerActivator.$el"
              :nudge-bottom="60"
              :close-on-content-click="false"
              v-model="openDatepicker"
            >
              <v-date-picker
                no-title
                scrollable
                v-model="dateFrom"
              >
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>

        <v-card>
          <v-card-text>
            <h3>Freiwillige Einwilligungserklärung</h3>
            <p>
              Ich willige ein, dass ich künftig
              <span class="mx-1" style="cursor: pointer;" @click="keweElectronic = !keweElectronic"><v-icon>{{ keweElectronic ? icons.forms.checkbox_checked : icons.forms.checkbox_blank }}</v-icon> per elektronischer Post</span>
              <span class="mx-1" style="cursor: pointer;" @click="kewePhone = !kewePhone"><v-icon>{{ kewePhone ? icons.forms.checkbox_checked : icons.forms.checkbox_blank }}</v-icon> per Telefon</span>
              (bitte zutreffendes ankreuzen) über Versicherungs- und Finanzprodukte von Unternehmen und Vermittlern informiert werde. Sie können mich auch zur Kundenbefragung kontaktieren. Meine Daten dürfen hierfür verarbeitet werden. Diese Einwilligung gilt unabhängig davon, ob ein Vertrag besteht. Ich kann sie jederzeit formlos für die Zukunft widerrufen.
            </p>
          </v-card-text>
        </v-card>

        <v-divider class="my-5" />

        <v-btn
          large
          outline
          round
          color="primary"
          :dark="formIsValid"
          :disabled="!formIsValid"
          @click="submit()"
        >
          Speichern
        </v-btn>
    </v-content>
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
  watch: {
    useCurrentDate(val) {
      if (val) {
        // @ts-ignore
        this.dateFrom = new Date().toISOString().split('T')[0];
      }
    },
  },
})
export default class ChangeContact extends Vue {
  private fields: { [key: string]: any } = {};
  private zipRequest = false;
  private newChannel = null;
  private errors: any = {};

  private openDatepicker = false;
  private useCurrentDate = true;
  private dateFrom = new Date().toISOString().split('T')[0];
  private keweElectronic = false;
  private kewePhone = false;

  private get formattedDate() {
    return new Date(this.dateFrom).toLocaleDateString();
  }

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
    road: {
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
      presence: {
        allowEmpty: false,
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
        road: {
          ...this.validationRules.road,
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
        personal: {
          ...this.fields,
          communications: [...this.communicationItems.items],
        },
        dateFrom: this.dateFrom,
      });
      this.$router.push('./success');
    }
  }

  private useGeolocation() {
    GeolocationService.position
      .then((position) => {
        let road = position.road ? position.road : '';
        if (road && position.house_number) {
          road = `${road} ${position.house_number}`;
        }
        this.fields.road = road;

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
      road: '',
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
