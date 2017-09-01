import { h } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';

chai.use(assertJsx);

import { RxMenu } from '../src/rxMenu';

// describe('Menu item', () => {
//   it('Render html', () => {
//     expect(<RxMenu />)
//         .to.eql(<a href='#/rx'>Status</a>);
//   });
// });
