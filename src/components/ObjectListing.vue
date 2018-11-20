<template>
  <v-layout wrap>
    <template v-for="[key, value] in dataItems">
      <v-flex xs4>
        <v-label>
          {{ key }}
        </v-label>
      </v-flex>
      <v-flex xs8>
        {{ value }}
      </v-flex>
    </template>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  export type MaskFunction = (value: string) => string|null;

  @Component({})
  export default class ObjectListing extends Vue {
    @Prop() private data!: { [key: string]: any };
    @Prop() private masks?: any;

    get dataItems() {
      return Object.keys(this.data).map(key => {
        if (this.masks[key]) {
          const masked = this.masks[key](this.data[key]);
          return masked && [key, masked];
        }

        return [key, this.data[key]];
      });
    }
  }
</script>
