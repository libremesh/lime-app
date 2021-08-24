import { h } from 'preact';
import { Collapsible } from 'components/collapsible';

export default {
    title: 'Collapsible'
};


const Content = () => (
    <p>
        Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur.
    </p>
);

export const collapsed = () => (
    <div style={{ padding: '20px' }}>
        <Collapsible title={'SomeTitle'} initCollapsed={true}>
            <Content />
        </Collapsible>
    </div>
);

export const nonCollapsed = () => (
    <div style={{ padding: '20px' }}>
        <Collapsible title={'SomeTitle'} initCollapsed={false}>
            <Content />
        </Collapsible>
    </div>
);
