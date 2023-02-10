import { ComponentChildren, FunctionalComponent } from "preact";

interface SectionTitleProps {
    children: ComponentChildren;
    icon: {
        id: string;
        viewBox: string;
    };
}

export const SectionTitle = ({ children, icon }: SectionTitleProps) => {
    return (
        <div>
            {children}
            {/*<div className="flex items-center">*/}
            {/*    <svg className="w-6 h-6 mr-2" viewBox={icon.viewBox}>*/}
            {/*        <use xlinkHref={`#${icon.id}`} />*/}
            {/*    </svg>*/}
            {/*    <h2 className="text-lg font-semibold">as</h2>*/}
            {/*    {children}*/}
            {/*</div>*/}
        </div>
    );
};
