import { useState } from 'react';
import { TMinistry } from '../types/ministry';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableMinistry from '../components/Tables/TableMinistry';

const Ministry = () => {
  const [ministries, setMinistries] = useState<TMinistry>({} as TMinistry);

  const handleSave = (ministry: TMinistry) => {
    //TODO: Implementar a chamada da API para salvar o ministério
    console.log('Cadastrar: ' + ministry.name);
  };
  const handleLoadDataToEdit = (ministry: TMinistry) => {
    //TODO: Implementar a chamada da API para editar o ministério
    setMinistries(ministry);
    console.log('Editar: ');
    console.log(ministry);
  };
  const handleUpdate = (ministry: TMinistry) => {
    //TODO: Implementar a chamada da API para editar o ministério
    console.log('Atualizar no banco com o ID: ' + ministry.id);
    console.log(ministry);

    setMinistries({} as TMinistry);
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
              value={ministries.name}
              onChange={(e) =>
                setMinistries({ ...ministries, name: e.target.value })
              }
            />
            <button
              className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              onClick={
                ministries.id
                  ? () => handleUpdate(ministries)
                  : () => handleSave(ministries)
              }
            >
              {ministries.id ? 'Editar' : 'Cadastrar'}
            </button>
          </div>
        </div>

        {/*TABLE */}
        <TableMinistry onEdit={handleLoadDataToEdit} />
      </div>
    </DefaultLayout>
  );
};

export default Ministry;
