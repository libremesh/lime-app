import { h } from 'preact'

import { Header } from '../src/components/header';
import '../src/style';
import 'skeleton-less/less/skeleton';

export const frameDecorator = storyFn => (
    <div>
        <Header hostname={'ql-anaymarcos'} />
        <div style={{width: '85%', margin: '0 auto'}}>
            {storyFn()}
        </div>
    </div>
);
