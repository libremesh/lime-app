import { WellcomeScreenEditor } from "./wellcomeScreenEditor";

export default {
    title: "Containers/WellcomeScreenEditor",
};

export const wellcomeScreenWithoutLogo = () => <WellcomeScreenEditor />;
wellcomeScreenWithoutLogo.args = {
    queries: [
        [
            ["pirania", "get_portal_page_content"],
            {
                title: "mocked title",
                body: "mocked body",
                link_title: "mocked link title",
                link_url: "mocked_link_url.com",
            },
        ],
    ],
};

export const wellcomeScreenWithLogo = () => <WellcomeScreenEditor />;
wellcomeScreenWithLogo.args = {
    queries: [
        [
            ["pirania", "get_portal_page_content"],
            {
                title: "mocked title",
                body: "mocked body",
                link_title: "mocked link title",
                link_url: "mocked_link_url.com",
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABrCAMAAACi04sXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc0MjEyOEY5NUEyOTExRTlBNTMwOTU0MjBCQTA4RDNCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc0MjEyOEZBNUEyOTExRTlBNTMwOTU0MjBCQTA4RDNCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzQyMTI4Rjc1QTI5MTFFOUE1MzA5NTQyMEJBMDhEM0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzQyMTI4Rjg1QTI5MTFFOUE1MzA5NTQyMEJBMDhEM0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ENYiSAAAAM1BMVEUQEBBA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",
            },
        ],
    ],
};
