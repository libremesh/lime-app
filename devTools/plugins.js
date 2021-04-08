const path = require('path');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const indexContent = (name, isCommunityProtected) =>
    `import Page from './src/${name}Page';
import Menu from './src/${name}Menu';

export default {
    name: '${name}',
    page: Page,
    menu: Menu,
    isCommunityProtected: ${isCommunityProtected}
};
`

const menuContent = (name, menuName) =>
    `import { h } from 'preact';
import I18n from 'i18n-js';

const Menu = () => (
	<a href={'#/${name.toLowerCase()}'}>{I18n.t('${menuName || name}')}</a>
);

export default Menu;
`

const pageContent = (name) => {
    const componentName = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        `import { h } from 'preact';

const ${componentName} = () => {
    return;
}

export default ${componentName};
`)
}

const argv = yargs(hideBin(process.argv))
    .command('$0 create <name>', 'create an skeleton for a new plugin',
        yargs => yargs
            .positional('name', {
                describe: 'the name of your plugin without lime-plugin suffix',
            })
            .option('protected', {
                alias: 'p', type: 'boolean', default: false,
                describe: 'whether it is protected by shared password'
            })
            .option('menu-name', {
                alias: 'm', type: 'string',
                describe: 'name for the menu entry. Default to plugin name'
            })
        , create)
    .help()
    .argv



function create(argv) {
    const name = argv.name;
    const pluginName = `lime-plugin-${name}`;
    baseDir = path.join(__dirname, '..', 'plugins', pluginName);
    fs.mkdirSync(baseDir);
    fs.mkdirSync(path.join(baseDir, 'src'))
    fs.writeFileSync(path.join(baseDir, 'src', `${name}Page.js`),
        pageContent(name));
    fs.writeFileSync(path.join(baseDir, 'src', `${name}Queries.js`), '');
    fs.writeFileSync(path.join(baseDir, 'src', `${name}Api.js`), '');
    fs.writeFileSync(path.join(baseDir, 'src', `${name}Api.spec.js`), '')
    fs.writeFileSync(path.join(baseDir, 'src', `${name}Menu.js`),
        menuContent(name, argv.menuName)
    );
    fs.writeFileSync(path.join(baseDir, 'src', `${name}Style.less`), '');
    fs.writeFileSync(path.join(baseDir, 'index.js'),
        indexContent(name, argv.protected));
    fs.writeFileSync(path.join(baseDir, `${name}.spec.js`), '');
}