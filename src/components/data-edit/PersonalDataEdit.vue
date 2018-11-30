<template>
  <v-layout wrap>
    <v-flex xs12>
      <h1>Persönliche Daten</h1>
      <h2>Ihre Daten</h2>
      <p>Falls Sie vor Kurzem eine Änderung Ihrer Daten beantragt haben, ist diese Anzeige ggf. noch nicht aktualisiert.</p>
    </v-flex>
    <v-flex xs12 md6>
      <v-text-field
        box
        label="Vorname"
        v-model="fields.firstName"
      />
    </v-flex>
    <v-flex xs12 md6>
      <v-text-field
        box
        label="Nachname"
        v-model="fields.lastName"
      />
    </v-flex>
    <v-flex xs12>
      <v-text-field
        box
        label="Straße / HNr."
        v-model="fields.address"
      />
    </v-flex>
    <v-flex xs12 md4>
      <v-text-field
        box
        label="PLZ"
        v-model="fields.zip"
      />
    </v-flex>
    <v-flex xs12 md8>
      <v-text-field
        box
        label="Ort"
        v-model="fields.location"
      />
    </v-flex>
      <v-flex v-for="(item, i) in fields.communications" :key="`${i}`" xs12>
        <v-text-field
          box
          :label="getLabelForCommunication(item)"
          v-model="item.value"
        >
          <template slot="prepend">
            <v-menu>
              <v-tooltip bottom slot="activator">
                <v-icon large slot="activator">{{ icons.communications.channel[item.channel] }}</v-icon>
                {{ labels.communications.channel[item.channel] }}
              </v-tooltip>
              <v-list>
                <v-list-tile
                  v-for="(icon, channel) in icons.communications.channel"
                  :key="channel"
                  @click="changeCommunication(item, 'channel', channel)"
                >
                  <v-list-tile-avatar>
                    <v-icon>{{ icon }}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-title>
                    {{ labels.communications.channel[channel] }}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-menu v-if="item.channel !== 'fax'">
              <v-tooltip bottom slot="activator">
                <v-icon large slot="activator">{{ icons.communications.publicness[item.publicness] }}</v-icon>
                {{ labels.communications.publicness[item.publicness] }}
              </v-tooltip>
              <v-list>
                <v-list-tile
                  v-for="(icon, publicness) in icons.communications.publicness"
                  :key="publicness"
                  @click="changeCommunication(item, 'publicness', publicness)"
                >
                  <v-list-tile-avatar>
                    <v-icon>{{ icon }}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-title>
                    {{ labels.communications.publicness[publicness] }}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </template>
          <template slot="append-outer">
            <v-icon large>add_circle</v-icon>
          </template>
        </v-text-field>
      </v-flex>
    <v-btn
      block
      :dark="formIsValid"
      :disabled="!formIsValid"
    >
      Speichern
    </v-btn>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface CommunicationItem {
  [key: string]: any;
  channel: string;
  publicness: string;
  value: any;
}

@Component({})
export default class PersonalDataEdit extends Vue {
  private fields: { [key: string]: any } = {};

  private validationRules = {
    mail: {
      email: true,
    },
    phone: {
      format: /^[+0-9]{3,6}\/?\d*/,
    },
    name: {
      presence: { allowEmpty: false },
      length: {
        minimum: 3,
      },
    },
    address: {
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
        private: 'person',
      },
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
    return this.fields.communications.filter((item: any) => item.value);
  }

  private get formIsValid() {
    return false;
  }

  private changeCommunication(item: CommunicationItem, type: 'channel'|'publicness', value: any) {
    if (type === 'channel') {
      const oldChannel = item.channel;
      if (value === 'fax') {
        item.publicness = '';
      } else if(oldChannel === 'fax') {
        item.publicness = 'private';
      }
    }
    item[type] = value;
  }

  private getLabelForCommunication(item: CommunicationItem) {
    // @ts-ignore
    const channelLabel = this.labels.communications.channel[item.channel];
    // @ts-ignore
    const publicnessLabel = item.channel !== 'fax' ? `(${this.labels.communications.publicness[item.publicness]})` : '';
    return `${channelLabel} ${publicnessLabel}`;
  }

  private created() {
    this.fields = {
      ...this.$store.state.userData.personal,
      communications: this.$store.state.userData.personal.communications
        .map(({ channel, publicness, value }: CommunicationItem) =>
          ({ channel, publicness, value })
        ),
    };
  }
}
</script>

