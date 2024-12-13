// For less files
declare module "*.less" {
    const mapping: Record<string, string>;
    export default mapping;
}

type Locales = "en" | "es" | "pt" | "it";

type LimeRoutes = [string, typeof JSX.Element];

interface LimePlugin {
    name: string;
    page: typeof JSX.Element;
    menu: typeof JSX.Element;
    isCommunityProtected?: boolean;
    additionalRoutes?: LimeRoutes[];
    additionalProtectedRoutes?: LimeRoutes[];
    menuGroup?: string;
}
