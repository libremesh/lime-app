import { h, Component } from 'preact';
import style from './style.less';

import Script from 'react-load-script';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { loadLocation, changeLocation, setUserLocation } from './locateActions';
import { getLocation, getUserLocation, getSelectedHost } from './locateSelectors';

import I18n from 'i18n-js';


const key = 'AIzaSyBS0M7H7Ltk1ipjwqi8r9_WQJOzWfav4Ok';

let L;

class Locate extends Component {
  constructor(props){
    super(props);
    this.state = {
      scriptLoaded: false,
      scriptError: false
    };
    
  }

  componentWillMount() {
    this.props.loadLocation();
    this.requestCurrentPosition();
  }

  updatePosition(e) {
    let { lat, lng } = e.target._latlng;
    this.props.changeLocation({lat: lat.toFixed(5),lon:lng.toFixed(5)});
  }

  requestCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location)=>{
        this.props.setUserLocation({lat:location.coords.latitude,lon:location.coords.longitude});
      });
    }
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
  }
  
  handleScriptError() {
    this.setState({ scriptError: true });
  }
  
  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
    L = window.L;
    
    const map = this.map = L.map('map').setView([this.props.stationLocation.lat, this.props.stationLocation.lon], 13);

    require('leaflet.gridlayer.googlemutant');

    const satellite = L.gridLayer.googleMutant({type: 'satellite'});
    const hybrid = L.gridLayer.googleMutant({type: 'hybrid'});
    const base = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');


    L.control.layers(
      {
        "Open Street Map": base,
        "Google Maps Satellite":satellite,
        "Google Maps Hybrid":hybrid
      },{},{position:'bottomright'}
    ).addTo(map);


    L.Icon.Default.imagePath = '.';
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });
    
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    const popupNode = L.popup()
      .setLatLng([this.props.stationLocation.lat, this.props.stationLocation.lon])
      .setContent(`<strong>${I18n.t('Station')} </strong> ${this.props.stationHostname}<br/>
          <span">
              ${I18n.t('MOVE TO NEW POSITION')}
          </span>
        </span>`);

    const marker = this.marker = L.marker([this.props.stationLocation.lat, this.props.stationLocation.lon],{
      draggable: true,
    })
      .addTo(map)
      .on('click', (x)=> map.setView(x.target._latlng))
      .on('drag', (x)=> map.setView(x.target._latlng))
      .on('moveend', (x)=> this.updatePosition(x))
      .bindPopup(popupNode);
  }

  isLoaded(exist) {
    if (exist === true) {
      return (
        <div></div>
      );
    }
    return (<div>Loading...</div>);
  }
  
  rerenderMap(latlon) {
    if (this.state.scriptLoaded === true) {
      this.map.setView([latlon.lat, latlon.lon]);
      this.marker.setLatLng([latlon.lat, latlon.lon]);
    }
  }
  render({ user }, { time, count }) {
    return (
        <div>
          <Script
            url="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet-src.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />
          <Script url={"https://maps.googleapis.com/maps/api/js?key="+key} />
          
          <div id="map"></div>
          {this.isLoaded(this.state.scriptLoaded)}
          {this.rerenderMap(this.props.stationLocation)}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stationLocation: getLocation(state),
    userLocation: getUserLocation(state),
    stationHostname: getSelectedHost(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadLocation: bindActionCreators(loadLocation, dispatch),
    changeLocation : bindActionCreators(changeLocation, dispatch),
    setUserLocation : bindActionCreators(setUserLocation, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Locate);