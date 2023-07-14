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

const Tick = () => <span className={"text-success text-4xl"}>✓</span>;

const Warning = () => (
    <span
        className={
            "rounded-full border-2 border-danger text-danger w-8 h-8 flex items-center justify-center mx-2"
        }
    >
        !
    </span>
);
