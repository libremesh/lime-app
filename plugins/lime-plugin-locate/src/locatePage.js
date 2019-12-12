import { h, Component } from 'preact';
import './style.less';

import Script from 'react-load-script';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadLocation, loadLocationLinks, changeLocation, setUserLocation } from './locateActions';
import { getLocation, getUserLocation, getSelectedHost, isCommunityLocation } from './locateSelectors';

import I18n from 'i18n-js';

import { isObject, sameLocation, removeDuplicates, coordsToPoint, coordspairToLineString } from './utils';

const style = {
	buttonOver: {
		position: 'absolute',
		left: '15px',
		zIndex: '10000',
		bottom: '20px',
		background: '#90d504',
		color: '#fff',
		borderWidth: '2px'
	}
};

const key = 'AIzaSyBS0M7H7Ltk1ipjwqi8r9_WQJOzWfav4Ok';

let L;
class Locate extends Component {

	updatePosition() {
		let position = this.state.map.getCenter();
		position = {
			lat: (position.lat_neg)? position.lat * -1: position.lat,
			lon: (position.lng_neg)? position.lng * -1: position.lng
		};
		this.props.changeLocation({ lat: position.lat.toFixed(5),lon: position.lon.toFixed(5) });
		this.state.map.setView([position.lat, position.lon]);
		this.toogleEdit();
	}

