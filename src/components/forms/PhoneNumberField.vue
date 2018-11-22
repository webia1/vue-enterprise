<template>
  <v-flex>
    <v-layout>
      <v-flex xs3>
        <v-select
          box
          label="Landesvorwahl"
          :items="['+49', '+43']"
          v-model="countryCode"
        />
      </v-flex>
      <v-flex xs3>
        <v-text-field
          box
          label="Vorwahl"
          hint="ohne führende Null (0)"
          v-model="phoneNumberPrefix"
        />
      </v-flex>
      <v-flex xs6>
        <v-text-field
          box
          label="Rufnummer"
          v-model="phoneNumber"
        />
      </v-flex>
    </v-layout>
    <ul>
      <li>{{ initialCountryCode }}</li>
      <li>{{ initialPhoneNumber }}</li>
      <li>{{ initialPhoneNumberPrefix }}</li>
    </ul>
  </v-flex>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class PhoneNumberField extends Vue {
    @Prop({ default: '+4921108150815' }) private value?: string;

    private countryCodes: string[] = [
      '+49',
      '+43',
      '+39',
    ];
    private phoneNumberPrefixes: string[] = [
      '0?203',
      '0?211',
      '0?221',
      '0?341',
      '0?521',
      '0?30',
    ];

    private countryCode: string = '';
    private phoneNumber: string = '';
    private phoneNumberPrefix: string = '';

    private get initialCountryCode() {
      // return this.getMatchResult(this.countryCodes, code => code.replace('+', '\\+'), this.value) || '';
      return '';
    }

    private get initialPhoneNumber() {
      // return this.value
      //   .replace(this.initialCountryCode, '')
      //   .replace(this.initialPhoneNumberPrefix, '');
      return '';
    }

    private get initialPhoneNumberPrefix() {
      // return this.getMatchResult(this.phoneNumberPrefixes, code => code, this.value.replace(this.initialCountryCode, '')) || '';
      return '';
    }

    // private getMatchResult(arrayOfRegExStrings: string[], codeFormatter: Function, stringToSearch: string) {
    //   const result = arrayOfRegExStrings.reduce((acc: any, code: string) => {
    //     if (!acc) {
    //       const regExp = new RegExp(`^${codeFormatter(code)}`);
    //       return regExp.exec(stringToSearch);
    //     }
    //   }, null);
    //   if (result) {
    //     return result[0];
    //   }
    //   return null;
    // }
  }
</script>
