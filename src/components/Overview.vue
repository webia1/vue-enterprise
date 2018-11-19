<template>
  <div>
    <h1>
      Lieber Kunde, was können wir heute
      für dich tun?
    </h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Overview extends Vue {
  @Prop()
  private msg!: string;
}
</script>


<style scoped lang="stylus">
h1 {
  margin: 40px 0 0;
  color: red;
}
</style>
