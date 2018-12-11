<template>
  <v-layout>
    <v-flex>
      <v-card class="pa-3">
        <v-card-title>
          <h2 class="red--text text--darken-3 mb-0">Offener Kundenservice Bereich</h2>
        </v-card-title>
        <v-card-text>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam cupiditate aliquam quasi excepturi voluptas voluptates. Alias facilis perferendis dicta at.</p>
          <p>Qui, adipisci tenetur. Praesentium, mollitia eaque accusantium cupiditate tenetur hic nobis perferendis doloribus molestias! Iste reprehenderit ut corporis mollitia incidunt!</p>
          <p>A illum rem quasi quidem explicabo, fugit quia accusantium velit deleniti ab quos eaque labore quis eveniet porro dolorem adipisci.</p>
        </v-card-text>
      </v-card>

      <div class="mt-5"></div>
      <h3 class="my-2 font-weight-bold">Ihre persönlichen Services</h3>
      <v-layout wrap>
        <v-flex xs12 md6>
          <v-card class="pa-3">
            <v-card-title>
              <h3 class="red--text text--darken-3">Kontaktdaten ändern</h3>
            </v-card-title>
            <v-card-text>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, ut placeat tempora ipsam unde quis!</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                dark
                color="primary"
                to="/change/contact"
              >
                <v-icon>{{ icons.cta }}</v-icon>
                Kontaktdaten bearbeiten
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card class="pa-3">
            <v-card-title>
              <h3 class="red--text text--darken-3">Bankverbindung ändern</h3>
            </v-card-title>
            <v-card-text>
              <p>At aut deleniti officiis ipsam voluptatum error fugit ipsa? Rem nulla numquam soluta nemo sit!</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                disabled
                color="primary"
                to="/change/bank"
              >
                <v-icon>{{ icons.cta }}</v-icon>
                Bankdaten bearbeiten
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

      <div class="mt-5"></div>
      <QuickServices />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  import QuickServices from '@/components/QuickServices.vue';
  import icons from '@/globals/icons';

  @Component({
    components: {
      QuickServices,
    },
  })
  export default class Overview extends Vue {
    private icons = icons;
  }
</script>

