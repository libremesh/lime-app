type DividerColors = "gray" | "white";
const Divider = ({ color = "gray" }: { color?: DividerColors }) => (
    <div
        className={`flex-grow border-t-2 w-11/12 ${
            color === "white" ? "border-white" : "border-gray-300"
        }`}
    />
);

export default Divider;
