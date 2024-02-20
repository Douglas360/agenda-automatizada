"use client";
import SchedulerComponent from "@/components/Scheduler/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calendário de eventos" />
      <SchedulerComponent isEdit={true} />
    </DefaultLayout>
  );
};

export default CalendarPage;
