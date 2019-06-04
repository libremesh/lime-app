import { h, Component } from 'preact';
import './style.less';

import Script from 'react-load-script';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { loadLocation, loadLocationLinks, changeLocation, setUserLocation } from './locateActions';
import { getLocation, getUserLocation, getSelectedHost, isCommunityLocation } from './locateSelectors';

import I18n from 'i18n-js';

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

const appendAll = (a, b) => {
	Array.prototype.push.apply(a, b);
	return a;
};
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

    let homeCss = `<style>
.icon {
position: relative;
width:16px;
height:16px;
margin: 16px;
}

.icon .name {
width: 32px;
position: absolute;
text-align: center;
top: 18px;
left: -8px;
}

.icon-home:after{
border: 8px solid #000;
border-left-color: transparent;
border-right-color: transparent;
border-top-color: transparent;
height: 16px;
width: 0;
position: absolute;
top: -31px;
left: 0;
 content: "";
}
.icon-home {
background-color: #000;
width: 15px;
height: 10px;
border-bottom-left-radius: 1px;
border-bottom-right-radius: 1px;
-webkit-border-bottom-left-radius: 1px;
-webkit-border-bottom-right-radius: 1px;
-moz-border-radius-bottomleft: 1px;
-moz-border-radius-bottomright: 1px;
position: relative;
bottom: 15px;
left: -18px;
}
.icon-home:before {
background-color: #000;
width: 2px;
height: 5px;
border-radius: 1px;
-webkit-border-radius: 1px;
-moz-border-radius: 1px;
position: absolute;
top: -6px;
left: 1px;
content: "";
}</style>`;
    let homeIcon = L.divIcon({html: homeCss + `<div class="icon icon-home"><span class="name">Nodename</span></div>`});

		const marker = L.marker([this.props.stationLocation.lat, this.props.stationLocation.lon],{ draggable: false, icon: homeIcon })
			.addTo(map)
			.on('click', (x) => map.setView(x.target._latlng))
			.bindPopup(popup);
		this.setState({ marker });
	}

	showLinks(nodeshash) {
		//Run only if leaflet is loaded
		if (L){
			let nodes = [];
			for (let key in nodeshash) {
				if (nodeshash[key]) {
					nodes.push(nodeshash[key]);
				}
			}
			let geomac = nodes
				.map(
					node => node.macs
						.filter(mac => mac !== '')
						.map((mac) => [mac, [Number(node.coordinates.lat + 1), Number(node.coordinates.lon)]])
				)
				.reduce((all, macs) => appendAll(all, macs), [])
				.reduce((hash, mac) => { hash[mac[0]] = mac[1]; return hash;}, {});

			let links = nodes
				.reduce((links, node) =>
					appendAll(links, node.links
						.map(mac => [node.macs[0], mac])), [])
				.map(macpair => [geomac[macpair[0]], geomac[macpair[1]]]
				)
				//.filter(link => link[1] !== undefined) // enable to production -> hide locations not founds
				.map(link => [link[0], [0,0]]); // hide in production -> set custom cordiantes if link location not found

			let nodefeatures = nodes.map(node => ({ type: 'Feature', geometry: { type: 'Point', coordinates: [Number(node.coordinates.lat), Number(node.coordinates.lon)] } }));
			let linksfeatures = links.map(link => ({ type: 'Feature', geometry: { type: 'LineString', coordinates: link } }));

			let features = appendAll(appendAll([], nodefeatures), linksfeatures);

			let geojsonFeature = {
				type: 'FeatureCollection',
				features
			};
			L.geoJSON(geojsonFeature).addTo(this.state.map);
			console.log('geojsonFeature', geojsonFeature); // remove console.log in production
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
