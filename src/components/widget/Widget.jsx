import Card from "components/card";

const Widget = ({ title, subtitle }) => {
  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px]">
      <div className="h-50 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-600">{subtitle}</p>
        <h6 className="text-sm font-bold text-navy-700 ">
          {title}
        </h6>
      </div>
    </Card>
  );
};

export default Widget;
