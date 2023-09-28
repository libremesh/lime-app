import { ComponentType } from "preact";

import WifiLinkLine from "plugins/lime-plugin-mesh-wide/src/components/Map/WifiLinkLine";
import { useLocatedLinks } from "plugins/lime-plugin-mesh-wide/src/hooks/useLocatedLinks";
import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { LocatedLinkData } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

interface ILinkComponentProps {
    referenceLink: PontToPointLink;
    actualLink: PontToPointLink | undefined;
}

interface ILinksLayerProps {
    links: LocatedLinkData;
    linksReference: LocatedLinkData;
    linksLoaded: boolean;
    LinkComponent: ComponentType<ILinkComponentProps>;
}

const LinksLayer = ({
    links,
    linksReference,
    linksLoaded,
    LinkComponent,
}: ILinksLayerProps) => {
    return (
        <>
            {linksLoaded &&
                Object.entries(linksReference).map((referenceLink, i) => {
                    let actualLink: PontToPointLink;
                    if (links) {
                        actualLink = Object.values(links).find(
                            (value) => value.id === referenceLink[0]
                        );
                    }
                    return (
                        <LinkComponent
                            key={i}
                            referenceLink={referenceLink[1]}
                            actualLink={actualLink}
                        />
                    );
                })}
        </>
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
                LinkComponent={WifiLinkLine}
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
                LinkComponent={WifiLinkLine}
            />
        </div>
    );
};
