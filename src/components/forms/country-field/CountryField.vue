<template>
  <v-select
    box
    :items="countries"
    label="Land"
    :value="value"
    @input="$emit('input', value)"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import countries from './countries.json';

@Component({})
export default class CountryField extends Vue {
  @Prop({ default: true }) extendable;
  @Prop({ default: 'Deutschland' }) value;
  private countries = countries;

  private sortSelection() {
    this.countries.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;

      return 0;
    });
  }

  created() {
    this.sortSelection();
  }

  updated() {
    if (this.countries.indexOf(this.value) === -1 && this.extendable) {
      this.countries.push(this.value);
      this.sortSelection();
    }
  }
}
</script>
