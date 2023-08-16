import React from "react";
import {
  MdOutlineCalendarToday,

  MdOutlineSearch,
  MdExpandMore
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
        <p className="text-md font-medium font-bold text-dark inline"> Stats, monthly updates 📈</p>
        <MdOutlineSearch className="text-xl font-large font-bold text-dark inline" style={{ fontSize: "24px", display: "inline", float: "right" }} />
      </div>
      <hr />
      <div>
        <p className="text-xl font-large font-bold text-dark">Weekly Progress</p>
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
            <span className="text-sm font-medium text-dark inline" style={{ backgroundColor: "#FEFDE3", }}>Home</span>
            <MdExpandMore className="inline float-right mt-1" />

          </button>
          <button className="rounded px-3 py-1 m-2 bg-dark text-white float-right	border-none	" >
            <MdOutlineCalendarToday className="inline float-right mt-1 ml-1" />
            <span className="text-sm font-medium text-white bg-dark inline" >This month</span>
          </button>

        </div>
        <div style={{ height: "310px" }}
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
