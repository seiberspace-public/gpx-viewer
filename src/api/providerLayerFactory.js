//------------------------------------------------------------------------------
function providerLayerFactory({ data }) {
  return L.tileLayer.provider(data);
}

export default providerLayerFactory;
