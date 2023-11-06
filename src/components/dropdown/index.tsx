type DropdownProps = {
  onChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void
  value: number
  options: readonly number[]
}

export function Dropdown({ value, onChange, options }: DropdownProps) {
  return (
    <select
      aria-label='combobox'
      onChange={onChange}
      value={value}
      className='border border-gray-300 rounded'
    >
      {options.map((v) => (
        <option value={v} key={v}>
          {v}
        </option>
      ))}
    </select>
  )
}
