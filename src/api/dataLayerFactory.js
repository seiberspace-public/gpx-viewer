import startIconUrl from 'leaflet-gpx/pin-icon-start.png';
import endIconUrl from 'leaflet-gpx/pin-icon-end.png';
import shadowUrl from 'leaflet-gpx/pin-shadow.png';
import wptIconUrl from 'leaflet-gpx/pin-icon-wpt.png';

const GPX_OPTIONS = {
  marker_options: {
    startIconUrl,
    endIconUrl,
    shadowUrl,
    wptIconUrls: {
      '': wptIconUrl,
    },
  },
  async: true,
};

let lastId = 0;

//------------------------------------------------------------------------------
export function createId() {
  lastId += 1;
  return lastId;
}

//------------------------------------------------------------------------------
export function loadGpx(gpx) {
  return new Promise((resolve, reject) => {
    const layer = new L.GPX(gpx, GPX_OPTIONS);

    layer.on('error', (event) => {
      const error = new Error(event.err);
      error.name = 'GpxError';
      reject(error);
    });

    layer.on('loaded', (event) => {
      resolve(event.target);
    });
  });
}

//------------------------------------------------------------------------------
function dataLayerFactory(layer) {
  return layer.data;
}

export default dataLayerFactory;
