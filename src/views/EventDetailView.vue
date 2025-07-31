<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import { useMessageStore } from '@/stores/message';
import { type Event } from '@/types';
import EventService from '@/services/EventService';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const event = ref<Event | null>(null);

// Flash message store
const messageStore = useMessageStore();
const { messages } = storeToRefs(messageStore);

onMounted(() => {
  EventService
    .getEvent(parseInt(props.id))
    .then((response) => {
      event.value = response.data;
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
});
</script>
<template>
  <div v-if="event">
    <header>
      <div id="flashMessage" v-if="messages">
        <h4>{{ messages }}</h4>
      </div>
    </header>
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
