/**
 * Contain icons related to status message. Minimal components usually using a simple character
 */

export type StatusIcons = "success" | "warning";

export const StatusIcon = ({ status }: { status: StatusIcons }) => {
    switch (status) {
        case "warning":
            return <Warning />;
        case "success":
        default:
            return <Tick />;
    }
};

interface IconsProps {
    className?: string;
}

export const Tick = ({ className }: IconsProps) => (
    <span className={`text-success text-4xl ${className}`}>✓</span>
);

export const Warning = ({ className = "w-8 h-8" }: IconsProps) => (
    <span
        className={`rounded-full border-2 border-danger text-danger flex items-center justify-center mx-2 ${className}`}
    >
        !
    </span>
);
