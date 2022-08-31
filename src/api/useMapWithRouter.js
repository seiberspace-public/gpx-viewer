import { watch } from 'vue';
import {
  useRouter,
  onBeforeRouteUpdate,
} from 'vue-router';

//------------------------------------------------------------------------------
function viewFromRoute({ params }) {
  if ((typeof params.lat !== 'undefined') && (typeof params.lng !== 'undefined') && (typeof params.zoom !== 'undefined')) {
    return {
      lat: parseFloat(params.lat),
      lng: parseFloat(params.lng),
      zoom: parseFloat(params.zoom),
    };
  }
  return null;
}

//------------------------------------------------------------------------------
// Two-way-binding between router and leaflet map position.
// Primitive, but does the job of preventing infinite loops by skipping the next
// update.
function useMapWithRouter({ view, onMapReady }) {
  const router = useRouter();

  let skipNextRouteUpdate = false;
  let skipNextViewUpdate = false;

  function updateRouteFromView(newView) {
    if (skipNextRouteUpdate) {
      skipNextRouteUpdate = false;
      return;
    }

    skipNextViewUpdate = true;
    router.push({
      name: 'map',
      params: {
        ...newView,
      },
    });
  }

  function updateViewFromRoute(route, skipUpdate) {
    if (skipNextViewUpdate) {
      skipNextViewUpdate = false;
      return;
    }

    skipNextRouteUpdate = skipUpdate;
    const newView = viewFromRoute(route) || {
      lat: 0,
      lng: 0,
      zoom: 1,
    };
    view.value = newView;
  }

  watch(view, updateRouteFromView, { deep: true });
  onBeforeRouteUpdate((to) => updateViewFromRoute(to, true));
  onMapReady(() => updateViewFromRoute(router.currentRoute.value, false));
}

export default useMapWithRouter;
