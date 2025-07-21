<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { type Event } from '@/types';
import EventService from '@/services/EventService';
const router = useRouter();
const event = ref<Event | null>(null);
const props = defineProps({
  id: {
    type: String,
    required: true
  }
});
onMounted(() => {
  EventService
    .getEvent(parseInt(props.id))
    .then((response) => {
      event.value = response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        router.push({
          name: '404-resource-view',
          params: { resource: 'event' }
        });
      } else {
        router.push({ name: 'network-error-view' });
      }
    });
});
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{ name: 'event-detail-view' }">Details</router-link>
      <router-link :to="{ name: 'event-register-view' }">Register</router-link>
      <router-link :to="{ name: 'event-edit-view' }">Edit</router-link>
    </nav>
    <router-view :event="event" />
  </div>
</template>
