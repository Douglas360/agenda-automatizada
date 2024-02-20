import React, { use, useEffect } from "react";
import { Scheduler } from "devextreme-react";
import { Resource, View, Editing } from "devextreme-react/scheduler";

import { locale, loadMessages } from "devextreme/localization";
import ptBR from "devextreme/localization/messages/pt.json";

import { assignees, data, type } from "../../mock/data";

interface Props {
  isEdit: boolean;
}

const SchedulerComponent = ({ isEdit }: Props) => {
  useEffect(() => {
    loadMessages(ptBR);
    locale("pt-BR");
  }, []);

  return (
    <>
      <Scheduler
        dataSource={data}
        timeZone="America/Sao_Paulo"
        defaultCurrentView={"month"}
        firstDayOfWeek={1}
        startDayHour={8}
        endDayHour={18}
        height={600}
        noDataText="Nenhum evento encontrado"
      >
        <Editing
          allowAdding={isEdit}
          allowUpdating={isEdit}
          allowDeleting={isEdit}
          allowDragging={isEdit}
        />
        <Resource
          dataSource={assignees}
          allowMultiple={true}
          fieldExpr="assigneeId"
          label="Ministério"
          useColorAsDefault={true}
        />
        <Resource
          dataSource={type}
          fieldExpr="priorityId"
          label="Tipo do Evento"
        />
        <View type="month" name="Mês" />
        <View type="day" name="Dia" />
        <View type="agenda" name="Próximos Eventos" />
      </Scheduler>
    </>
  );
};

export default SchedulerComponent;
