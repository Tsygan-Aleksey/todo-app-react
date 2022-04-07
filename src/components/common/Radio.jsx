function Radio({ label, value, checked }) {
  return (
    <label>
      <input type="radio" name="todos" value={value} checked={checked} />
      {label}
    </label>
  );
}

export const RadioGroup = ({ value: groupValue, options }) => {
  return (
    <>
      {options.map(({ value, label }) => (
        <Radio value={value} label={label} checked={value === groupValue} />
      ))}
    </>
  );
};
