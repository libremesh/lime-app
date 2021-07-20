import Page from './src/hotspotPage';

export default {
    name: 'hotspot',
    path: '/hotspot/:nextPage?',
    page: Page,
    isCommunityProtected: true
};
