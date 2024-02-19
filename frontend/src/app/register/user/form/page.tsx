import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormUser from "@/components/FormUser";

export const metadata: Metadata = {
  title: "NotificaIA - Cadastro de usuário",
  description:
    "Página de cadastro de usuário do sistema NotificaIA. Cadastre um novo usuário e defina suas permissões e funções.",
};

const FormUserPage = () => {
  return (
    <DefaultLayout>
      <FormUser />
    </DefaultLayout>
  );
};

export default FormUserPage;
