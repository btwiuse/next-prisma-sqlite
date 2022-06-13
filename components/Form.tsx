import Input from "./Input";

type Props = {
  formData: {
    name: string;
    email: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
    }>
  >;
  onSave: React.FormEventHandler<HTMLFormElement>;
  onClear: () => void;
  actionMethod: string;
};

const Form = ({
  formData,
  setFormData,
  onSave,
  onClear,
  actionMethod,
}: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <form autoComplete="off" onSubmit={onSave}>
        <Input
          name="name"
          placeholder="Name"
          value={formData.name}
          onInputChange={handleInputChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onInputChange={handleInputChange}
        />
        <button type="submit">
          {actionMethod === "save" ? "save" : "update"}
        </button>
        <input type="button" value="clear" onClick={onClear} />
      </form>
    </>
  );
};

export default Form;
