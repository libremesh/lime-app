import { ComponentChild } from "preact";
import { JSXInternal } from "preact/src/jsx";
import { FieldValues, Path } from "react-hook-form";

const InputField = <TFieldValues extends FieldValues>({
    id,
    label,
    error,
    ...inputProps
}: {
    id: Path<TFieldValues>;
    label?: string | ComponentChild;
    error?: string | ComponentChild;
} & Partial<
    Omit<JSXInternal.HTMLAttributes<HTMLInputElement>, "label"> & {
        defaultValue?: string;
    }
>) => {
    return (
        <div className={"flex flex-col w-100"}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type="text"
                id={id}
                data-testid="password-input"
                className="w-100"
                {...inputProps}
            />
            {error && <p class="text-red-500 text-md mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
