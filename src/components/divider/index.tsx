type DividerColors = "gray" | "white";
type DividerSize = "full" | "short";
const Divider = ({
    color = "gray",
    width = "short",
}: {
    color?: DividerColors;
    width?: DividerSize;
}) => (
    <div
        className={`flex-grow border-t-2 ${
            color === "white" ? "border-white" : "border-gray-300"
        } ${width === "full" ? "w-full" : "w-11/12"}`}
    />
);

export default Divider;
