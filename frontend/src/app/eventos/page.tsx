"use client";
import SchedulerComponent from "@/components/Scheduler/page";

const page = () => {
  if (typeof window === "undefined") return null;
  return (
    <>
      <SchedulerComponent />
    </>
  );
};

export default page;
