import { Checkbox } from "@/components/ui/checkbox";

export default function InputCheckBox({
  label,
  placeholder,
  value,
  error,
  isDisabled,
  id,
  onChange,
  tabIndex,
}: Readonly<{
  label?: string;
  placeholder: string;
  value: boolean;
  error: string | undefined | any;
  isDisabled?: boolean;
  id: string;
  onChange: (e: any) => void;
  tabIndex?: number;
}>) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        disabled={isDisabled}
        tabIndex={tabIndex}
        checked={value}
        onCheckedChange={onChange}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none cursor-pointer select-none peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
