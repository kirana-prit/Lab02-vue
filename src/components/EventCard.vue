<script setup lang="ts">
import {type Event} from '@/types';
 defineProps<{
   event: Event
 }>()
// const event = ref({
//   id: 5928101,
//   category: 'animal welfare',
//   title:'Cat Adoption Day',
//   description: 'Find your new feline friend at this event',
//   location:'Meow Town',
//   date:'January 28, 2022',
//   time:'12:00',
//   petsAllowed: true,
//   organizer:'Kat Laydee'
// })
</script>

<template>
  <RouterLink class="event-link" :to="{ name: 'event-detail-view', params: { id: event.id } }">
    <div class="cursor-pointer border border-grey-600 p-4 w-64 mb-6 hover: scale-101 hover: shadow-sp">
      <!-- cursor-pointer: change the mouse cursor to pointer
            border: add a border around the element
            border-grey-600: set the border color to a medium gray
            p-4: add padding of 1rem (16px) on all sides
            w-64: set the width to 16rem (256px)
            mb-6: add a bottom margin of 1.5rem (24px)
            hover: scale-101: slightly enlarge the element on hover
            hover: shadow-sp: apply a small shadow effect on hover -->
      <h2>{{ event.title }}</h2>
      <span>@{{ event.time }} on {{ event.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.event-card {
  border: 1px solid #39495c;
  padding: 20px;
  width: 250px;
  margin-bottom: 18px;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.event-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
