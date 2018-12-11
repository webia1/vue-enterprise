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
          <!-- <v-btn
            v-if="fields.communications.length === 0"
            outline
            color="primary"
            @click="addCommunicationItem()"
          >
            Add Communication
          </v-btn> -->
          <v-flex v-for="(item, i) in fields.communications" :key="`${i}`" xs12>
            <v-layout>
              <v-flex xs3>
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
              <v-flex xs6 offset-xs1>
                <v-text-field
                  box
                  single-line
                  :append-icon="errors[`communication_${i}`] ? icons.fieldStates.error : null"
                  :rules="[isValid(`communication_${i}`)]"
                  :success="!errors[`communication_${i}`]"
                  v-model="item.value"
                >
                  <template slot="append-outer">
                    <v-icon @click="removeCommunicationItem(i)">delete_forever</v-icon>
                  </template>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-layout @click="addCommunicationItem()">
            <v-flex xs3>
              <v-overflow-btn
                disabled
                class="mt-0 pt-0"
                label="Kontaktart"
              >
                Kontaktart
              </v-overflow-btn>
            </v-flex>
            <v-flex xs6 offset-xs1>
              <v-text-field
                box
                disabled
                label="Telefonnummer / E-Mail"
              >
                <template slot="append-outer">
                  <v-icon>
                    add_circle
                  </v-icon>
                </template>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn
            large
            color="primary"
            :dark="formIsValid"
            :disabled="!formIsValid"
            @click="submit()"
          >
            <v-icon>{{ icons.cta }}</v-icon>
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

interface CommunicationItem {
  [key: string]: any;
  channel: string;
  publicness: string;
  value?: any;
}

@Component({
  filters: {
    ellipsis: (text: string, limit: number) => limit ? `${text.substr(0, limit)}...` : text,
  },
})
export default class ChangeContact extends Vue {
  private fields: { [key: string]: any } = {};
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
      presence: { allowEmpty: false },
      format: /\w+.*\d+.*/,
    },
    zip: {
      presence: { allowEmpty: false },
      length: {
        minimum: 4,
        maximum: 5,
      },
    },
    location: {
      presence: { allowEmpty: false },
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

  private addCommunicationItem() {
    this.fields.communications.push({
      channel: 'mobile',
      publicness: 'private',
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
