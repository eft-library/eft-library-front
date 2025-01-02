interface Efficiency {
  value: number;
}
export default function Efficiency({ value }: Efficiency) {
  const checkColor = (val: number) => {
    switch (val) {
      case 6:
        return "bg-VividGreen";
      case 5:
        return "bg-ForestGreen";
      case 4:
        return "bg-AmberGold";
      case 3:
        return "bg-WalnutBrown";
      case 2:
        return "bg-ChestnutBrown";
      case 1:
        return "bg-DeepBurgundy";
      case 0:
        return "bg-DarkMahogany";
    }
  };

  return (
    <div
      className={`${checkColor(
        value
      )} flex items-center justify-center rounded w-10 h-10 border-white border-solid border-[1px] ml-2`}
    >
      <span className="font-bold text-lg text-white">{value}</span>
    </div>
  );
}
