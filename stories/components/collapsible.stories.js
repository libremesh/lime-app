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

export const Collapsed = (args) => (
    <div style={{ padding: '20px' }}>
        <Collapsible {...args}>
            <Content />
        </Collapsible>
    </div>
);
Collapsed.args = {
    title: 'Some Title',
    initCollapsed: true,
}

export const NonCollapsed = (args) => (
    <div style={{ padding: '20px' }}>
        <Collapsible {...args}>
            <Content />
        </Collapsible>
    </div>
);
NonCollapsed.args = {
    title: 'Some Title',
    initCollapsed: false,
}
