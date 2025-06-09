import toast from "react-hot-toast";
import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa6";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import userimg from "../assets/male_user.png";
import AdminSidebar from "../components/AdminSidebar";
import { BarChart, DoughnutChart } from "../components/Charts";
import Table from "../components/DashboardTable";
import { Skeleton } from "../components/loader";
import { useStatsQuery } from "../redux/api/dashboardAPI";
import type { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);

  const {isLoading,data,isError} = useStatsQuery(user?._id!);

  const stats = data?.stats!;

    if (isError) return <Navigate to={"/"}/>
    
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <div className="bar">
              <BsSearch />
              <input type="text" placeholder="Search for data,users,docs" />
              <FaRegBell />
              <img src={user?.photo! || userimg} alt="user" />
            </div>
            <section className="widget-container">
              <WidgetItem
                heading={"Revenue"}
                value={stats.count.revenue}
                percent={stats.changePercent.revenue}
                color="rgb(0,155,255)"
                amount={true}
              />
              <WidgetItem
                heading={"Users"}
                value={stats.count.user}
                percent={stats.changePercent.user}
                color="rgb(0,198,202)"
                amount={false}
              />
              <WidgetItem
                heading={"Transactions"}
                value={stats.count.order}
                percent={stats.changePercent.order}
                color="rgb(255,196,0)"
                amount={false}
              />
              <WidgetItem
                heading={"Prodcuts"}
                value={stats.count.product}
                percent={30}
                color="rgb(75,0,255)"
                amount={false}
              />
            </section>
            <section className="graph-container">
              <div className="revenue-chart">
                <h2>Revenue & Transactions</h2>
                <BarChart
                  data_2={stats.chart.order}
                  data_1={stats.chart.revenue}
                  title_1={"Revenue"}
                  title_2={"Transaction"}
                  bgColor_1={"rgb(0,155,255)"}
                  bgColor_2={"rgba(53,162,235,0.8)"}
                />
              </div>
              <div className="dashboard-categories">
                <h2>Inventory</h2>
                <div>
                  {stats.categoryCount.map((i) => {
                    const [heading, value] = Object.entries(i)[0];
                    return (
                      <CategoryItem
                        key={heading}
                        color={`hsl(${value * 4},${value}%,50%)`}
                        value={value}
                        heading={heading}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
            <section className="transaction-container">
              <div className="gender-chart">
                <h2>Gender Ratio</h2>

                <DoughnutChart
                  labels={["Female", "Male"]}
                  data={[stats.userRatio.female, stats.userRatio.male]}
                  backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
                />
                <p>
                  <BiMaleFemale />
                </p>
              </div>
              <Table
                data={
                  Array.isArray(stats.latestTransaction)
                    ? stats.latestTransaction
                    : []
                }
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

interface WidgetItemProps{
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?:boolean;
}

const WidgetItem = ({heading,value,percent,color,amount=false}:WidgetItemProps) =>(
<article className="widget">
  <div className="widget-info">
    <p>{heading}</p>
    <h4>{amount? `₹${value}` : value}</h4>
    {percent > 0 ? (<span className="green"><HiTrendingUp/> +{`${percent > 10000 ? 9999 : percent}%`}</span>) : (<span className="red"><HiTrendingDown/>{`${percent < -10000 ? -9999 : percent}%`}</span>)}
  </div>

  <div className="widget-circle" style={{background:`conic-gradient(${color} ${(Math.abs(percent)/100)*360}deg,rgb(255,255,255) 0)`}}>
    <span style={{color,}}>{percent > 0 && `${percent > 10000 ? 9999 : percent}%`}{percent < 0 && `${percent < -10000 ? -9999 : percent}%`}</span>
  </div>
</article>
);

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({color,value,heading}:CategoryItemProps) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <div>
      <div style={{backgroundColor:color,width:`${value}%`,}}></div>
    </div>
    <span>{value}%</span>
  </div>
)

export default Dashboard