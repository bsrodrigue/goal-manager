
interface BaseInputProps {
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  isLoading?: boolean;

  type?: string;
}

export default function BaseInput({ isLoading, value, label, placeholder, onChange, type }: BaseInputProps) {
  return (
    <div className="form-control my-1">
      <small className="label font-bold">{label}</small>
      <input
        value={value}
        type={type}
        className="input input-bordered w-full focus:outline-none"
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder} />
    </div>
  )
}
