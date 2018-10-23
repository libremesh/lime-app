import { h } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';
import I18n from 'i18n-js';

chai.use(assertJsx);

import { MetaMenu } from '../src/metaMenu';

describe('Menu item', () => {
	it.skip('Render html', () => {
		expect(<MetaMenu />)
			.to.eql(<a href="#/config">{I18n.t('Config')}</a>);
	});
});
