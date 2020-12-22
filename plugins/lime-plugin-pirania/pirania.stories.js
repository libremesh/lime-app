/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, object, boolean, number, text } from '@storybook/addon-knobs';
import Home from './src/pages/home';
import { AdminPiraniaPage } from './src/pages/admin';
import { ListPiraniaPage } from './src/pages/list';
import { CreatePiraniaPage } from './src/pages/create';
import { RenewPiraniaPage } from './src/pages/renew';
import { GovernancePiraniaPage } from './src/pages/governance';
import { ContentPiraniaPage } from './src/pages/content';

let daysLeft = 1;
let governance = {
    provider: {
        payday: 24,
        cost: 150,
        name: 'Internet Service Provider Name',
        speed: '10Mbs'
    },
    community: {
        payday: 20,
        maintenance: 200,
        reserve: 0,
        currency: 'USD'
    },
    member: {
        cost: 50,
        vouchers: 5
    }
};
const now = new Date();
const nextNextRenewday = new Date(now.getFullYear(), now.getMonth() + 1, governance.community.payday + 1);
const renewMonth = nextNextRenewday.getMonth() + 1;
const renewYear = nextNextRenewday.getFullYear();
const renewDate = `${governance.community.payday + 1}/${renewMonth > 9 ? renewMonth : '0' + renewMonth}/${renewYear}`;
let vouchers = [
    {
        expires: new Date(now.getFullYear(), now.getMonth(), governance.community.payday + 1).valueOf(),
        note: 'wesley-coputador',
        name: 'delvaearidi-m-wesley-computador',
        macs: [
            '2c:6f:c9:66:4c:2'
        ],
        voucher: 'fx97sphu',
        macsAllowed: '1',
        node: 'delvaearidi',
        type: 'member'
    },
    {
        expires: new Date(now.getFullYear(), now.getMonth(), governance.community.payday + 1).valueOf(),
        type: 'invalid',
        name: 'aridi-mnf',
        macs: [
            '2c:6f:c9:66:4c:2b'
        ],
        macsAllowed: '1',
        node: 'aridi',
        voucher: '7b7i95yn'
    },
    {
        expires: new Date(now.getFullYear(), now.getMonth(), governance.community.payday + 1).valueOf(),
        note: 'jpcel',
        name: 'flordeouro-m-jpcel-',
        macs: [
            '2e:fc:84:93:85:45'
        ],
        voucher: 'f22slkrs',
        macsAllowed: '1',
        node: 'flordeouro',
        type: 'member'
    },
    {
        expires: new Date(now.getFullYear(), now.getMonth(), governance.community.payday + 1).valueOf(),
        note: 'yan-ttp',
        name: 'flordeouro-v-yan-ttp',
        macs: [
            'ac:f6:f7:ca:87:43'
        ],
        voucher: 'f92uzvwf',
        macsAllowed: '1',
        node: 'flordeouro',
        type: 'visitor'
    }
];
let piraniaContent = {
    welcome: 'Bem vindos ao portal da Rede Comunitaria do Moinho.',
    title: '',
    logo: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAKAAD/4QMfaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRDNjE2NTdBNzI4ODExRTk4QzgzREQzQUFEQ0ZDMDQ4IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRDNjE2NTc5NzI4ODExRTk4QzgzREQzQUFEQ0ZDMDQ4IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSIwRDJGNDkzRDhFMTA3RkYwNENCQzMyRUY4REYyOUIzOCIgc3RSZWY6ZG9jdW1lbnRJRD0iMEQyRjQ5M0Q4RTEwN0ZGMDRDQkMzMkVGOERGMjlCMzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAUEBAZEhknFxcnMiYfJjIuJiYmJi4+NTU1NTU+REFB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',
    rules: '<p>Bem vindos a nossa rede comunitária. É uma rede de comunicação gerenciado pela comunidade. Em caso de problemas primeiro aprenda a usar <a target=\'_blank\' href=\'http://thisnode.info\'>nosso aplicativo</a> que pode te ajudar a encontrar o problema.</p><p>Caso queira fazer parte dessa rede procure alguém que já faça parte e pergunte.</p>',
    mediaUrl: '',
    backgroundColor: '#f0e5de',
    body: 'Coloque o código no campo a baixo para ter acesso a internet. Caso precise de um código procure um colaborador da rede pelo povoado. Caso tenha interesse em se juntar a rede procure Luandro ou Aridi.'
};

export const actions = {
    submit: (e) => {
        action('Submit');
        e.preventDefault();
    },
    list: action('List vouchers'),
    create: action('Create vouchers'),
    renew: action('Renew vouchers'),
    editGovernance: action('Edit governance information'),
    editContent: action('Edit captive-portal page content'),
    goBack: action('Go back'),
    removeVoucher: action('Remove voucher'),
    createVisitorVoucher: action('Create visitor voucher'),
    createMemberVoucher: action('Create member voucher'),
    renewEpoc: action('Renew voucher date'),
    writeGovernance: action('Save governance information'),
    writeContent: action('Save content information')
};

let getStatus = () => false;
let createEpoc = () => false;
let getVoucherList = () => [];
let getPiraniaContent = () => [];

storiesOf('Containers|Pirania', module)
    .addDecorator(withKnobs)
    .add('Home screen', () => (
        <Home
            logged={false}
            handlePassword={false}
            daysLeft={number('Days left until pay day', daysLeft)}
            provider={object('Governance provider state', governance.provider)}
            community={object('Governance community state', governance.community)}
            member={object('Governance member state', governance.member)}
            submit={e => actions.submit(e)}
        />
    ))
    .add('Logged admin screen', () => (
        <AdminPiraniaPage
            loading={boolean('Is loading enabled information', false)}
            provider={object('Governance provider state', governance.provider)}
            community={object('Governance community state', governance.community)}
            member={object('Governance member state', governance.member)}
            daysLeft={number('Days left until pay day', daysLeft)}
            getStatus={getStatus}
            {...actions}
        />
    ))
    .add('List vouchers screen', () => (
        <ListPiraniaPage
            vouchers={object('Voucher list', vouchers)}
            loading={boolean('Is loading', false)}
            {...actions}
        />
    ))
    .add('Create new voucher screen', () => (
        <CreatePiraniaPage
            daysLeft={number('Days left until pay day', daysLeft)}
            createEpoc={createEpoc}
            loading={boolean('Is loading', false)}
            {...actions}
        />
    ))
    .add('Renew vouchers screen', () => (
        <RenewPiraniaPage
            daysLeft={number('Days left until pay day', daysLeft)}
            renewDate={text('Renew date', renewDate)}
            loading={boolean('Is loading', false)}
            getVoucherList={getVoucherList}
            vouchers={object('Voucher list', vouchers)}
            {...actions}
        />
    ))
    .add('Edit governance information screen', () => (
        <GovernancePiraniaPage
            loading={boolean('Is loading', false)}
            provider={object('Governance provider state', governance.provider)}
            community={object('Governance community state', governance.community)}
            member={object('Governance member state', governance.member)}
            {...actions}
        />
    ))
    .add('Edit content screen', () => (
        <ContentPiraniaPage
            loading={boolean('Is loading', false)}
            getPiraniaContent={getPiraniaContent}
            content={object('Pirania captive-portal content', piraniaContent)}
            {...actions}
        />
    ));

