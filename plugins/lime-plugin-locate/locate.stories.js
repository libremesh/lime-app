import { LocatePage } from './src/locatePage';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

export default {
	title: 'Containers/Map',
	component: LocatePage,
	decorators: [withKnobs]
}

const actions = {
	loadLocation: action('loadLocation'),
	loadLocationLinks: action('loadLocationLinks')
}

export const nodeAndCommunityNotLocated = () => (
	<LocatePage
		editting={false}
		submitting={false}
		stationLat={false}
		stationLon={false}
		nodesData={{}}
		isCommunityLocation={false}
		{...actions}
	/>
)


export const nodeNotLocatedcommunityLocated = () => (
	<LocatePage
		editting={false}
		submitting={false}
		stationLat={-31.8023266}
		stationLon={-64.4177733}
		nodesData={{}}
		isCommunityLocation={true}
		{...actions}
	/>
)

export const nodeLocated = () => (
	<LocatePage
		editting={false}
		submitting={false}
		stationLat={-31.8023266}
		stationLon={-64.4177733}
		nodesData={{}}
		isCommunityLocation={false}
		{...actions}
	/>
)

export const edittingLocation = () => (
	<LocatePage
		editting={true}
		submitting={false}
		stationLat={-31.8023266}
		stationLon={-64.4177733}
		nodesData={{}}
		isCommunityLocation={false}
		{...actions}
	/>
)

export const submittingLocation = () => (
	<LocatePage
		editting={true}
		submitting={true}
		stationLat={-31.8023266}
		stationLon={-64.4177733}
		nodesData={{}}
		isCommunityLocation={false}
		{...actions}
	/>
)

