import type { NextPage } from "next";
import type { User } from "@prisma/client";
import { useState } from "react";
import { useUsers } from "hooks/useUsers";
import { fetchUser } from "lib/fetchUser";
import Container from "components/Container";
import Users from "components/Users";
import Form from "components/Form";

const initialValues = {
  name: "",
  email: "",
};

const Home: NextPage = () => {
  const [formData, setFormData] = useState(initialValues);
  const [actionMethod, setActionMethod] = useState<"save" | "update">("save");
  const { users, isLoading, mutate } = useUsers("/users");

  // Clear Form
  const handleClear = () => {
    setFormData(initialValues);
    setActionMethod("save");
    mutate();
  };

  // Edit User
  const handleEdit = (user: User) => {
    setFormData(user);
    setActionMethod("update");
  };

  // Save - Update User
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = actionMethod === "save" ? "POST" : "PUT";
    const { response, info } = await fetchUser(method, formData);
    if (response.status < 300) {
      handleClear();
    }
    console.log(info.message);
  };

  // Delete User
  const handleDelete = async (user: User) => {
    const { info } = await fetchUser("DELETE", user);
    handleClear();
    console.log(info.message);
  };

  return (
    <Container title="Next.js with Prisma (SQLite)">
      <h1>Next.js with Prisma (SQLite)</h1>

      {isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <Users users={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Form
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onClear={handleClear}
        actionMethod={actionMethod}
      />
    </Container>
  );
};

export default Home;
