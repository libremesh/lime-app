import { ComponentChildren, FunctionalComponent } from "preact";

export const IconsClassName = "h-14 w-14";

interface SectionTitleProps {
    children?: ComponentChildren;
    icon: ComponentChildren;
}

export const SectionTitle: FunctionalComponent<SectionTitleProps> = ({
    children,
    icon,
}) => {
    return (
        <div className="flex items-center gap-x-4 ml-6 mt-6">
            <span className={"text-primary-dark fill-current"}>{icon}</span>
            <h1 className="text-4xl font-bold text-left">{children}</h1>
        </div>
    );
};

export const Section = ({ ...props }) => {
    return (
        <div className={"w-full container "}>
            <div className="w-full" {...props}>
                {props.children}
            </div>
        </div>
    );
};
