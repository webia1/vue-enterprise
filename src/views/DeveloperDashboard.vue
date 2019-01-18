<template>
  <div>
    <v-card>
      <v-card-title>
        Actions
      </v-card-title>
      <v-card-text>
        <v-btn
          color="primary"
          @click="login()"
        >
          Sofort-Login
        </v-btn>
        <v-btn to="/showcase">Show Component Showcase</v-btn>
      </v-card-text>
    </v-card>
    <v-divider class="my-3" />
    <v-expansion-panel expand>
      <v-expansion-panel-content>
        <div slot="header">Address</div>
        <v-card>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 md4>
                <v-text-field
                  box
                  label="PLZ"
                  v-model="addressfields.zip"
                  @change="autoCity()"
                />
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field
                  box
                  label="Ort"
                  :disabled="addressfields.isFetching"
                  :loading="addressfields.isFetching"
                  v-model="addressfields.city"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">Geolocation</div>
        <v-card>
          <v-card-text>
            <v-btn @click="getPosition()">
              <v-icon>
                {{ icons.findLocation }}
              </v-icon>
            </v-btn>
            <pre>{{ position }}</pre>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">Mocking</div>
        <v-card>
          <v-card-text>
            <v-layout>
              <v-flex>
                <v-btn block @click="$store.dispatch('settings/enableMocks')">Enable all</v-btn>
              </v-flex>
              <v-flex>
                <v-btn block @click="$store.dispatch('settings/disableMocks')">Disable all</v-btn>
              </v-flex>
            </v-layout>
            <v-switch
              color="primary"
              label="Address Service"
              :input-value="$store.state.settings.enabledMocks"
              value="address"
              @change="toggleMock('address')"
            />
            <v-switch
              color="primary"
              label="Geolocation Service"
              :input-value="$store.state.settings.enabledMocks"
              value="geo"
              @change="toggleMock('geo')"
            />
            <v-switch
              color="primary"
              label="Reverse Geocoding"
              :input-value="$store.state.settings.enabledMocks"
              value="geocoding"
              @change="toggleMock('geocoding')"
            />
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">State</div>
        <v-card>
          <v-card-text>
            <v-expansion-panel>
              <v-expansion-panel-content>
                <div slot="header">Settings</div>
                <v-card>
                  <v-card-text>
                    <pre>{{ state(state => state.settings) }}</pre>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header">User Data</div>
                <v-card>
                  <v-card-text>
                    <p>is initialized: <code>{{ $store.state.userData.initialized | json }}</code></p>
                    <p>confirmationEmail: <code>{{ $store.state.userData.confirmationEmail | json }}</code></p>
                    <p>
                      is confirmationEmail used: <code>{{ $store.state.userData.confirmationEmailUsed | json }}</code><br>
                      <v-btn
                        v-if="!$store.state.userData.confirmationEmailUsed"
                        @click="useEmail"
                      >
                        use
                      </v-btn>
                    </p>
                    <v-expansion-panel>
                      <v-expansion-panel-content>
                        <div slot="header">Personal</div>
                        <v-card>
                          <v-card-text>
                            <pre>{{ state(state => state.userData.personal) | json(2) }}</pre>
                          </v-card-text>
                        </v-card>
                      </v-expansion-panel-content>
                      <v-expansion-panel-content>
                        <div slot="header">Bank</div>
                        <v-card>
                          <v-card-text>
                            <pre>{{ state(state => state.userData.bank) | json(2) }}</pre>
                          </v-card-text>
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">$vuetify</div>
        <v-card>
          <v-card-text>
            <v-expansion-panel>
              <v-expansion-panel-content>
                <div slot="header">Breakpoints</div>
                <v-card>
                  <v-card-text>
                    <pre>{{ $vuetify.breakpoint | json(2) }}</pre>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import countryField from '@/components/forms/country-field/CountryField.vue';
import { AddressService } from '@/globals/services/address';
import GeolocationService from '@/globals/services/geolocation';

import icons from '@/globals/icons';
import userData from '@/globals/userData';

@Component({
  components: {
    countryField,
  },
  filters: {
    json: (x: any, indent: number) => JSON.stringify(x, null, indent),
  },
})
export default class DeveloperDashboard extends Vue {
  private icons = icons;
  private position = {};
  private addressfields = {
    city: '',
    zip: '',
    isFetching: false,
  };

  /* actions */
  private login() {
    this.$store.dispatch('userData/initializeUserData', {
      ...userData,
      confirmationEmail: 'text@example.org',
    });
  }

  /* address */
  private autoCity() {
    this.addressfields.city = '';
    this.addressfields.isFetching = true;

    AddressService.findLocationByZipcode(this.addressfields.zip)
      .then((results: any[]) => {
        if (results.length === 1) {
          const [entry] = results;
          this.addressfields.city = entry.city;
        }
      })
      // tslint:disable-next-line
      .catch(console.error)
      .then(() => {
        this.addressfields.isFetching = false;
      });
  }

  /* geolocation */
  private getPosition(watch = false) {
    GeolocationService.position
      .then((position) => {
        this.position = position;
      });
  }

  /* mocking */
  private toggleMock(key: string) {
    this.$store.commit('settings/toggleMockData', key);
  }

  /* state */
  private state(partializer) {
    return typeof partializer === 'function' ? partializer(this.$store.state) : this.$store.state;
  }

  private useEmail() {
    this.$store.commit('userData/useConfirmationEmail');
  }
}
</script>

<style lang="stylus" scoped>
pre {
  white-space: pre-wrap;
}
</style>
