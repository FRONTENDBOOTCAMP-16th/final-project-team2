import { useId } from "react";

interface ProfileFormProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  readOnly?: boolean;
  error?: string;
}

export default function ProfileForm({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  type,
  readOnly = false,
  error,
}: ProfileFormProps) {
  const id = useId();
  const isNotEditable = disabled || readOnly;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700 ml-1">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-[672px] h-[50px] pl-4 border 
          ${error ? "border-red-500" : "border-gray-300"} 
          ${
            isNotEditable
              ? "bg-gray-50 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-800 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          }
        `}
      />
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
}
