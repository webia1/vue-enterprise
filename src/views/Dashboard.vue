<template>
  <div>
    <v-navigation-drawer fixed clipped app v-model="drawer" disable-resize-watcher>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/women/86.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Maxima Musterfrau</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense>
        <template v-for="(item, i) in sideBoardItems">
          <v-layout row v-if="item.heading" align-center :key="i">
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat>edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider dark v-else-if="item.divider" class="my-3" :key="i"></v-divider>
          <v-list-tile :key="i" v-else>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar height="48" color="red" dark app fixed clipped-left scroll-off-screen>
      <v-toolbar-side-icon @click.native="drawer = !drawer" />
      <v-toolbar-title class="white--text">Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mainMenu } from '@/globals/data/menus/mainMenu.ts';

@Component
export default class Dashboard extends Vue {
  public drawer: boolean = false;
  public sideBoardItems = [
    { icon: 'settings', text: 'Einstellungen' },
    { icon: 'help', text: 'Hilfe' },
    { icon: 'keyboard', text: 'Keyboard shortcuts' },
  ];
}
</script>