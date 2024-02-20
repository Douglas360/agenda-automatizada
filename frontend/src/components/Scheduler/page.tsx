import React from "react";
import { Scheduler } from "devextreme-react";
import { Resource, View } from "devextreme-react/scheduler";

const events = [
  {
    text: "Website Re-Design Plan",
    startDate: new Date(2024, 1, 6, 9, 30),
    endDate: new Date(2024, 1, 6, 11, 30),
  },
  {
    text: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2024, 1, 14, 12, 0),
    endDate: new Date(2024, 1, 14, 13, 0),
    allDay: true,
  },
];

const SchedulerComponent = () => {
  return (
    <>
      <Scheduler
        dataSource={events}
        timeZone="America/Sao_Paulo"
        defaultCurrentView={"month"}
        firstDayOfWeek={1}
        startDayHour={8}
        endDayHour={18}
        height={600}
        noDataText="Nenhum evento encontrado"
      >
        <View type="month" name="Mês" />
        <View type="day" name="Dia" />
        <View type="agenda" name="Próximos Eventos" />
      </Scheduler>
    </>
  );
};

export default SchedulerComponent;
