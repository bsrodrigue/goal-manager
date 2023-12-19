
interface BaseInputProps {
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function BaseInput({ value, label, placeholder, onChange }: BaseInputProps) {
  return (
    <div className="form-control my-1">
      <small className="label font-bold">{label}</small>
      <input
        value={value}
        type="text"
        className="input input-bordered w-full focus:outline-none"
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder} />
    </div>
  )
}
