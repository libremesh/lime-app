import { ComponentChildren, FunctionalComponent } from "preact";

interface SectionTitleProps {
    children?: ComponentChildren;
    icon: ComponentChildren;
}

export const SectionTitle: FunctionalComponent<SectionTitleProps> = ({
    children,
    icon,
}) => {
    return (
        <div className="flex ">
            <span className={"text-primary-dark fill-current"}>{icon}</span>
            <h1 className="text-4xl font-bold text-left mb-8">{children}</h1>
        </div>
    );
};

export const Section = ({ ...props }) => {
    return (
        <div className="flex-1">
            <div className="container mx-auto px-4 py-8">{props.children}</div>
        </div>
    );
};
