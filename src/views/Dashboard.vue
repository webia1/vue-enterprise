<template>
  <div>
    <v-toolbar height="48" color="dashcol" light app fixed clipped-left scroll-off-screen>
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
      <v-toolbar-items v-if="$store.state.userData.initialized">
        <v-btn to="/services" flat>
          <v-icon class="pr-2">
            dashboard
          </v-icon>
          Meine Services
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!env.isProd">
        <v-btn icon to="/dev">
          <v-icon>developer_board</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container grid-list-lg>
        <router-view></router-view>
      </v-container>
    </v-content>
  </div>
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

