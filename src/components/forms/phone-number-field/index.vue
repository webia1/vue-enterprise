<template>
  <v-layout>
    <template v-if="mode === 'modern'">
      <v-flex xs2>
        <!-- <v-select
          box
          label="Landesvorwahl"
          :items="countryCodes"
          :rules="[isValid('countryCode')]"
          v-model="countryCode"
          @input="emitValue()"
        /> -->
        <v-menu
          full-width
          :open-on-click="false"
          v-model="showCountryCodeSelection"
        >
          <v-text-field
            box
            append-icon="arrow_drop_down"
            label="Landesvorwahl"
            v-model="countryCode"
            slot="activator"
            @paste="formatCountryCode()"
            @input="emitValue()"
            @blur="formatCountryCode()"
            @click:append="openCountryCodeSelection()"
          />
          <v-list>
            <v-list-tile
              v-for="code in countryCodes"
              :key="code"
              @click="countryCode = code"
            >
              <v-list-tile-title>
                {{ code }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          box
          label="Vorwahl"
          hint="ohne führende Null (0)"
          :rules="[isValid('prefix')]"
          v-model="prefix"
          @input="emitValue()"
        />
      </v-flex>
      <v-flex xs6>
        <v-text-field
          box
          label="Rufnummer"
          :rules="[isValid('phoneNumber')]"
          v-model="phoneNumber"
          @input="emitValue()"
        />
      </v-flex>
    </template>
    <template v-else-if="mode === 'classic'">
      <v-flex xs11>
        <v-text-field
          box
          label="Telefonnummer"
          v-model="fullValue"
        />
      </v-flex>
    </template>
    <v-flex xs1>
      <v-tooltip
        bottom
      >
        <v-btn
          icon
          large
          slot="activator"
        >
          <v-icon
            @click="changeMode()"
          >
            edit
          </v-icon>
        </v-btn>
        Change edit mode
      </v-tooltip>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import validate from 'validate.js';

  import countryCodes from './countryCodes.json';

  @Component({
    filters: {
      formatCountryCode: a => a.replace(/^00/g, '+'),
    },
  })
  export default class PhoneNumberField extends Vue {
    private mode: 'modern' | 'classic' = 'modern';
    private countryCodes = countryCodes
    private countryCode = '';
    private prefix = '';
    private phoneNumber = '';
    private fullValue = '';
    private errors = {};
    private showCountryCodeSelection = false;

    private get countryCodeField() {
      if (!this.$refs.countryCodeField) return null;

      return (this.$refs.countryCodeField as any).$el;
    }

    private validationConstraints = {
      countryCode: {
        format: {
          pattern: /^\+\d{2,}/,
          message: 'Landesvorwahl ist ungültig!',
        },
      },
      prefix: {
        format: {
          pattern: /\d{3,4}/,
          message: 'Vorwahl ist ungültig!',
        },
      },
      phoneNumber: {
        format: {
          pattern: /\d{4,}/,
          message: 'Rufnummer ist ungültig!',
        },
      },
    };

    private changeMode() {
      this.mode = (this.mode === 'modern' && 'classic') || 'modern';
    }

    private isValid(fieldName: string) {
      return () => {
        if (this[fieldName] !== '' && this.errors[fieldName]) {
          return this.errors[fieldName][0];
        }

        return true;
      }
    }

    private emitValue() {
      this.formatCountryCode();
      const errors = validate({
        countryCode: this.countryCode,
        prefix: this.prefix,
        phoneNumber: this.phoneNumber,
      }, this.validationConstraints, { fullMessages: false });
      if (!errors) {
        this.errors = {};
        this.$emit('input', `${this.countryCode}${this.prefix}${(this.countryCode || this.prefix) && this.phoneNumber ? '/': ''}${this.phoneNumber}`);
      } else {
        this.errors = errors;
        this.$emit('input', null);
      }
    }

    private formatCountryCode() {
      this.countryCode = (this.$options.filters as any).formatCountryCode(this.countryCode);
    }

    private openCountryCodeSelection() {
      this.showCountryCodeSelection = true;
    }
  }
</script>
