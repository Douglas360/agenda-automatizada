"use client";
import React, { use, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableMinistry from "@/components/Tables/TableMinistry";
import { Metadata } from "next";
import { Ministry } from "@/types/ministry";

{
  /*export const metadata: Metadata = {
  title: "NotificaIA - Cadastro de Ministério",
  description:
    "Página de cadastro de ministério do sistema NotificaIA. Cadastre um novo ministério e defina suas permissões e funções.",
};*/
}

const RegisterMinistryPage = () => {
  const [ministry, setMinistry] = useState<Ministry>({} as Ministry);

  const handleSave = (ministry: Ministry) => {
    //TODO: Implementar a chamada da API para salvar o ministério
    console.log("Cadastrar: " + ministry.name);
  };
  const handleLoadDataToEdit = (ministry: Ministry) => {
    //TODO: Implementar a chamada da API para editar o ministério
    setMinistry(ministry);
    console.log("Editar: ");
    console.log(ministry);
  };
  const handleUpdate = (ministry: Ministry) => {
    //TODO: Implementar a chamada da API para editar o ministério
    console.log("Atualizar no banco com o ID: " + ministry.id);
    console.log(ministry);

    setMinistry({} as Ministry);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cadastro de Ministério" />
      <div className="flex flex-col gap-10">
        {/*INPUT FORM */}
        <div>
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="fullName"
          >
            Nome do Ministério
          </label>
          <div className="flex flex-row gap-1">
            <input
              className="w-full rounded border border-stroke bg-gray py-3 pl-6 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="ministry"
              id="ministry"
              placeholder="Digite o nome do ministério"
              value={ministry.name}
              onChange={(e) =>
                setMinistry({ ...ministry, name: e.target.value })
              }
            />
            <button
              className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              onClick={
                ministry.id
                  ? () => handleUpdate(ministry)
                  : () => handleSave(ministry)
              }
            >
              {ministry.id ? "Editar" : "Cadastrar"}
            </button>
          </div>
        </div>

        {/*TABLE */}
        <TableMinistry onEdit={handleLoadDataToEdit} />
      </div>
    </DefaultLayout>
  );
};

export default RegisterMinistryPage;
