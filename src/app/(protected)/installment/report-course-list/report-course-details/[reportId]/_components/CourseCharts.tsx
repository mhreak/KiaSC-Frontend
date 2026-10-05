import DiscountUsageChart from "./charts/DiscountUsageChart";
import RegistrationTypeChart from "./charts/RegisterationTypeChart";
import WalletUsageChart from "./charts/WalletUsageChart";

export default function CourseCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <RegistrationTypeChart />
      <DiscountUsageChart />
      <WalletUsageChart />
    </div>
  );
}