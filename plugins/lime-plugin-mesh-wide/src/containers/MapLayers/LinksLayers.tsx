import LinkLine from "plugins/lime-plugin-mesh-wide/src/components/Map/LinkLine";
import { useLocatedLinks } from "plugins/lime-plugin-mesh-wide/src/hooks/useLocatedLinks";
import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { LocatedLinkData } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

interface ILinksLayerProps {
    links: LocatedLinkData;
    linksReference: LocatedLinkData;
    newLinks: LocatedLinkData;
    linksLoaded: boolean;
}

const LinksLayer = ({
    links,
    linksReference,
    linksLoaded,
    newLinks,
}: ILinksLayerProps) => {
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
            {newLinks &&
                Object.entries(newLinks).map(([k, v], i) => {
                    return <LinkLine key={i} actualLink={v} />;
                })}
        </div>
    );
};

export const WifiLinksLayer = () => {
    const {
        locatedNewLinks: newLinks,
        locatedLinks,
        locatedLinksReference,
        linksLoaded,
    } = useLocatedLinks({ type: "wifi_links_info" });

    return (
        <div>
            <LinksLayer
                links={locatedLinks}
                linksReference={locatedLinksReference}
                linksLoaded={linksLoaded}
                newLinks={newLinks}
            />
        </div>
    );
};

export const BatmanLinksLayer = () => {
    const {
        locatedNewLinks: newLinks,
        locatedLinks,
        locatedLinksReference,
        linksLoaded,
    } = useLocatedLinks({ type: "bat_links_info" });

    return (
        <div>
            <LinksLayer
                links={locatedLinks}
                linksReference={locatedLinksReference}
                linksLoaded={linksLoaded}
                newLinks={newLinks}
            />
        </div>
    );
};
