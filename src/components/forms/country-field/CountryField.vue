<template>
  <v-select
    box
    :items="countries"
    label="Land"
    v-model="country"
    @input="$emit('input', country)"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import countries from './countries.json';

@Component({})
export default class CountryField extends Vue {
  @Prop({ default: 'Deutschland' }) preset;
  private countries = countries;
  private country = '';

  mounted() {
    this.country = this.preset;
  }
}
</script>
