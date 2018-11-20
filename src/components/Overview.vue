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
          dark
          color="red"
          to="/identify"
        >
          Meine Versicherungen
        </v-btn>
      </div>
      <div>
        <v-btn
          dark
          color="red"
          to="/identify"
        >
          Meine Daten
        </v-btn>
      </div>
      <div>
        <v-btn
          dark
          color="red"
          to="/identify"
        >
          Mein Fall
        </v-btn>
      </div>
      <div>
        <v-btn
          dark
          color="red"
          to="/identify"
        >
          Ergo in meiner Nähe
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Overview extends Vue {
    @Prop()
    private msg!: string;
  }
</script>
