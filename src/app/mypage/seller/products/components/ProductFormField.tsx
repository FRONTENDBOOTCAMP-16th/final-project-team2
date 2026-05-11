interface ProductFormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const ProductFormField = ({
  label,
  error,
  children,
}: ProductFormFieldProps) => (
  <div>
    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2 ml-1">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-red-500 text-[10px] mt-1.5 ml-1 font-medium">
        {error}
      </p>
    )}
  </div>
);
