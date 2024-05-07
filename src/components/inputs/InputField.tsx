import { ComponentChild } from "preact";
import { FieldValues, Path } from "react-hook-form";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

const InputField = <TFieldValues extends FieldValues>({
    id,
    label,
    register,
    options,
}: {
    id: Path<TFieldValues>;
    label: string | ComponentChild;
    register?: UseFormRegister<TFieldValues>;
    options?: RegisterOptions;
}) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                type="text"
                id={id}
                data-testid="password-input"
                {...register(id, { ...options })}
                className="w-100"
            />
        </div>
    );
};

export default InputField;
