interface ProductFormFieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

export const ProductFormField = ({
  label,
  error,
  children,
}: ProductFormFieldProps) => (
  <div>
    <label className="mb-2 ml-1 block text-[11px] font-bold tracking-wider text-gray-400 uppercase">
      {label}
    </label>
    {children}
    {error && (
      <p className="mt-1.5 ml-1 text-[10px] font-medium text-red-500">
        {error}
      </p>
    )}
  </div>
)
