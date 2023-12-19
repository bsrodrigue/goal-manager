interface BaseTextAreaProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function BaseTextArea({ value, label, placeholder, onChange }: BaseTextAreaProps) {
  return (
    <div className="form-control my-1">
      <small className="label font-bold">{label}</small>
      <textarea
        value={value}
        className="textarea textarea-bordered"
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder} ></textarea>
    </div>
  )
}

