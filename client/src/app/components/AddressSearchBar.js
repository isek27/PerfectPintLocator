import React, { Component } from "react";
import { connect } from "react-redux";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import ReactGoogleMapLoader from "react-google-maps-loader";

/* eslint-disable react/prop-types */
const renderSuggestion = ({ formattedSuggestion }) => (
  <div className="Demo__suggestion-item">
    <i className="fa fa-map-marker Demo__suggestion-icon" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
);
/* eslint-enable react/prop-types */

const renderFooter = () => (
  <div className="Demo__dropdown-footer">
    <div>
      <img
        src={process.env.PUBLIC_URL + '/images/google.png'}
        className="Demo__dropdown-footer-image"
      />
    </div>
  </div>
);

const cssClasses = {
  root: 'form-group',
  input: 'Demo__search-input',
  autocompleteContainer: 'Demo__autocomplete-container',
};

const shouldFetchSuggestions = ({ value }) => value.length > 2;

const onError = (status, clearSuggestions) => {
  /* eslint-disable no-console */
  console.log(
    'Error happened while fetching suggestions from Google Maps API',
    status
  );
  /* eslint-enable no-console */
  clearSuggestions();
};

class AddressSearchBar extends Component {
    constructor(props) {
    super(props);
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true,
    });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Geocode Success', { lat, lng }); // eslint-disable-line no-console
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false,
        });
      })
      .catch(error => {
        console.log('Geocode Error', error); // eslint-disable-line no-console
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false,
        });
      });
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null,
    });
  }

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    );
  }

  renderGeocodeSuccess(lat, lng) {
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude:{' '}
        <strong>
          {lat}, {lng}
        </strong>
      </div>
    );
  }

  render() {
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => {
        console.log('Blur event!'); // eslint-disable-line no-console
      },
      onFocus: () => {
        console.log('Focused!'); // eslint-disable-line no-console
      },
      autoFocus: true,
      placeholder: 'Search Places',
      name: 'Demo__input',
      id: 'my-input-id',
    };

    return (
      <div>
        <PlacesAutocomplete
          renderSuggestion={renderSuggestion}
          renderFooter={renderFooter}
          inputProps={inputProps}
          classNames={cssClasses}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
          onError={onError}
          shouldFetchSuggestions={shouldFetchSuggestions}
        />
        {this.state.loading && (
          <div>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
          </div>
        )}
        {this.state.geocodeResults && (
          <div className="geocoding-results">{this.state.geocodeResults}</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        // look at combined reducers, we called this piece of state - auth
        auth : state.auth
    };
}

export default connect(mapStateToProps)(AddressSearchBar);
