"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormUser from "@/components/FormUser";
import { User } from "@/types/user";
import { useParams } from "next/navigation";

const userData: User[] = [
  {
    id: 1,
    name: "Douglas",
    email: "alexsmith@gmail.com",
    status: "Ativo",
    avatar: "/images/brand/brand-01.svg",
    phone: "+1 234 567 890",
    isAdmin: true,
    idMinistry: 1,
  },
  {
    id: 2,
    name: "John Doe",
    email: "johndoe@gmail.com",
    status: "Inativo",
    avatar: "/images/brand/brand-02.svg",
    phone: "+1 234 567 890",
    isAdmin: false,
    idMinistry: 2,
  },
  {
    id: 3,
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    status: "Pendente",
    avatar: "/images/brand/brand-03.svg",
    phone: "+1 234 567 890",
  },
];

const EditUserPage = () => {
  const { id } = useParams();

  const userToEdit = userData.find((user) => user.id === Number(id)) as User;

  return (
    <DefaultLayout>
      <FormUser userData={userToEdit} />
    </DefaultLayout>
  );
};

export default EditUserPage;
