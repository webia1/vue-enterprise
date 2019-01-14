<template>
  <v-content>
    <v-alert
      v-if="error === 1"
      type="error"
      :value="true"
    >
      Um den aktuellen Standort anzeigen zu können, müssen Sie dem Browser die Verwendung der Geolocation API erlauben.
    </v-alert>
    <v-alert
      v-else-if="error === 2"
      type="error"
      :value="true"
    >
      Der aktuelle Standort ist nicht verfügbar.
    </v-alert>
    <v-alert
      v-else-if="error === 3"
      type="error"
      :value="true"
    >
      Die Geolocation API konnte den aktuellen Standort nicht ermitteln.
    </v-alert>
    <v-alert
      v-else-if="error !== 0"
      type="error"
      :value="true"
    >
      <!-- <span v-if="typeof error === 'string'">{{ error }}</span> -->
      <span>
        Beim Ermitteln des Standortes ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.
      </span>
    </v-alert>
    <dl v-if="coords" v-show="error">
      <dt>Latitude</dt>
      <dd>{{ coords.latitude }}</dd>
      <dt>Longitude</dt>
      <dd>{{ coords.longitude }}</dd>
    </dl>
    <v-card v-if="address">
      <v-card-title>
        <h3 class="red--text text--darken-3">
          Ihr Standort
        </h3>
      </v-card-title>
      <v-card-text>
        <span v-if="address.road">{{ address.road }}</span>&nbsp;<span v-if="address.house_number">{{ address.house_number }}</span><br />
        <span v-if="address.city">{{ address.postcode }} {{ address.city }}</span>
      </v-card-text>
    </v-card>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import axios from 'axios';
import GeolocationService from '@/globals/services/geolocation';

@Component({})
export default class Geolocation extends Vue {
  private coords: any = null;
  private address = '';
  private error = 0;

  mounted() {
    GeolocationService.watchPosition()
      .subcribe(
        (position) => {
          this.coords = position.coords;
          this.address = position;
        },
        ({ error, coords }) => {
          this.error = error.code;
          if (coords) {
            this.coords = coords;
          }
        }
      );
  }
}
</script>
