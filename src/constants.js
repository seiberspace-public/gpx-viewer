// Local storage keys:
export const LS_APP_VERSION = 'app.version';

export const LS_UI_DATALAYERS_EXPANDED = 'ui.datalayers.expanded';
export const LS_UI_PROVIDERLAYERS_EXPANDED = 'ui.providerlayers.expanded';
export const LS_UI_LOCALE = 'ui.locale';
export const LS_UI_OPTIONS_EXPANDED = 'ui.options.expanded';
export const LS_UI_LOCATION_CURSOR_VISIBLE = 'ui.location_cursor.visible';

export const LS_MAP_PROVIDERS = 'map.providers';
export const LS_MAP_VIEW = 'map.view';
export const LS_GDPR_AGREED = 'gdpr.agreed';

export const DEFAULT_PROVIDERS = [
  {
    data: 'OpenStreetMap.Mapnik',
    visible: true,
  },
];

export const DEFAULT_VIEW = {
  lat: 0,
  lng: 0,
  zoom: 1,
};

export const DEFAULT_MAP_OPTIONS = {
  attributionControl: false,
  zoomControl: false,
};
