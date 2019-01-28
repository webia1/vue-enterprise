<template>
  <v-container grid-list-lg>
    <v-toolbar
      app
      flat
      height="72"
      class="pa-0"
      main-toolbar
    >
      <v-toolbar-title>
        <router-link
          class="mr-4 primary--text text--darken-3 font-weight-bold"
          style="cursor: pointer"
          tag="span"
          to ="/"
        >
          {{ env.title }}
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items>
        <!-- <v-btn flat>
          Produkte
        </v-btn>
        <v-btn flat>
          Verstehen
        </v-btn> -->
        <v-btn flat to="/services">
          Kundebereich
        </v-btn>
      </v-toolbar-items>
      <!-- <v-toolbar-items v-if="$store.state.userData.initialized">
        <v-btn flat to="/services">
          <v-icon small class="pr-2">
            dashboard
          </v-icon>
          Meine Services
        </v-btn>
      </v-toolbar-items> -->
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!env.isProd">
        <!-- <v-btn icon small to="/dev">
          <v-icon small color="teal">code</v-icon>
        </v-btn>
        <v-btn icon>
          {{ $vuetify.breakpoint.name }}
        </v-btn> -->
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import env from '@/globals/environment';

  @Component
  export default class Dashboard extends Vue {
    private env = env;

    private drawer: boolean = false;
    private sideBoardItems = [
      { icon: 'settings', text: 'Einstellungen' },
      { icon: 'help', text: 'Hilfe' },
      { icon: 'keyboard', text: 'Keyboard shortcuts' },
    ];
  }
</script>

<style lang="stylus">

  @import "../styles/main.styl";

</style>

