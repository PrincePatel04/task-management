import { Label, TextInput } from "flowbite-react";
import { InputHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues>
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    error?: string;
}

const CustomInput = <T extends FieldValues>({
    label,
    error,
    control,
    name,
    placeholder,
    ...rest
}: Props<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="relative">
                    <Label value={label} />
                    <TextInput
                        className="w-full"
                        placeholder={placeholder || `Enter ${name}`}
                        {...field}
                        {...rest}
                    />
                    {error && (
                        <p className="absolute text-xs text-red-500">{error}</p>
                    )}
                </div>
            )}
        />
    );
};

export default CustomInput;
