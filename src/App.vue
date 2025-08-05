<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
const store = useMessageStore();
const { messages } = storeToRefs(store);
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="messages">
        <h4>{{ messages }}</h4>
      </div>
      <div class="wrapper">
        <nav class="py-6">
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{name :'event-list-view'}">Event</RouterLink>
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"  :to="{name: 'about'}">About</RouterLink>
        </nav>
      </div>
    </header>

  <RouterView />
  </div>

</template>

<style>

</style>
