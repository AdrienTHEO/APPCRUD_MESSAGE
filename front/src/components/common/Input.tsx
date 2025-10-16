
interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        } disabled:bg-gray-100`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}