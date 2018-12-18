<template>
  <v-layout wrap @keyup.enter="submit()">
    <v-flex xs12>
      <v-card class="pa-3">
        <v-card-title>
          <h2 class="red--text text--darken-3 mb-0">Kontaktdaten ändern</h2>
        </v-card-title>
        <v-card-text>
          <h3>Persönliche Angaben</h3>
          <v-select
            box
            disabled
            :items="['Dr.', 'Prof.', 'Prof. Dr.']"
            label="Titel"
          />
          <v-text-field
            box
            label="Vorname"
            v-model="fields.firstName"
          />
          <v-text-field
            box
            disabled
            label="Adelsprädikat"
          />
          <v-text-field
            box
            label="Nachname"
            v-model="fields.lastName"
          />

          <h3>Anschrift</h3>
          <v-text-field
            box
            :append-icon="iconState('address')"
            label="Straße / HNr."
            :rules="[isValid('address')]"
            :success="!errors.address"
            v-model="fields.address"
          />

          <v-layout wrap>
            <v-flex xs12 md4>
              <v-text-field
                box
                :append-icon="iconState('zip')"
                label="PLZ"
                :rules="[isValid('zip')]"
                :success="!errors.zip"
                v-model="fields.zip"
              />
            </v-flex>
            <v-flex xs12 md8>
              <v-text-field
                box
                :append-icon="iconState('location')"
                label="Ort"
                :rules="[isValid('location')]"
                :success="!errors.location"
                v-model="fields.location"
              />
            </v-flex>
          </v-layout>

          <h3>Kontaktmöglichkeiten</h3>
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
                    label="Kontaktart"
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

import PhoneNumberField from '@/components/forms/phone-number-field';
import icons from '@/globals/icons';

interface CommunicationItem {
  [key: string]: any;
  channel: string;
  publicness: string;
  value?: any;
}

@Component({
  components: {
    PhoneNumberField,
  },
  filters: {
    ellipsis: (text: string, limit: number) => limit ? `${text.substr(0, limit)}...` : text,
  },
})
export default class ChangeContact extends Vue {
  private fields: { [key: string]: any } = {};
  private newChannel = null;
  private errors = {};

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

  private labels = {
    communications: {
      channel: {
        mobile: 'Mobil',
        phone: 'Telefon',
        email: 'E-Mail',
        fax: 'Telefax',
      },
      publicness: {
        business: 'geschäftlich',
        private: 'privat',
      },
    },
  };

  private validationRules = {
    mail: {
      email: true,
    },
    phone: {
      format: /^\+?(\d|\s){3,6}\/?(\d|\s)+/,
    },
    name: {
      presence: { allowEmpty: false },
      length: {
        minimum: 3,
      },
    },
    address: {
      format: /([a-zäöü]+.*\d+.*)?/i,
    },
    zip: {
      format: /(\d{4,5})?/,
    },
    location: {
      format: /([a-zäöü]{3,})?/i,
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
        location: {
          ...this.validationRules.location,
        },
        ...this.communicationItems.validationRules,
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
      this.fields[fieldName] !== this.$store.state.userData.personal[fieldName]
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
      location: '',
      communications: [],
    };
  }
}
</script>

<style lang="stylus" scoped>
.v-text-field.v-text-field--box.communication-placeholder .v-input__slot {
  background-color grey;
}
</style>
