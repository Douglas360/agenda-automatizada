import SchedulerComponent from "../Scheduler/page";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const Calendar = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Calendar" />

      {/* <!-- ====== Calendar Section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <SchedulerComponent />
      </div>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </div>
  );
};

export default Calendar;
