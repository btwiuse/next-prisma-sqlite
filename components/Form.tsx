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
  return (
    <>
      <form autoComplete="off" onSubmit={onSave}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          // required
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          // required
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <button type="submit">
          {actionMethod === "save" ? "submit" : "update"}
        </button>
        <input type="button" value="clear" onClick={onClear} />
      </form>
    </>
  );
};

export default Form;
