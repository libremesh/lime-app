import { ComponentChildren } from "preact";
import React from "react";

import { Button, ButtonProps } from "components/elements/button";

interface FloatingButtonProps {
    children?: ComponentChildren | string;
}

const FloatingButton = ({
    size = "sm",
    children = "+",
    ...rest
}: FloatingButtonProps & ButtonProps) => {
    return (
        <div className="z-50 fixed bottom-4 right-4 my-2 mx-4">
            <Button size={size} {...rest}>
                {children}
            </Button>
        </div>
    );
};

export default FloatingButton;
