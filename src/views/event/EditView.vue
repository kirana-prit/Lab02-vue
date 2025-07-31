<script setup lang="ts">
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import { type Event } from '@/types';

const props = defineProps<{
  event: Event
}>();
const { event } = toRefs(props);

const router = useRouter();
const messageStore = useMessageStore();

const goToDetailWithMessage = () => {
  messageStore.updateMessage('Data has been updated');
  setTimeout(() => {
    messageStore.resetMessage();
  }, 3000);
  router.push({ name: 'event-detail-view' });
};
</script>

<template>
  <div>
    <p>Edit event here</p>

    <!-- Add the button to go back to details and show flash message -->
    <button @click="goToDetailWithMessage">Back to Detail</button>
  </div>
</template>
