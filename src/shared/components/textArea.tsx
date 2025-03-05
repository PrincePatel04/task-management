import { Label, Textarea } from "flowbite-react";
import { TextareaHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues>
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    error?: string;
}

const CustomTextArea = <T extends FieldValues>({
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
                    <Textarea
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

export default CustomTextArea;
