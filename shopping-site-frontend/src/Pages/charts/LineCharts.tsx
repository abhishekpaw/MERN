import { useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar"
import { LineChart } from "../../components/Charts";
import { getLastMonths } from "../../utils/feature";
import type { RootState } from "../../redux/store";
import { useLineQuery } from "../../redux/api/dashboardAPI";
import type { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/loader";

const{last12Months} = getLastMonths();

const LineCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, error, isError } = useLineQuery(user?._id!);

  const users = data?.charts.users || [];
  const products = data?.charts.product || [];
  const revenue = data?.charts.revenue || [];
  const discount = data?.charts.discount || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section>
              <LineChart
                data={users}
                label="Users"
                borderColor="rgb(53,162,255)"
                backgroundColor="rgb(53,162,255,0.5)"
                labels={last12Months}
              />
              <h2>Active Users</h2>
            </section>
            <section>
              <LineChart
                data={products}
                label="Products"
                backgroundColor={"hsla(269,80%,40%,0.4)"}
                borderColor={"hsl(269,80%,40%)"}
                labels={last12Months}
              />
              <h2>Total Products (SKU)</h2>
            </section>
            <section>
              <LineChart
                data={revenue}
                label="Revenue"
                backgroundColor={"hsla(129,80%,40%,0.4)"}
                borderColor={"hsl(129,80%,40%)"}
                labels={last12Months}
              />
              <h2>Total Revenue</h2>
            </section>
            <section>
              <LineChart
                data={discount}
                label="Discount"
                backgroundColor={"hsla(29,80%,40%,0.4)"}
                borderColor={"hsl(29,80%,40%)"}
                labels={last12Months}
              />
              <h2>Discount Allotted</h2>
            </section>
          </>
        )}{" "}
      </main>
    </div>
  );
};


export default LineCharts
