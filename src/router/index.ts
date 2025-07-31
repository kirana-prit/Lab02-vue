import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'

const saveScrollPosition = (path: string, position: number):void => {
  try {
    const scrollPositions = JSON.parse(localStorage.getItem('scrollPositions') || '{}');
    scrollPositions[path] = position;
    localStorage.setItem('scrollPositions', JSON.stringify(scrollPositions));
  } catch (error) {
    console.warn('Failed to save scroll position:', error);
  }
};

const getSavedScrollPosition = (path: string): number|null => {
  try {
    const scrollPositions = JSON.parse(localStorage.getItem('scrollPositions') || '{}');
    return scrollPositions[path] || null;
  } catch (error) {
    console.warn('Failed to get saved scroll position:', error);
    return null;
  }
};
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({page: parseInt(route.query.page?.toString() || '1')})
    },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: EventLayoutView,
      props: true, // Allows route params to be passed as props to the component
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string);
        const eventStore = useEventStore();
        return EventService.getEvent(id)
          .then((response) => {
            //need to setup the data for the event
            eventStore.setEvent(response.data);
          })
          .catch((error)=>{
            if (error.response && error.response.status === 404){
              return {
                name: '404-resource-view',
                params: { resource: 'event' }
              }
            } else{
              return { name: 'network-error-view' }
            }
          })
      },
      children:[
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true, // Allows route params to be passed as props to the component
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView,
          props: true, // Allows route params to be passed as props to the component
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
          props: true, // Allows route params to be passed as props to the component
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path:'/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true, // Allows route params to be passed as props to the component
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView,
    },
  ],
 scrollBehavior(to, from, savedPosition) {
    console.log('scrollBehavior called', { to, from, savedPosition });

    return new Promise((resolve) => {
      // If there's a savedPosition from browser back/forward, use it
      if (savedPosition) {
        // Wait for next tick to ensure page is rendered
        setTimeout(() => {
          console.log('Restoring browser savedPosition:', savedPosition);
          resolve(savedPosition);
        }, 0);
        return;
      }

      // Check if there's a saved scroll position for this route
      const savedScrollPosition = getSavedScrollPosition(to.fullPath);
      if (savedScrollPosition) {
        // Wait a bit longer for content to load
        setTimeout(() => {
          console.log('Restoring saved scroll position:', savedScrollPosition);
          resolve({ top: savedScrollPosition, behavior: 'smooth' });
        }, 100);
        return;
      }

      // Default to top of page
      setTimeout(() => {
        console.log('Scrolling to top');
        resolve({ top: 0 });
      }, 0);
    });
  }
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(()=>{
  nProgress.done()
})

// Save scroll position when navigating between routes
router.beforeEach((to, from) => {
  if (from.fullPath !== '/') { // Don't save for initial navigation
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Only save if scroll position is meaningful (> 0) OR if we don't have a saved position yet
    // This prevents overwriting a good scroll position with 0 when navigating from short pages
    const existingSavedPosition = getSavedScrollPosition(from.fullPath);
    if (scrollPosition > 0 || existingSavedPosition === null) {
      saveScrollPosition(from.fullPath, scrollPosition);
    }
  }
});

// Auto-save scroll position periodically (every 2 seconds)
let autoSaveInterval: number | null = null;

const startAutoSave = (): void => {
  if (autoSaveInterval) return; // Prevent multiple intervals

  autoSaveInterval = setInterval(() => {
    const currentPath = router.currentRoute.value.fullPath;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Always auto-save during periodic updates, but still use smart logic for navigation
    if (scrollPosition > 0) {
      saveScrollPosition(currentPath, scrollPosition);
      console.log(`Auto-saved scroll position for ${currentPath}: ${scrollPosition}`);
    }
  }, 2000); // Save every 2 seconds
};

const stopAutoSave = (): void => {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
    autoSaveInterval = null;
  }
};

// Start auto-save when router is ready
router.isReady().then(() => {
  startAutoSave();
});

// Save scroll position before page unload (for page refresh) and clean up
window.addEventListener('beforeunload', () => {
  const currentPath = router.currentRoute.value.fullPath;
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  // Always save on page unload, even if position is 0
  saveScrollPosition(currentPath, scrollPosition);
  console.log(`Saved scroll position on unload for ${currentPath}: ${scrollPosition}`);
  stopAutoSave();
});

// Also save on scroll events (debounced)
let scrollTimeout: number | null = null;

const debouncedScrollSave = (): void => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  scrollTimeout = setTimeout(() => {
    const currentPath = router.currentRoute.value.fullPath;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > 0) {
      saveScrollPosition(currentPath, scrollPosition);
    }
  }, 500); // Save 500ms after user stops scrolling
};

window.addEventListener('scroll', debouncedScrollSave, { passive: true });

export default router
