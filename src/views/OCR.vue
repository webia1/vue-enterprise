<template>
  <div>
    <input type="file" ref="ocr" @change="ocr($event)">
    <div v-html="image"></div>
    <div v-html="result"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Tesseract from 'tesseract.js/dist/tesseract.min.js';

@Component({})
export default class OCR extends Vue {
  private image: any = null;
  private result = '';

  private ocr(evt) {
    const file = evt.target.files[0];
    this.image = new Image(file);
    Tesseract.recognize(file, {
      lang: 'deu',
    })
      .then((result) => {
        this.result = result.html;
      });
  }
}
</script>
