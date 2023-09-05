import LinkLine from "plugins/lime-plugin-mesh-wide/src/components/Map/LinkLine";
import { useLocatedLinks } from "plugins/lime-plugin-mesh-wide/src/hooks/useLocatedLinks";
import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";

export const LinksLayer = () => {
    const { locatedLinks, locatedLinksReference, linksLoaded } =
        useLocatedLinks();

    return (
        <>
            {linksLoaded &&
                Object.entries(locatedLinksReference).map(
                    (referenceLink, i) => {
                        let actualLink: PontToPointLink;
                        if (locatedLinks) {
                            actualLink = Object.values(locatedLinks).find(
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
                    }
                )}
        </>
    );
};
