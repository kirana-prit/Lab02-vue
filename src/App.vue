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
      <div id="flashMessage" v-if="messages">
        <h4>{{ messages }}</h4>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{name :'event-list-view'}">Event</RouterLink>
          <RouterLink :to="{name: 'about'}">About</RouterLink>
        </nav>
      </div>
    </header>

  <RouterView />
  </div>

</template>

<style>

nav{
  padding: 30px;
}

nav a{
  font-weight: bold;
  color: #2c3e50;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

h2{
  font-size: 20px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

@keyframes yellofade{
  from{
    background-color: yellow;
  } to{
    background-color: transparent;
  }
}
#flashMessage {
  animation: yellofade 3s ease-in-out;
}
</style>
