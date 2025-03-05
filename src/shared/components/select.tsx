import { Label, Select } from "flowbite-react";
import { SelectHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues>
    extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    error?: string;
    options: { value: string; label: string }[]; // Array of options for the select
}

const CustomSelect = <T extends FieldValues>({
    label,
    error,
    control,
    name,
    options,
    ...rest
}: Props<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="relative">
                    <Label value={label} />
                    <Select className="w-full" {...field} {...rest}>
                        <option value="" disabled>
                            None
                        </option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                    {error && (
                        <p className="absolute text-xs text-red-500">{error}</p>
                    )}
                </div>
            )}
        />
    );
};

export default CustomSelect;
