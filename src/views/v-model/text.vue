<template>
  <h2>
    文本 (Text)
    <a
      href="https://v3.cn.vuejs.org/guide/forms.html#%E6%96%87%E6%9C%AC-text"
      target="_blank"
      rel="noopener noreferrer"
      >文档
    </a>
  </h2>

  <input v-model="message" placeholder="edit me" />

  <p>Message is: {{ message }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const message = ref('')
</script>
