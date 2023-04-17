import React from "react";

interface FloatingButtonProps {
    onClick?: () => void;
    children?: React.ReactNode | string;
}

const FloatingButton = ({ onClick, children = "+" }: FloatingButtonProps) => {
    return (
        <button
            className="z-50 fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default FloatingButton;
