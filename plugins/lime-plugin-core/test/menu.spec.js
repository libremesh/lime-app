import { h } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';

chai.use(assertJsx);

import { MetaMenu } from '../src/metaMenu';

describe('Menu item', () => {
  it.skip('Render html', () => {
    expect(<MetaMenu />)
        .to.eql(<a href='#/config' translate="yes">Config</a>);
  });
});
