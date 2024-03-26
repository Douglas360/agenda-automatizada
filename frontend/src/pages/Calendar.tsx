import React, { useEffect } from 'react';
import { Scheduler } from 'devextreme-react';
import { locale, loadMessages } from 'devextreme/localization';
import ptBR from 'devextreme/localization/messages/pt.json';
import { View } from 'devextreme-react/scheduler';

import { useEvents } from '../context/EventsContext/eventAuth';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const Calendar: React.FC = () => {
  const { events, getEvents } = useEvents();
  //const [events, setEvents] = useState<Event[]>([]);

  const getAllEvents = async () => {
    await getEvents();
  };

  useEffect(() => {
    getAllEvents();
    loadMessages(ptBR);
    locale('pt-BR');
  }, []);
  const eventsList = events.map((event) => {
    return {
      text: event.name,
      startDate: new Date(event.date),
      endDate: new Date(event.date),
      description: event.description,
    };
  });

  /*const eventsList = [
    {
      text: 'Website Re-Design Plan',
      startDate: new Date(2024, 27, 3, 9, 30),
      endDate: new Date(2024, 27, 3, 11, 30),
    },
    {
      text: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2024, 2, 27, 12, 0),
      endDate: new Date(2024, 2, 27, 13, 0),
    },
    {
      text: 'Install New Router in Dev Room',
      startDate: new Date(2024, 6, 2, 14, 30),
      endDate: new Date(2024, 6, 2, 15, 30),
    },
    {
      text: 'Approve Personal Computer Upgrade Plan',
      startDate: new Date(2024, 6, 2, 10, 0),
      endDate: new Date(2024, 6, 2, 11, 0),
    },
    {
      text: 'Final Budget Review',
      startDate: new Date(2024, 6, 2, 12, 0),
      endDate: new Date(2024, 6, 2, 13, 35),
    },
    {
      text: 'New Brochures',
      startDate: new Date(2024, 6, 2, 14, 30),
      endDate: new Date(2024, 6, 2, 15, 45),
    },
    {
      text: 'Install New Database',
      startDate: new Date(2024, 6, 2, 9, 45),
      endDate: new Date(2024, 6, 2, 11, 15),
    },
    {
      text: 'Approve New Online Marketing Strategy',
      startDate: new Date(2024, 6, 2, 12, 0),
      endDate: new Date(2024, 6, 2, 14, 0),
    },
    {
      text: 'Upgrade Personal Computers',
      startDate: new Date(2024, 6, 2, 15, 15),
      endDate: new Date(2024, 6, 2, 16),
    },
  ];*/
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calendar" />

      {/* <!-- ====== Calendar Section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Scheduler
          dataSource={eventsList}
          timeZone="America/Sao_Paulo"
          defaultCurrentView={'month'}
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
      </div>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </DefaultLayout>
  );
};

export default Calendar;
