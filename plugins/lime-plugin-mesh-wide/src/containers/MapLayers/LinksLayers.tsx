import LinkLine from "plugins/lime-plugin-mesh-wide/src/components/Map/LinkLine";
import { useLocatedLinks } from "plugins/lime-plugin-mesh-wide/src/hooks/useLocatedLinks";
import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { LocatedLinkData } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

import { isEmpty } from "utils/utils";

interface ILinksLayerProps {
    links: LocatedLinkData;
    linksReference: LocatedLinkData;
    linksLoaded: boolean;
}

const LinksLayer = ({
    links,
    linksReference: originalLinksReference,
    linksLoaded,
}: ILinksLayerProps) => {
    // If reference is not set or empty, use actual nodes
    const linksReference =
        !originalLinksReference || isEmpty(originalLinksReference)
            ? links
            : originalLinksReference;

    return (
        <div>
            {linksLoaded &&
                Object.entries(linksReference).map((referenceLink, i) => {
                    let actualLink: PontToPointLink;
                    if (links) {
                        actualLink = Object.values(links).find(
                            (value) => value.id === referenceLink[0]
                        );
                    }
                    return (
                        <LinkLine
                            key={i}
                            referenceLink={referenceLink[1]}
                            actualLink={actualLink}
                        />
                    );
                })}
        </div>
    );
};

export const WifiLinksLayer = () => {
    const { locatedLinks, locatedLinksReference, linksLoaded } =
        useLocatedLinks({ type: "wifi" });

    return (
        <div>
            <LinksLayer
                links={locatedLinks}
                linksReference={locatedLinksReference}
                linksLoaded={linksLoaded}
            />
        </div>
    );
};

export const BatmanLinksLayer = () => {
    const { locatedLinks, locatedLinksReference, linksLoaded } =
        useLocatedLinks({ type: "batman" });

    return (
        <div>
            <LinksLayer
                links={locatedLinks}
                linksReference={locatedLinksReference}
                linksLoaded={linksLoaded}
            />
        </div>
    );
};
