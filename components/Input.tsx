type Props = {
  type?: string;
  name: string;
  placeholder: string;
  value: string;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Input = ({
  type = "text",
  name,
  placeholder,
  value,
  onInputChange,
}: Props) => {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        required
        onChange={onInputChange}
      />
    </>
  );
};

export default Input;
