<script setup lang="ts">
  import EventCard from '@/components/EventCard.vue';
  import  {type Event } from '@/types';
  import { ref, onMounted, computed, watchEffect,watch } from 'vue';
  import EventService from '@/services/EventService';
  import { useRoute } from 'vue-router';
  const events = ref<Event[] | null>(null);
  const route = useRoute();

  const page = ref(parseInt(route.query.page as string) || 1);
  const size = ref(parseInt(route.query.size as string) || 2);
  const totalEvents = ref(0);
  const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalEvents.value / size.value);
    return page.value < totalPages;
  });

  onMounted(()=>{
   loadEvents();
  });
  watch(() => route.query, (newQuery) => {
  page.value = parseInt(newQuery.page as string) || 1;
  size.value = parseInt(newQuery.size as string) || 2;
  loadEvents();
});
const loadEvents = () => {
  EventService.getEvents(size.value, page.value)
    .then(response => {
      events.value = response.data;
      totalEvents.value = parseInt(response.headers['x-total-count']);
    });
};
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <RouterLink id="page-prev" :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page > 1">
        &#60;Prev Page
      </RouterLink>
      <RouterLink id="page-next" :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage">
        Next Page &#62;
      </RouterLink>
    </div>
    <div class="page-size-links">
  <span>Events per page:</span>
  <RouterLink
    v-for="option in [2, 5, 10]"
    :key="option"
    :to="{ name: 'event-list-view', query: { page: 1, size: option } }"
    :class="{ active: size === option }"
  >
    {{ option }}
  </RouterLink>
</div>

  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination{
  display: flex;
  width: 290px;
}
.pagination a{
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev{
  text-align: left;
}
#page-next{
  text-align: right;
}
.page-size-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.page-size-links a {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-decoration: none;
  background: #eee;
  color: #333;
}

.page-size-links a.active {
  background: #333;
  color: #fff;
  font-weight: bold;
}

</style>
