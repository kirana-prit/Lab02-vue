<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
const store = useMessageStore();
const { messages } = storeToRefs(store);
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialiased">
    <!-- text-center: center the text within the element
          font-sans: use a sans-serif font
          text-gray-700: set the text color to a medium gray
          antialiased: apply antialiasing for smoother text rendering -->
    <header>
      <div id="flashMessage" class="animate-fade" v-if="messages">
        <h4>{{ messages }}</h4>
      </div>
      <div class="wrapper">
        <nav class="py-6">
          <RouterLink class="font-bold text-grey-700" :to="{name :'event-list-view'}">Event</RouterLink>
          <RouterLink class="font-bold text-grey-700" :to="{name: 'about'}">About</RouterLink>
        </nav>
      </div>
    </header>

  <RouterView />
  </div>

</template>

