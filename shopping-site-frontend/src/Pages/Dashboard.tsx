import { BsSearch } from "react-icons/bs"
import AdminSidebar from "../components/AdminSidebar"
import { FaRegBell } from "react-icons/fa6"
import userimg from "../assets/male_user.png"
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import inventorydata from "../assets/data.json";
import { BarChart, DoughnutChart } from "../components/Charts";
import { BiMaleFemale } from "react-icons/bi";
import Table from "../components/DashboardTable"

const Dashboard = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data,users,docs" />
          <FaRegBell />
          <img src={userimg} alt="User" />
        </div>

        <section className="widget-container">
          <WidgetItem
            heading={"Revenue"}
            value={340000}
            percent={40}
            color="rgb(0,155,255)"
            amount={true}
          />
          <WidgetItem
            heading={"Users"}
            value={400}
            percent={-14}
            color="rgb(0,198,202)"
            amount={false}
          />
          <WidgetItem
            heading={"Transactions"}
            value={23000}
            percent={80}
            color="rgb(255,196,0)"
            amount={false}
          />
          <WidgetItem
            heading={"Prodcuts"}
            value={1000}
            percent={30}
            color="rgb(75,0,255)"
            amount={false}
          />
        </section>

        <section className="graph-container">
          <div className="revenue-chart">
            <h2>Revenue & Transactions</h2>
            <BarChart data_2={[300,144,433,655,237,755,190]} data_1={[200,444,343,556,778,455,990]} title_1={"Revenue"} title_2={"Transaction"} bgColor_1={"rgb(0,155,255)"} bgColor_2={"rgba(53,162,235,0.8)"}/>
          </div>
          <div className="dashboard-categories">
            <h2>Inventory</h2>
            <div>
              {inventorydata.categories.map((i) => (
                <CategoryItem 
                  key={i.heading}
                  color={`hsl(${i.value*4},${i.value}%,50%)`} value={i.value} heading={i.heading} />
              ))
              }
            </div>
          </div>
        </section>

        <section className="transaction-container">
          <div className="gender-chart">
            <h2>Gender Ratio</h2>

            <DoughnutChart labels={["Female","Male"]} data={[12,19]} backgroundColor={["hsl(340,82%,56%)","rgba(53,162,235,0.8)"]}/>
            <p><BiMaleFemale/></p>
          </div>

          <Table data={inventorydata.transaction}/>
        </section>
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
    <h4>{amount? `$${value}` : value}</h4>
    {percent > 0 ? (<span className="green"><HiTrendingUp/> +{percent}%{" "}</span>) : (<span className="red"><HiTrendingDown/>   {percent}%{" "}</span>)}
  </div>

  <div className="widget-circle" style={{background:`conic-gradient(${color} ${(Math.abs(percent)/100)*360}deg,rgb(255,255,255) 0)`}}>
    <span style={{color,}}>{percent}%</span>
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