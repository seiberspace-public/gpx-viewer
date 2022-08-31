import {
  LS_GDPR_AGREED,
  LS_MAP_VIEW,
} from 'src/constants.js';
import useLocalStorage from 'api/useLocalStorage.js';

//------------------------------------------------------------------------------
function getViewFromGeolocation() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      resolve({
        lat: coords.latitude,
        lng: coords.longitude,
        zoom: 10,
      });
    }, () => resolve(null));
  });
}

//------------------------------------------------------------------------------
export function gdprRequired() {
  const agreed = useLocalStorage(LS_GDPR_AGREED, false).value;
  if (!agreed) {
    return {
      name: 'index',
    };
  }
  return true;
}

//------------------------------------------------------------------------------
export function redirectToMap() {
  const agreed = useLocalStorage(LS_GDPR_AGREED, false).value;
  if (agreed) {
    return '/map';
  }
  return true;
}

//------------------------------------------------------------------------------
export async function redirectToPosition(to) {
  const { params } = to;
  if ((typeof params.lat === 'undefined') || (typeof params.lng === 'undefined') || (typeof params.zoom === 'undefined')) {
    // Redirect to location-URL - possibly geolocation.
    const view = await getViewFromGeolocation();
    const routeParams = view || useLocalStorage(LS_MAP_VIEW).value;
    return {
      name: 'map',
      params: routeParams,
    };
  }

  return true;
}

//------------------------------------------------------------------------------
function guardRoute(...guards) {
  return async (...args) => {
    for (const guard of guards) {
      const ret = await guard(...args);
      if (ret !== true) {
        return ret;
      }
    }
    return true;
  };
}

export default guardRoute;
