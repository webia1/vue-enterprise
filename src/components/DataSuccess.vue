<template>
  <v-layout>
    <v-flex>
      <h1>
        Vielen Dank, deine Daten wurden
        erfolgreich angepasst.
      </h1>
      <template v-if="addressChanged">
        <p>
          Bei folgenden Versicherungen bitten wir dich
          weitere Informationen zu ergänzen:
        </p>
        <p>
          <v-btn
            to="/"
          >
            Hausratversicherung
          </v-btn>
        </p>
        <p>
          Für die angefragten Änderungen benötigen wir circa
          <strong>zusätzliche 5 Minuten</strong> deiner Zeit.
          Möchtest du diese weiteren Informationen gleich erledigen oder
          lieber zu einem späteren Zeitpunkt anpassen?
        </p>
        <div>
          <v-btn dark color="green">Jetzt ergänzen</v-btn>
          <v-btn dark color="blue" to="/data">Später</v-btn>
        </div>
      </template>
      <v-btn
        dark
        color="red"
        to="/data"
        v-else
      >
        Weiter
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class DataSuccess extends Vue {
    @Prop() private addressChanged?: boolean;
  }
</script>