	requestCurrentPosition() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((location) => {
				this.props.setUserLocation({ lat: location.coords.latitude,lon: location.coords.longitude });
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
		L = window.L;
		this.setState({ scriptLoaded: true });

		if (typeof this.state.map === 'undefined') {
			const initMap = L.map('map').setView([this.props.stationLocation.lat, this.props.stationLocation.lon], 13);
			this.setState({ map: initMap });
		}

		const map = this.state.map;


		require('leaflet.gridlayer.googlemutant');

		const satellite = L.gridLayer.googleMutant({ type: 'satellite' });
		const hybrid = L.gridLayer.googleMutant({ type: 'hybrid' });
		const base = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');


		L.control.layers(
			{
				'Open Street Map': base,
				'Google Maps Satellite': satellite,
				'Google Maps Hybrid': hybrid
			},{},{ position: 'bottomright' }
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

		const popup = L.popup()
			.setLatLng([this.props.stationLocation.lat, this.props.stationLocation.lon])
			.setContent(`<h4 style="margin-bottom: 0px;">${I18n.t('Station')} </strong> ${this.props.stationHostname}</h4>
						<p style="margin: 0 0 5px;"><b>${this.showMsg()}</p>
						<button style="width: 100%" onClick='window.toggleEdit()'>${this.state.buttonText}</button>
			</span>`)
			.openOn(map);
		this.setState({ popup });

		let homeIcon = L.icon({
			iconUrl: 'data:image/png;base64,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',
			iconsSize: [25,41],
			iconAnchor: [13,40],
			popupAnchor: [0, -45]
		});

		const marker = L.marker([this.props.stationLocation.lat, this.props.stationLocation.lon],{ draggable: false, icon: homeIcon })
			.addTo(map)
			.on('click', (x) => map.setView(x.target._latlng))
			.bindPopup(popup);
		this.setState({ marker });
	}

	showLinks(nodeshash) {

		//Run only if leaflet is loaded
		if (L && this.state.map) {
			let nodes = Object.values(nodeshash).filter(node => isObject(node));

			// geomac being the hash of locations of nodes indexed by mac
			let geomac = nodes     // to those nodes
				.filter(n => n.macs) // that actually have a macs list
				.map(
					node => node.macs.filter(mac => mac) // only if value exists
						.map((mac) => [mac, [Number(node.coordinates.lon), Number(node.coordinates.lat)]])
				)                    // get their locations
				.reduce((all, macs) => [...all, ...macs], [])
				.reduce((hash, mac) => { hash[mac[0]] = mac[1]; return hash; }, {}); // and add it to a hash

			// geolinks is the list of pair of locations between nodes that are connected to each other
			let links = nodes
				.reduce((links, node) =>
					[
						...links,
						...(node.links.filter(mac => mac in geomac)     // for the links to macs that have geolocation
							.map(mac => [node.macs[0], mac].sort())       // add the sorted tuple of that link
						)
					], []);
			// TODO build map with links macs not in geomac
			links = removeDuplicates(links, l => l[0] + ',' + l[1]);

			let geolinks = links
				.map(macpair => [geomac[macpair[0]], geomac[macpair[1]]]); // turn the links mac list into a links geolocation list

			let nodefeatures = nodes
				.filter(n => ! sameLocation(n.coordinates, this.props.stationLocation))
				.map(coordsToPoint);

			let linksfeatures = geolinks.map(link => coordspairToLineString(link));

			let features = [...nodefeatures, ...linksfeatures];

			let geojsonFeature = {
				type: 'FeatureCollection',
				features
			};
			//console.log(geojsonFeature);
			L.geoJSON(geojsonFeature,{
				onEachFeature: (feature, layer) => {
					if (feature.properties && feature.properties.name) {
						layer.bindTooltip(feature.properties.name).openTooltip();
					}
				}
			}).addTo(this.state.map);
		}
	}

	isLoaded(exist) {
		if (exist === true) {
			return false;
		}
		return (<div>Loading...</div>);
	}

	showButton(change) {
		if (change) {
			return (<button style={style.buttonOver} onClick={this.updatePosition}>Set as new location</button>);
		}
	}

	rerenderMap(latlon) {
		if (this.state.scriptLoaded === true) {
			if (this.state.scriptCoords === false ) {
				this.state.map.setView([latlon.lat, latlon.lon]);
			}
			this.state.marker.setLatLng([latlon.lat, latlon.lon]);
			return (
				<span>
					<style type="text/css">@import url("https://xguaita.github.io/Leaflet.MapCenterCoord/dist/L.Control.MapCenterCoord.min.css");</style>
					<Script url={'https://xguaita.github.io/Leaflet.MapCenterCoord/dist/L.Control.MapCenterCoord.min.js'}
						onLoad={this.addCoord}
					/>
				</span>
			);
		}
	}

	addCoord() {
		if (this.state.scriptCoords === false ) {
			L = window.L;
			L.control.mapCenterCoord().addTo(this.state.map);
			this.setState({ scriptCoords: true });
		}
	}

	toogleEdit() {
		this.setState({ change: !this.state.change });
		this.state.map.closePopup();
		let pointer = document.getElementsByClassName('leaflet-control-mapcentercoord-icon');
		if (pointer.length > 0) {
			this.setState({ buttonText: (this.state.change)? 'Close edit mode' : 'Edit location' });
			this.state.popup.setContent(`<h4 style="margin-bottom:-11px; ">${I18n.t('Station')} </strong> ${this.props.stationHostname}</h4>
					<br/>
					<button onClick='window.toggleEdit()' style="width: 100%">${this.state.buttonText}</button>
					</span>`);
			pointer[0].style.opacity = (this.state.change)? 1 : 0;
		}
	}

	showMsg() {
		return this.props.isCommunityLocation? I18n.t('You don\'t have a location, please select one'): '';
	}

	constructor(props){
		super(props);
		this.state = {
			scriptLoaded: false,
			scriptCoords: false,
			scriptError: false,
			buttonText: 'Edit location',
			change: false,
			ignoreAlert: false
		};
		this.handleScriptCreate = this.handleScriptCreate.bind(this);
		this.handleScriptError = this.handleScriptError.bind(this);
		this.handleScriptLoad = this.handleScriptLoad.bind(this);
		this.updatePosition = this.updatePosition.bind(this);
		this.toogleEdit = this.toogleEdit.bind(this);
		this.addCoord = this.addCoord.bind(this);
		this.showMsg = this.showMsg.bind(this);
		this.showLinks = this.showLinks.bind(this);

		window.toggleEdit = this.toogleEdit;
	}

	componentWillMount() {
		this.props.loadLocation();
		this.props.loadLocationLinks();
		this.requestCurrentPosition();
	}

	componentWillUnmount(){
		this.state.map.off();
		this.state.map.remove();
	}

	render({ user }, { time, count }) {
		return (
			<div>
				<Script
					url="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.0/leaflet.js"
					onCreate={this.handleScriptCreate}
					onError={this.handleScriptError}
					onLoad={this.handleScriptLoad}
				/>
				<Script url={'https://maps.googleapis.com/maps/api/js?key='+key} />

				<div id="map" />
				{this.isLoaded(this.state.scriptLoaded)}
				{this.rerenderMap(this.props.stationLocation)}
				{this.showLinks(this.props.nodeshash)}
				{this.showButton(this.state.change)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	stationLocation: getLocation(state),
	userLocation: getUserLocation(state),
	stationHostname: getSelectedHost(state),
	isCommunityLocation: isCommunityLocation(state),
	nodeshash: state.locate.nodeshash
});

const mapDispatchToProps = (dispatch) => ({
	loadLocation: bindActionCreators(loadLocation, dispatch),
	loadLocationLinks: bindActionCreators(loadLocationLinks, dispatch),
	changeLocation: bindActionCreators(changeLocation, dispatch),
	setUserLocation: bindActionCreators(setUserLocation, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Locate);
