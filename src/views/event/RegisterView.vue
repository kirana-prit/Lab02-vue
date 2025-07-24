<script setup lang="ts">
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import {useMessageStore} from '@/stores/message';
import {type Event} from '@/types';
const store = useMessageStore();
const props = defineProps<{
  event: Event
}>();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props);
const router = useRouter();
const register = () => {
  store.updateMessage('You are successfully registered for '+ event.value.title);
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: event.value.id } });
}
</script>
<template>
  <p>Register event here</p>
  <button @click="register">Register</button>
</template>
