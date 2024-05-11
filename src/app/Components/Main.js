import Left from "./Left";
import Right from "./Right";
const Main = () => {
  return (
    <div className="grid grid-cols-3 gap-4 main min-h-screen">
      <div className="col-span-1 bg-gray-200 p-4">
        <Left />
      </div>
      <div className="col-span-2 p-4">
        <Right />
      </div>
    </div>
  );
};

export default Main;
