const path = require("path");
const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const indexContent = (name, isCommunityProtected) =>
    `import Page from './src/${name}Page';
import Menu from './src/${name}Menu';

export default {
    name: '${name}',
    page: Page,
    menu: Menu,
    isCommunityProtected: ${isCommunityProtected}
};
`;

const menuContent = (name, menuName) =>
    `import { Trans } from '@lingui/macro';

const Menu = () => (
	<a href={'#/${name.toLowerCase()}'}><Trans>${menuName || name}</Trans></a>
);

export default Menu;
`;

const pageContent = (name) => {
    const componentName = name.charAt(0).toUpperCase() + name.slice(1);
    return `// ${componentName} will be rendered when navigating to this plugin
import style from './${name}Style.less';
import { useSomething } from './${name}Queries';

const ${componentName} = () => {
    const { data: something } = useSomething();
    return (
        <div>{ something }</div>
    );
}

export default ${componentName};
`;
};

const queriesContent = (name) =>
    `// Here you define queries and mutations which connects the api with your components
import { useQuery, useMutation } from '@tanstack/react-query';
import { getSomething } from './${name}Api';

export const useSomething = () => useQuery(['package', 'command'], getSomething);
`;

const apiContent = () =>
    `// Here you define the api calls to the ubus uhttpd enpoints your plugin needs
import api from 'utils/uhttpd.service';

export const getSomething = () => api.call('package', 'command', {});
`;

const apiSpecContent = (name) =>
    `// Here you define unit tests for the api endpoints of this plugin
import { getSomething } from './${name}Api'
import api from 'utils/uhttpd.service';
import { of } from 'rxjs';
jest.mock('utils/uhttpd.service')

beforeEach(() => {
    api.call.mockImplementation(() => of({status: 'ok'}))
})

describe('getSomething', () => {
    it('test some behaviour', async () => {
        expect(true).toBeTrue();
    });
    it('test some other behaviour', async () => {
        expect(true).toBeTrue();
    });
});
`;

const specContent = (name) => {
    const componentName = name.charAt(0).toUpperCase() + name.slice(1);
    return `// Here you define tests that closely resemble how your component is used
// Using the testing-library: https://testing-library.com

import { screen, cleanup, act } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { render } from 'utils/test_utils';
import queryCache from 'utils/queryCache';

import ${componentName} from './src/${name}Page';
import { getSomething } from './src/${name}Api';

jest.mock('./src/${name}Api');

describe('${name}', () => {
    beforeEach(() => {
        getSomething.mockImplementation(async () => "something");
    });

    afterEach(() => {
        cleanup();
        act(() => queryCache.clear());
    });

    it('test that something is shown', async() => {
        render(<${componentName} />);
        expect(await screen.findByText('something')).toBeInTheDocument();
    })
});
`;
};

const storiesContent = (name, menuName) => {
    const componentName = name.charAt(0).toUpperCase() + name.slice(1);
    return `//Here you define the StoryBook stories for this plugin

import ${componentName} from './src/${name}Page';

export default {
    title: 'Containers/${menuName || name}'
}

export const myStory = () => <${componentName} />
`;
};

const styleContent = () => "// Here you define the css for this plugin";

yargs(hideBin(process.argv))
    .command(
        "$0 create <name>",
        "create an skeleton for a new plugin",
        (yargs) =>
            yargs
                .positional("name", {
                    describe:
                        "the name of your plugin without lime-plugin suffix",
                })
                .option("protected", {
                    alias: "p",
                    type: "boolean",
                    default: false,
                    describe: "whether it is protected by shared password",
                })
                .option("menu-name", {
                    alias: "m",
                    type: "string",
                    describe: "name for the menu entry. Default to plugin name",
                }),
        create
    )
    .help().argv;

function create(argv) {
    const name = argv.name;
    const pluginName = `lime-plugin-${name}`;
    const baseDir = path.join(__dirname, "..", "plugins", pluginName);
    fs.mkdirSync(baseDir);
    fs.mkdirSync(path.join(baseDir, "src"));
    fs.writeFileSync(
        path.join(baseDir, "src", `${name}Page.js`),
        pageContent(name)
    );
    fs.writeFileSync(
        path.join(baseDir, "src", `${name}Queries.js`),
        queriesContent(name)
    );
    fs.writeFileSync(path.join(baseDir, "src", `${name}Api.js`), apiContent());
    fs.writeFileSync(
        path.join(baseDir, "src", `${name}Api.spec.js`),
        apiSpecContent(name)
    );
    fs.writeFileSync(
        path.join(baseDir, "src", `${name}Menu.js`),
        menuContent(name, argv.menuName)
    );
    fs.writeFileSync(
        path.join(baseDir, "src", `${name}Style.less`),
        styleContent()
    );
    fs.writeFileSync(
        path.join(baseDir, "index.js"),
        indexContent(name, argv.protected)
    );
    fs.writeFileSync(path.join(baseDir, `${name}.spec.js`), specContent(name));
    fs.writeFileSync(
        path.join(baseDir, `${name}.stories.js`),
        storiesContent(name)
    );
    const configPath = path.join(__dirname, "..", "src", "config.js");
    console.log(
        `You are done. Remember to add ${name} to the list in ${configPath}`
    );
}
