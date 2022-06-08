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
  onUpdate: React.FormEventHandler<HTMLFormElement>;
  onCancel: (e: React.MouseEvent) => void;
  actionButton: string;
};

const Form = ({
  formData,
  setFormData,
  onSave,
  onUpdate,
  onCancel,
  actionButton,
}: Props) => {
  return (
    <>
      <form
        autoComplete="off"
        onSubmit={actionButton === "save" ? onSave : onUpdate}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
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
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <button type="submit">
          {actionButton === "save" ? "submit" : "update"}
        </button>
        <button onClick={onCancel}>cancel</button>
      </form>
    </>
  );
};

export default Form;
