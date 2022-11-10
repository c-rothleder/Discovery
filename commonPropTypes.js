import PropTypes from 'prop-types';

const originPropType = PropTypes.shape({
  accuracy: PropTypes.number,
  altitude: PropTypes.number,
  altitudeAccuracy: PropTypes.number,
  heading: PropTypes.number,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  speed: PropTypes.number,
});

const destinationPropType = PropTypes.shape({
  latitude: PropTypes.number,
  longitude: PropTypes.number,
});

const navigationPropType = PropTypes.shape({
  addListener: PropTypes.func,
  canGoBack: PropTypes.func,
  dangerouslyGetParent: PropTypes.func,
  dangerouslyGetState: PropTypes.func,
  dispatch: PropTypes.func,
  goBack: PropTypes.func,
  isFocused: PropTypes.func,
  navigate: PropTypes.func,
  pop: PropTypes.func,
  popToTop: PropTypes.func,
  push: PropTypes.func,
  removeListener: PropTypes.func,
  replace: PropTypes.func,
  reset: PropTypes.func,
  setOptions: PropTypes.func,
  setParams: PropTypes.func,
});

const addressType = PropTypes.shape({
  city: PropTypes.string,
  countryCode: PropTypes.string,
  countryName: PropTypes.string,
  county: PropTypes.string,
  houseNumber: PropTypes.string,
  label: PropTypes.string,
  postalCode: PropTypes.string,
  state: PropTypes.string,
  stateCode: PropTypes.string,
  street: PropTypes.string,
});

const contactType = PropTypes.arrayOf(PropTypes.shape({
  value: PropTypes.string,
}));

const supplierType = PropTypes.shape({
  id: PropTypes.string,
});

const positionType = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number,
});

const foodType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  primary: PropTypes.bool,
});

const hereLocationPropType = PropTypes.shape({
  access: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number, lng: PropTypes.number,
  })),
  address: addressType,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    primary: PropTypes.bool,
  })),
  chains: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  contacts: PropTypes.arrayOf(PropTypes.shape({
    fax: contactType,
    phone: contactType,
    www: contactType,
  })),
  distance: PropTypes.number,
  foodTypes: PropTypes.arrayOf(foodType),
  id: PropTypes.string,
  openingHours: PropTypes.arrayOf(PropTypes.shape({
    isOpen: PropTypes.bool,
    structured: PropTypes.arrayOf(PropTypes.shape({
      duration: PropTypes.string,
      recurrence: PropTypes.string,
      start: PropTypes.string,
    })),
    text: PropTypes.arrayOf(PropTypes.string),
  })),
  position: positionType,
  references: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    supplier: supplierType,
  })),
  resultType: PropTypes.string,
  title: PropTypes.string,
});

const actionObj = PropTypes.shape({
  action: PropTypes.string,
  duration: PropTypes.number,
  instruction: PropTypes.string,
  offset: PropTypes.number,
});

const placeType = PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  location: positionType.isRequired,
  id: PropTypes.string,
});

const routeSectionsPropType = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(actionObj),
  polyline: PropTypes.string.isRequired,
  departure: PropTypes.shape({
    time: PropTypes.string,
    place: placeType,
  }).isRequired,
  arrival: PropTypes.shape({
    time: PropTypes.string,
    place: placeType,
  }).isRequired,
  transport: PropTypes.shape({
    mode: PropTypes.string,
  }).isRequired,
}));

const transportPropType = PropTypes.shape({
  category: PropTypes.string,
  color: PropTypes.string,
  headsign: PropTypes.string,
  mode: PropTypes.string,
  name: PropTypes.string,
  textColor: PropTypes.string,
});

const startEndObj = PropTypes.shape({
  start: PropTypes.number,
  end: PropTypes.number,
});

const mapViewType = PropTypes.shape({
  north: PropTypes.number,
  south: PropTypes.number,
  east: PropTypes.number,
  west: PropTypes.number,
});

const searchItemPropType = PropTypes.shape({
  address: PropTypes.shape({
    label: PropTypes.string,
  }),
  distance: PropTypes.number,
  highlights: PropTypes.shape({
    label: PropTypes.arrayOf(startEndObj),
    title: PropTypes.arrayOf(startEndObj),
  }),
  id: PropTypes.string,
  localityType: PropTypes.string,
  mapView: mapViewType,
  position: positionType,
  resultType: PropTypes.string,
  title: PropTypes.string,
});

export {
  originPropType, destinationPropType, navigationPropType, hereLocationPropType, routeSectionsPropType, transportPropType, searchItemPropType,
};