export const withCommunityData = () => {
	const nodesData = {result: {"ql-male": {bleachTTL: 26,data: {hostname: "ql-male",coordinates: {lon: "-64.423605501652",lat: "-31.816965261909"},macs: ["a0:f3:c1:86:31:d2","a0:f3:c1:86:31:d3","a2:f3:c1:86:31:d2"],links: ["c0:4a:00:fc:55:41","02:11:4e:2f:63:52","c0:4a:00:fc:55:40"]},author: "ql-male"},"si-radio": {bleachTTL: 29,data: {links: ["","a8:40:41:1c:84:20","14:cc:20:ad:b0:d9","c0:4a:00:b6:9a:b1","a0:f3:c1:86:31:8a"],coordinates: {lon: "-64.39613",lat: "-31.82090"},macs: ["a8:40:41:1c:83:e5","a8:40:41:1c:83:ed","a8:40:41:1c:85:9c"],hostname: "si-radio"},author: "si-radio"},"si-claudio": {bleachTTL: 29,data: {links: ["c0:4a:00:b6:9a:b2","a8:40:41:1c:84:16","c0:4a:00:b6:9a:b1","a8:40:41:1c:85:50","a0:f3:c1:86:31:a0","14:cc:20:75:c0:04","14:cc:20:75:d5:1c","14:cc:20:75:be:21"],coordinates: {lon: "-64.394447446680999292",lat: "-31.820718688547000141"},macs: ["64:70:02:4e:cd:0a","64:70:02:4e:cd:0b"],hostname: "si-claudio"},author: "si-claudio"},"si-frigo-bbone": {bleachTTL: 30,data: {links: ["02:ce:56:aa:83:51",""],coordinates: {lon: "-64.39963",lat: "-31.79972"},macs: ["c0:4a:00:fc:38:e0","c0:4a:00:fc:38:e1"],hostname: "si-frigo-bbone"},author: "si-frigo-bbone"},"si-marcelo": {bleachTTL: 29,data: {links: ["14:cc:20:75:d5:1d","a8:40:41:1c:84:16","a8:40:41:1c:84:28","c0:4a:00:b6:9a:b2","14:cc:20:75:c0:05","14:cc:20:75:c0:04","14:cc:20:75:d5:1c","c0:4a:00:b6:9a:b1","a8:40:41:1c:85:50","a8:40:41:1c:85:9c"],coordinates: {lon: "-64.3909722",lat: "-31.8212500"},macs: ["14:cc:20:75:be:21","14:cc:20:75:be:22"],hostname: "si-marcelo"},author: "si-marcelo"},"ql-quinteros": {bleachTTL: 28,data: {links: ["c0:4a:00:fc:55:40","c0:4a:00:fc:39:c0","64:66:b3:87:4e:d0","a8:40:41:1c:85:3c","a0:f3:c1:86:32:10","a0:f3:c1:85:fb:42","14:cc:20:ad:b2:11","14:cc:20:ad:b2:12","a8:40:41:1c:84:18","a0:f3:c1:85:fb:43","c0:4a:00:fc:55:41","64:66:b3:87:4e:d1"],coordinates: {lon: "FIXME",lat: "FIXME"},macs: ["64:70:02:4e:cc:e2","64:70:02:4e:cc:e3","66:70:02:4e:cc:e2"],hostname: "ql-quinteros"},author: "ql-quinteros"},"ql-silviak": {bleachTTL: 28,data: {links: ["64:70:02:4e:cc:e3","c0:4a:00:fc:39:c1","64:70:02:4e:cc:e2","c0:4a:00:fc:39:c0"],coordinates: {lon: "-64.43105399608612",lat: "-31.80852738456711"},macs: ["64:66:b3:87:4e:d0","64:66:b3:87:4e:d1","66:66:b3:87:4e:d0"],hostname: "ql-silviak"},author: "ql-silviak"},"ql-guilleolsina": {bleachTTL: 29,data: {links: ["c0:4a:00:fc:3a:bf","c0:4a:00:fc:3a:be"],coordinates: {lon: "-64.409050063109",lat: "-31.803118109088"},macs: ["a0:f3:c1:86:30:70","a0:f3:c1:86:30:71","a2:f3:c1:86:30:70"],hostname: "ql-guilleolsina"},author: "ql-guilleolsina"},"ql-flor": {bleachTTL: 30,data: {hostname: "ql-flor",coordinates: {lon: "-64.41371777735",lat: "-31.798914449176"},macs: ["14:cc:20:ad:b0:82","14:cc:20:ad:b0:83"],links: ["a0:f3:c1:48:cf:ed","14:cc:20:ad:b0:92","c0:4a:00:fc:3a:bf","c0:4a:00:fc:3a:be"]},author: "ql-flor"},"ql-b6aa8e": {bleachTTL: 29,data: {hostname: "ql-b6aa8e",coordinates: {lon: "FIXME",lat: "FIXME"},macs: ["c0:4a:00:b6:aa:8f","c0:4a:00:b6:aa:90","c2:4a:00:b6:aa:8f","c6:4a:00:b6:aa:8f"],links: []},author: "ql-b6aa8e"},"rl-tanque": {bleachTTL: 29,data: {links: ["a8:40:41:1c:84:20","",""],coordinates: {lon: "-64.385388",lat: "-31.837376"},macs: ["a8:40:41:1c:83:e3","a8:40:41:1c:83:eb","a8:40:41:1c:85:a4","aa:40:41:1c:83:e3","aa:40:41:1c:83:eb","aa:40:41:1c:85:a4"],hostname: "rl-tanque"},author: "rl-tanque"},"si-tato": {bleachTTL: 29,data: {links: ["c0:4a:00:b6:9a:b2","a8:40:41:1c:84:16","14:cc:20:75:be:22","14:cc:20:75:d5:1c","14:cc:20:75:be:21","c0:4a:00:b6:9a:b1","a8:40:41:1c:85:50","a0:f3:c1:86:31:a0","64:70:02:4e:cd:0a","a8:40:41:1c:85:9c"],coordinates: {lon: "-64.39182",lat: "-31.82069"},macs: ["14:cc:20:75:c0:04","14:cc:20:75:c0:05"],hostname: "si-tato"},author: "si-tato"},"si-manu": {bleachTTL: 29,data: {hostname: "si-manu",coordinates: {lon: "-64.40564",lat: "-31.80858"},macs: ["14:cc:20:ad:b0:1c","14:cc:20:ad:b0:1d"],links: ["a8:40:41:1c:84:28","a0:f3:c1:6c:32:75","a0:f3:c1:6c:32:74","c0:4a:00:fc:41:54","a8:40:41:1c:85:44","14:cc:20:ad:aa:16"]},author: "si-manu"},"ql-margayorlando": {bleachTTL: 28,data: {hostname: "ql-margayorlando",coordinates: {lon: "-64.425031334974",lat: "-31.808832376861"},macs: ["c0:4a:00:fc:55:40","c0:4a:00:fc:55:41","c2:4a:00:fc:55:40"],links: ["64:70:02:4e:cc:e3","02:11:4e:2f:63:52","c0:4a:00:b6:b6:c8","c0:4a:00:b6:b6:c7","a8:40:41:1c:85:3c","c0:4a:00:fc:39:c0","a0:f3:c1:86:31:d2","64:70:02:4e:cc:e2","a0:f3:c1:86:32:10","a0:f3:c1:46:28:36"]},author: "ql-margayorlando"},"si-cantor": {bleachTTL: 26,data: {hostname: "si-cantor",coordinates: {lon: "-64.400667250156",lat: "-31.810159405843"},macs: ["a0:f3:c1:86:31:8a","a0:f3:c1:86:31:8b"],links: ["c0:4a:00:fc:41:55","c0:4a:00:fc:41:54","a8:40:41:1c:85:9c"]},author: "si-cantor"},"ql-chanxs": {bleachTTL: 26,data: {links: ["c0:4a:00:40:42:8d","a0:f3:c1:86:32:11","c0:4a:00:40:42:8c","a0:f3:c1:86:32:10"],coordinates: {lon: "-64.43163",lat: "-31.80267"},macs: ["e8:94:f6:bb:c3:51","e8:94:f6:bb:c3:52","ea:94:f6:bb:c3:51"],hostname: "ql-chanxs"},author: "ql-chanxs"},"ql-coqui": {bleachTTL: 29,data: {hostname: "ql-coqui",coordinates: {lon: "-64.413126350261",lat: "-31.802707653379"},macs: ["64:70:02:3d:84:f8","64:70:02:3d:84:f9","66:70:02:3d:84:f8"],links: ["14:cc:20:ad:b0:92","c0:4a:00:fc:3a:bf","14:cc:20:ad:b0:91","c0:4a:00:fc:3a:be","64:66:b3:87:4b:38","a0:f3:c1:48:cf:ec"]},author: "ql-coqui"},"ql-nicojesigioia": {bleachTTL: 30,data: {links: ["a8:40:41:1c:83:f8",""],coordinates: {lon: "-64.42818",lat: "-31.81317"},macs: ["a8:40:41:1c:83:f1","a8:40:41:1c:84:07","a8:40:41:1c:85:d8","aa:40:41:1c:85:d8"],hostname: "ql-nicojesigioia"},author: "ql-nicojesigioia"},"ql-marisa": {bleachTTL: 28,data: {hostname: "ql-marisa",coordinates: {lon: "-64.43389",lat: "-31.80343"},macs: ["a0:f3:c1:86:32:10","a0:f3:c1:86:32:11"],links: ["e8:94:f6:bb:c3:52","a8:40:41:1c:84:18","c0:4a:00:fc:55:40","e8:94:f6:bb:c3:51","a8:40:41:1c:85:3c","64:70:02:4e:cc:e2","14:cc:20:ad:b2:11","a0:f3:c1:85:fb:42"]},author: "ql-marisa"},"ql-ipet265": {bleachTTL: 30,data: {links: ["a0:f3:c1:48:cf:ed","64:66:b3:87:4b:39","64:70:02:3d:84:f9","14:cc:20:ad:b0:83","c0:4a:00:fc:3a:bf","64:70:02:3d:84:f8","a0:f3:c1:48:cf:ec","c0:4a:00:fc:3a:be"],coordinates: {lon: "-64.413958505606004223",lat: "-31.804002555867000979"},macs: ["14:cc:20:ad:b0:91","14:cc:20:ad:b0:92","16:cc:20:ad:b0:91"],hostname: "ql-ipet265"},author: "ql-ipet265"},"si-giordano": {bleachTTL: 27,data: {links: ["a0:f3:c1:86:31:8b","a8:40:41:1c:84:28","a0:f3:c1:86:31:8a","14:cc:20:ad:b0:1c","14:cc:20:ad:aa:16","a8:40:41:1c:85:9c"],coordinates: {lon: "-64.39912",lat: "-31.80916"},macs: ["c0:4a:00:fc:41:54","c0:4a:00:fc:41:55"],hostname: "si-giordano"},author: "si-giordano"},"ql-irene": {bleachTTL: 29,data: {links: ["14:cc:20:ad:ae:e5","14:cc:20:ad:b0:92","c0:4a:00:fc:3a:bf","64:70:02:3d:84:f9","a0:f3:c1:48:cf:ed","14:cc:20:ad:ae:e4","c0:4a:00:fc:3a:be","64:70:02:3d:84:f8"],coordinates: {lon: "-64.41682",lat: "-31.80584"},macs: ["64:66:b3:87:4b:38","64:66:b3:87:4b:39","66:66:b3:87:4b:38","66:66:b3:87:4b:39"],hostname: "ql-irene"},author: "ql-irene"},"ql-bety": {bleachTTL: 28,data: {hostname: "ql-bety",coordinates: {lon: "-64.4318056",lat: "-31.8068056"},macs: ["14:cc:20:ad:b2:11","14:cc:20:ad:b2:12"],links: ["64:70:02:4e:cc:e3","64:70:02:4e:cc:e2","a8:40:41:1c:85:3c","c0:4a:00:fc:39:c0"]},author: "ql-bety"},"ql-lauraymario": {bleachTTL: 28,data: {hostname: "ql-lauraymario",coordinates: {lon: "-64.42696",lat: "-31.80462"},macs: ["c4:e9:84:f9:af:fc","c4:e9:84:f9:af:fd","c6:e9:84:f9:af:fc"],links: ["a8:40:41:1c:84:18","c0:4a:00:fc:39:c1","a8:40:41:1c:85:3c","c0:4a:00:fc:39:c0"]},author: "ql-lauraymario"},"ql-graciela": {bleachTTL: 29,data: {hostname: "ql-graciela",coordinates: {lon: "-64.42705",lat: "-31.80873"},macs: ["a8:40:41:1c:84:05","a8:40:41:1c:84:18","a8:40:41:1c:85:3c"],links: ["c4:e9:84:f9:af:fd","a0:f3:c1:86:32:11","c0:4a:00:fc:39:c1","64:70:02:4e:cc:e3","14:cc:20:ad:b2:12","64:70:02:d1:88:74","c4:e9:84:f9:af:fc","a0:f3:c1:86:32:10","c0:4a:00:fc:39:c0","64:70:02:4e:cc:e2","a0:f3:c1:85:fb:42"]},author: "ql-graciela"},"ql-guillermina": {bleachTTL: 28,data: {links: ["64:70:02:4e:cc:e3","a8:40:41:1c:84:18","64:70:02:4e:cc:e2","c0:4a:00:fc:39:c0","a0:f3:c1:86:32:10","a8:40:41:1c:85:3c"],coordinates: {lon: "-64.43215",lat: "-31.80964"},macs: ["a0:f3:c1:85:fb:42","a0:f3:c1:85:fb:43"],hostname: "ql-guillermina"},author: "ql-guillermina"},"si-nestor": {bleachTTL: 29,data: {links: ["14:cc:20:75:c0:05","c0:4a:00:b6:9a:b2","a8:40:41:1c:84:28","a8:40:41:1c:84:20","14:cc:20:75:be:21","14:cc:20:75:c0:04","14:cc:20:75:d5:1c","c0:4a:00:b6:9a:b1"],coordinates: {lon: "-64.39240",lat: "-31.82056"},macs: ["a8:40:41:1c:84:16","a8:40:41:1c:84:1a","a8:40:41:1c:85:50"],hostname: "si-nestor"},author: "si-nestor"},"ql-esteban": {bleachTTL: 30,data: {hostname: "ql-esteban",coordinates: {lon: "-64.41600680351257",lat: "-31.801688993108318"},macs: ["a0:f3:c1:48:cf:ec","a0:f3:c1:48:cf:ed"],links: ["14:cc:20:ad:b0:83","64:70:02:3d:8a:e5","14:cc:20:ad:b0:92","c0:4a:00:fc:3a:bf","64:66:b3:87:4b:39","a0:f3:c1:86:30:71","64:70:02:3d:8a:e4","14:cc:20:ad:b0:91","64:70:02:3d:84:f8","c0:4a:00:fc:3a:be","14:cc:20:ad:b0:82","a0:f3:c1:86:30:70","64:66:b3:87:4b:38"]},author: "ql-esteban"},"ql-irenecasa": {bleachTTL: 25,data: {links: ["64:66:b3:87:4b:39","64:66:b3:87:4b:38"],coordinates: {lon: "-64.41609",lat: "-31.80461"},macs: ["14:cc:20:ad:ae:e4","14:cc:20:ad:ae:e5","16:cc:20:ad:ae:e4","16:cc:20:ad:ae:e5"],hostname: "ql-irenecasa"},author: "ql-irenecasa"},"si-mario": {bleachTTL: 29,data: {hostname: "si-mario",coordinates: {lon: "-64.40331",lat: "-31.80399"},macs: ["a0:f3:c1:6c:32:74","a0:f3:c1:6c:32:75"],links: ["a8:40:41:1c:84:28","a8:40:41:1c:85:44","14:cc:20:ad:b0:1c"]},author: "si-mario"},"ql-czuk": {bleachTTL: 30,data: {links: ["64:66:b3:87:4b:39","64:70:02:3d:84:f9","14:cc:20:ad:b0:83","a0:f3:c1:48:cf:ed","a0:f3:c1:86:30:71","14:cc:20:ad:b0:92","14:cc:20:ad:b0:82","64:66:b3:87:4b:38","64:70:02:3d:84:f8","a0:f3:c1:86:30:70","a0:f3:c1:48:cf:ec","14:cc:20:ad:b0:91"],coordinates: {lon: "-64.41506",lat: "-31.80137"},macs: ["c0:4a:00:fc:3a:be","c0:4a:00:fc:3a:bf"],hostname: "ql-czuk"},author: "ql-czuk"},"ql-gioiajesinico": {bleachTTL: 29,data: {links: [""],coordinates: {lon: "-64.42813",lat: "-31.81314"},macs: ["e8:de:27:91:60:6d","ea:de:27:91:60:6d"],hostname: "ql-gioiajesinico"},author: "ql-gioiajesinico"},"si-pablo": {bleachTTL: 28,data: {hostname: "si-pablo",coordinates: {lon: "-64.40452",lat: "-31.80978"},macs: ["14:cc:20:ad:aa:16","14:cc:20:ad:aa:17","16:cc:20:ad:aa:16"],links: ["a8:40:41:1c:84:28","c0:4a:00:fc:41:54","14:cc:20:ad:b0:1c","a8:40:41:1c:85:44"]},author: "si-pablo"},"ql-graciela-bbone": {bleachTTL: 30,data: {links: ["02:ce:56:aa:83:52","a8:40:41:1c:83:f1"],coordinates: {lon: "-64.42703",lat: "-31.80874"},macs: ["a8:40:41:1c:83:dd","a8:40:41:1c:83:f8","a8:40:41:1c:85:a8"],hostname: "ql-graciela-bbone"},author: "ql-graciela-bbone"},"si-soniam": {bleachTTL: 29,data: {links: ["a8:40:41:1c:84:16","14:cc:20:75:c0:05","a0:f3:c1:86:31:a1","64:70:02:4e:cd:0b","a0:f3:c1:86:31:a0","14:cc:20:75:c0:04","14:cc:20:75:be:21","a8:40:41:1c:85:50","64:70:02:4e:cd:0a","14:cc:20:75:d5:1c"],coordinates: {lon: "-64.39345",lat: "-31.82057"},macs: ["c0:4a:00:b6:9a:b1","c0:4a:00:b6:9a:b2"],hostname: "si-soniam"},author: "si-soniam"},"si-frigorifico": {bleachTTL: 30,data: {hostname: "si-frigorifico",coordinates: {lon: "-64.39950",lat: "-31.79970"},macs: ["a8:40:41:1c:84:20","a8:40:41:1c:84:28","a8:40:41:1c:85:44"],links: ["a8:40:41:1c:83:eb","a8:40:41:1c:84:1a","a8:40:41:1c:83:e5","a0:f3:c1:6c:32:75","14:cc:20:ad:b0:1d","14:cc:20:ad:b0:1c","a0:f3:c1:6c:32:74","a8:40:41:1c:85:9c"]},author: "si-frigorifico"},"si-bel-mar": {bleachTTL: 28,data: {links: ["14:cc:20:75:be:22","a8:40:41:1c:84:28","c0:4a:00:fc:55:82","14:cc:20:75:be:21","a8:40:41:1c:85:50","a8:40:41:1c:85:44"],coordinates: {lon: "-64.39031",lat: "-31.82131"},macs: ["14:cc:20:75:d5:1c","14:cc:20:75:d5:1d"],hostname: "si-bel-mar"},author: "si-bel-mar"},"ql-cesarylucia": {bleachTTL: 25,data: {hostname: "ql-cesarylucia",coordinates: {lon: "-64.42450",lat: "-31.81799"},macs: ["a0:f3:c1:46:28:36","a0:f3:c1:46:28:37","a2:f3:c1:46:28:36"],links: ["02:11:4e:2f:63:52","c0:4a:00:fc:55:40","a8:40:41:1c:85:3c"]},author: "ql-cesarylucia"},"ql-espacioabierto": {bleachTTL: 29,data: {links: ["a0:f3:c1:48:cf:ed","a0:f3:c1:48:cf:ec"],coordinates: {lon: "-64.41756",lat: "-31.80264"},macs: ["64:70:02:3d:8a:e4","64:70:02:3d:8a:e5","66:70:02:3d:8a:e4"],hostname: "ql-espacioabierto"},author: "ql-espacioabierto"},"ql-ale": {bleachTTL: 27,data: {hostname: "ql-ale",coordinates: {lon: "-64.42530",lat: "-31.81378"},macs: ["c0:4a:00:b6:b6:c7","c0:4a:00:b6:b6:c8","c2:4a:00:b6:b6:c7"],links: ["c0:4a:00:fc:55:41","c0:4a:00:fc:55:40"]},author: "ql-ale"},"ql-oncelotes": {bleachTTL: 28,data: {links: ["a0:f3:c1:86:31:d3","c0:4a:00:fc:55:41","a8:40:41:1c:84:05"],coordinates: {lon: "-64.42398",lat: "-31.81424"},macs: ["02:11:4e:2f:63:51","02:11:4e:2f:63:52"],hostname: "ql-oncelotes"},author: "ql-oncelotes"},"si-sonia": {bleachTTL: 29,data: {hostname: "si-sonia",coordinates: {lon: "-64.388400000000004297",lat: "-31.821400000000000574"},macs: ["c0:4a:00:fc:55:82","c0:4a:00:fc:55:83"],links: ["a8:40:41:1c:84:28","14:cc:20:75:d5:1c"]},author: "si-sonia"},"ql-jorgeortiz": {bleachTTL: 28,data: {links: ["c0:4a:00:fc:55:40","64:66:b3:87:4e:d0","a8:40:41:1c:85:3c","64:70:02:4e:cc:e2","a0:f3:c1:85:fb:42","c4:e9:84:f9:af:fc","a8:40:41:1c:84:18","64:66:b3:87:4e:d1","c4:e9:84:f9:af:fd"],coordinates: {lon: "-64.430179595947",lat: "-31.804784567677"},macs: ["c0:4a:00:fc:39:c0","c0:4a:00:fc:39:c1","c2:4a:00:fc:39:c0"],hostname: "ql-jorgeortiz"},author: "ql-jorgeortiz"},"si-andrea": {bleachTTL: 27,data: {hostname: "si-andrea",coordinates: {lon: "-64.40097",lat: "-31.81854"},macs: ["14:cc:20:ad:b0:d9","14:cc:20:ad:b0:da"],links: ["a8:40:41:1c:84:28","a8:40:41:1c:85:9c","a8:40:41:1c:85:44"]},author: "si-andrea"},"ql-anaymarcos": {bleachTTL: 28,data: {links: ["a8:40:41:1c:84:05"],coordinates: {lon: "-64.42695",lat: "-31.81300"},macs: ["64:70:02:d1:88:74"],hostname: "ql-anaymarcos"},author: "ql-anaymarcos"},"si-monica": {bleachTTL: 29,data: {links: ["c0:4a:00:b6:9a:b2","14:cc:20:75:c0:04","c0:4a:00:b6:9a:b1","64:70:02:4e:cd:0a"],coordinates: {lon: "-64.39372",lat: "-31.81995"},macs: ["a0:f3:c1:86:31:a0","a0:f3:c1:86:31:a1"],hostname: "si-monica"},author: "si-monica"}}}
	return (
		<LocatePage
			editting={false}
			submitting={false}
			stationLat={-31.8023266}
			stationLon={-64.4177733}
			nodesData={nodesData.result}
			isCommunityLocation={false}
			{...actions}
		/>
	)
}
