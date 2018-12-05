<template>
  <v-layout wrap @keyup.enter="submit()">
    <v-flex xs12>
      <h1>Persönliche Daten</h1>
      <h2>Ihre Daten</h2>
      <p>Falls Sie vor Kurzem eine Änderung Ihrer Daten beantragt haben, ist diese Anzeige ggf. noch nicht aktualisiert.</p>
    </v-flex>
    <v-flex xs12 md6>
      <v-text-field
        outline
        readonly
        label="Vorname"
        v-model="fields.firstName"
      />
    </v-flex>
    <v-flex xs12 md6>
      <v-text-field
        outline
        readonly
        label="Nachname"
        v-model="fields.lastName"
      />
    </v-flex>
    <v-flex xs12>
      <v-text-field
        box
        clearable
        :append-icon="iconState('address')"
        label="Straße / HNr."
        :rules="[isValid('address')]"
        :success="!errors.address"
        v-model="fields.address"
      />
    </v-flex>
    <v-flex xs12 md4>
      <v-text-field
        box
        clearable
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
        clearable
        :append-icon="iconState('location')"
        label="Ort"
        :rules="[isValid('location')]"
        :success="!errors.location"
        v-model="fields.location"
      />
    </v-flex>
    <v-flex
      v-if="fields.communications.length === 0"
      xs12
    >
      <v-btn
        outline
        color="primary"
        @click="addCommunicationItem()"
      >
        Add Communication
      </v-btn>
    </v-flex>
    <v-flex
      v-for="(item, i) in fields.communications"
      :key="`${i}`"
      xs12
    >
      <v-layout>
        <v-flex>
          <v-btn
            block
            large
            @click="communicationSettingDialog = item"
          >
            <v-icon large>{{ icons.communications.channel[item.channel] }}</v-icon>
            <v-icon large>{{ icons.communications.publicness[item.publicness] }}</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs11>
          <v-text-field
            box
            clearable
            :append-icon="errors[`communication_${i}`] ? icons.ui.error : null"
            :label="getLabelForCommunication(item)"
            :rules="[isValid(`communication_${i}`)]"
            :success="!errors[`communication_${i}`]"
            v-model="item.value"
          >
            <template slot="append">
              <v-icon
                @click="removeCommunicationItem(i)"
              >
                delete_forever
              </v-icon>
            </template>
            <template slot="append-outer">
              <v-icon
                v-if="i === fields.communications.length - 1"
                @click="addCommunicationItem()"
              >
                add_circle
              </v-icon>
            </template>
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-dialog
      v-if="communicationSettingDialog"
      persistent
      v-model="communicationSettingDialog"
    >
      <v-card>
        <v-card-title>
          Kommunikationseinstellungen
        </v-card-title>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12 md6>
              <v-radio-group
                label="Kommunikationskanal"
                :value="communicationSettingDialog.channel"
                @change="changeCommunication(communicationSettingDialog, 'channel', $event)"
              >
                <v-radio
                  v-for="(icon, key) in icons.communications.channel"
                  :key="`channel_${key}`"
                  :value="key"
                >
                  <template slot="label">
                    <v-icon>
                      {{ icon }}
                    </v-icon>
                    {{ labels.communications.channel[key] }}
                  </template>
                </v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 md6 v-if="communicationSettingDialog.channel !== 'fax'">
              <v-radio-group
                label="Öffentlichkeit"
                :value="communicationSettingDialog.publicness"
                @change="changeCommunication(communicationSettingDialog, 'publicness', $event)"
              >
                <v-radio
                  v-for="(icon, key) in icons.communications.publicness"
                  :key="`publicness_${key}`"
                  :value="key"
                >
                  <template slot="label">
                    <v-icon>
                      {{ icon }}
                    </v-icon>
                    {{ labels.communications.publicness[key] }}
                  </template>
                </v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="communicationSettingDialog = null">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      block
      color="primary"
      :dark="formIsValid"
      :disabled="!formIsValid"
      @click="submit()"
    >
      Speichern
    </v-btn>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import validate from 'validate.js';

interface CommunicationItem {
  [key: string]: any;
  channel: string;
  publicness: string;
  value: any;
}

@Component({})
export default class PersonalDataEdit extends Vue {
  private fields: { [key: string]: any } = {};
  private communicationSettingDialog = null;
  private errors = {};

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

  private icons = {
    communications: {
      channel: {
        mobile: 'smartphone',
        phone: 'phone',
        email: 'email',
        fax: 'print',
      },
      publicness: {
        business: 'business',
        private: 'account_circle',
      },
    },
    ui: {
      success: 'thumb_up',
      error: 'thumb_down',
    },
  };

  private labels = {
    communications: {
      channel: {
        mobile: 'Mobilfunk (Handy-Nummer)',
        phone: 'Telefon',
        email: 'E-Mail-Adresse',
        fax: 'Telefax',
      },
      publicness: {
        business: 'dienstlich / geschäftlich',
        private: 'privat',
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
      .reduce((carry: any, { item, index }: { item: CommunicationItem, index: number }) => {
        carry.items = [...carry.items, item];
        carry.values[`communication_${index}`] = item.value;
        carry.validationRules[`communication_${index}`] = {
          ...(item.channel === 'email' ? this.validationRules.mail : this.validationRules.phone),
        };

        return carry;
      }, {
        items: [],
        values: {},
        validationRules: {},
      });
  }

  private get formIsValid() {
    const errors = validate({
      ...this.fields,
      ...this.communicationItems.values,
    }, {
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
    });
    this.errors = errors || {};
    return !errors;
  }

  private changeCommunication(item: CommunicationItem, type: 'channel'|'publicness', value: any) {
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

  private addCommunicationItem() {
    this.fields.communications.push({
      channel: 'phone',
      publicness: 'private',
      value: '',
    });
  }

  private removeCommunicationItem(index: number) {
    this.fields.communications.splice(index, 1);
  }

  private getLabelForCommunication(item: CommunicationItem) {
    const channelLabel = this.labels.communications.channel[item.channel];
    const publicnessLabel = item.channel !== 'fax' ? `(${this.labels.communications.publicness[item.publicness]})` : '';
    return `${channelLabel} ${publicnessLabel}`;
  }

  private hasChanges(fieldName: string) {
    return this.fields[fieldName] !== this.$store.state.userData.personal[fieldName];
  }

  private iconState(fieldName: string) {
    if (this.hasChanges(fieldName)) {
      const hasErrors = this.errors[fieldName];
      return hasErrors ? this.icons.ui.error : this.icons.ui.success;
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
        communications: [... this.communicationItems.items],
      });
    }
  }

  private created() {
    this.fields = {
      ...this.$store.state.userData.personal,
      communications: this.$store.state.userData.personal.communications
        .map(({ channel, publicness, value }: CommunicationItem) =>
          ({ channel, publicness, value })),
    };
  }
}
</script>
