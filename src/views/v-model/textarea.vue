<template>
  <h2>
    多行文本 (Textarea)
    <a
      href="https://v3.cn.vuejs.org/guide/forms.html#%E5%A4%9A%E8%A1%8C%E6%96%87%E6%9C%AC-textarea"
      target="_blank"
      rel="noopener noreferrer"
      >文档
    </a>
  </h2>

  <span>Multiline message is:</span>
  <p style="white-space: pre-line">{{ message }}</p>
  <br />
  <textarea v-model="message" placeholder="add multiple lines"></textarea>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const message = ref('')
</script>
