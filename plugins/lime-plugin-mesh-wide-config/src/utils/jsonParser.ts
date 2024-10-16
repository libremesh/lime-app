import { IMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

export const jsonToConfig = (json: IMeshWideConfig): string => {
    let configFileContent = "";

    for (const section in json) {
        configFileContent += `config lime '${section}'\n`;

        for (const key in json[section]) {
            const value = json[section][key];

            if (Array.isArray(value)) {
                // Handle lists
                value.forEach((item) => {
                    configFileContent += `\tlist ${key} '${item}'\n`;
                });
            } else {
                // Handle single values (option)
                configFileContent += `\toption ${key} '${value}'\n`;
            }
        }
        configFileContent += "\n"; // Add a new line after each section
    }
    return configFileContent;
};

export const parseConfigFile = (data: string): IMeshWideConfig => {
    const lines = data.split("\n");
    const config: IMeshWideConfig = {};
    let configTitle = "";
    let sectionName = "";

    lines.forEach((line) => {
        line = line.trim();

        // Ignore comments or empty lines
        if (!line || line.startsWith("#")) {
            return;
        }

        if (line.startsWith("config")) {
            // Extract the section name
            const parts = line.split(" ");
            configTitle = parts[1];
            sectionName = parts[2].replace(/'/g, ""); // remove single quotes
            config[sectionName] = {};
        } else if (line.startsWith("option") || line.startsWith("list")) {
            // Parse key-value pairs
            const parts = line.split(" ");
            const key = parts[1];
            const value = line
                .split(/ (.+)/)[1]
                .split(/ (.+)/)[1]
                .replace(/'/g, ""); // strip quotes

            if (line.startsWith("list")) {
                // Add value to list
                if (!config[sectionName][key]) {
                    config[sectionName][key] = [];
                }
                (config[sectionName][key] as string[]).push(value);
            } else {
                // Assign value to option
                config[sectionName][key] = value;
            }
        }
    });

    return config;
};
