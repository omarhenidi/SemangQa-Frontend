import React from "react";
import {
  MdOutlineCalendarToday,

  MdOutlineSearch

} from "react-icons/md";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "../../variables/charts";
import LineChart from "../charts/LineChart";
import Card from "../card";
import Widget from "components/widget/Widget";

const TotalSpent = () => {
  return (
    <Card extra="!p-[20px]" >
      <div>
        <p style={{ fontSize: "18px", display: "inline" }}> Stats, monthly updates 📈</p>
        <MdOutlineSearch style={{ fontSize: "24px", display: "inline", float: "right" }} />
      </div>
      <hr />
      <div>
        <p style={{ fontSize: "24px" }}>Weekly Progress</p>
      </div>
      <div className="analysis mt-5 grid grid-cols-2 gap-5 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-3"
      >
        <Widget

          subtitle={"16"}
          title={"Team Members"}
        />
        <Widget

          subtitle={"24"}
          title={"Attachments"}
        />
        <Widget

          subtitle={"32"}
          title={"Access Credits"}
        />
        <Widget

          subtitle={"40"}
          title={"Likes"}
        />
      </div>

      <div className="h-full w-full px-3 " style={{ backgroundColor: "#FEFDE3" }}>
        <div className="flex justify-between">
          <button className="rounded m-2 float-left	border-none" style={{ backgroundColor: "#FEFDE3", }}>
            <span className="text-sm font-medium text-dark " style={{ backgroundColor: "#FEFDE3", }}>Home</span>
          </button>
          <button className="rounded px-3 py-1 m-2 bg-dark text-white float-right	border-none	" >
            <MdOutlineCalendarToday className="inline" />
            <span className="text-sm font-medium text-white bg-dark inline" >This month</span>
          </button>

        </div>
        <div style={{ height: "310px"}}
        >
          <LineChart
            options={lineChartOptionsTotalSpent}
            series={lineChartDataTotalSpent}
          />
        </div>

      </div>
    </Card>
  );
};

export default TotalSpent;
