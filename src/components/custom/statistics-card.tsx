import { StatType } from "../../pages/web";


const StatCard = ({ icon, number, title }: StatType) => {
  return (
    <div className="w-[30%] hover:scale-110 transition cursor-pointer p-12 border rounded-lg shadow-md flex flex-col items-center">
      <div className="text-6xl mb-2 text-green-400">{icon}</div>
      <h4 className="text-6xl font-semibold mb-4">{number}</h4>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
  );
};
export default StatCard;