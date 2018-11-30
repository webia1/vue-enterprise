<template>
  <v-layout>
    <v-flex>
      <div>
        <h1>
          Lieber Kunde, was können wir heute
          für dich tun?
        </h1>
      </div>
      <div>
        <v-btn
          block
          dark
          large
          color="primary"
          to="data/personal/edit"
        >
          Kundendaten ändern
        </v-btn>
        <v-btn
          block
          disabled
          large
          color="primary"
        >
          Meine Versicherungen
        </v-btn>
      </div>
      <div>
        <v-btn
          block
          dark
          large
          color="primary"
          to="/data"
        >
          Meine Daten
        </v-btn>
      </div>
      <div>
        <v-btn
          block
          disabled
          large
          color="primary"
        >
          Mein Fall
        </v-btn>
      </div>
      <div>
        <v-btn
          block
          disabled
          large
          color="primary"
        >
          Filialen in meiner Nähe
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class Overview extends Vue {
    @Prop()
    private msg!: string;
  }
</script>
