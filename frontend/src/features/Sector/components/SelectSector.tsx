import { MasterSector } from "../models/MasterSectorModel";

interface SelectSectorProps {
  data: Array<MasterSector>;
  handleOnChangeSector: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectSector({
  data,
  handleOnChangeSector,
}: SelectSectorProps) {
  const optionList: any = [];
  const getAllChild = (id: number) => {
    let result: Array<MasterSector> = [] as Array<MasterSector>;
    data.forEach((item) => {
      if (item.parent === id) {
        optionList.push(
          <option key={item.id} value={item.id}>
            {"  ".repeat(item.level * 2).replace(/\s/g, "\u00A0")}
            {item.name}
          </option>
        );
        getAllChild(item.id);
      }
    });
    return result;
  };
  if (data.length > 0) {
    data.sort((a, b) => a.id - b.id);
    optionList.push(
      <option key={data[0].id} value={data[0].id}>
        {data[0].name}
      </option>
    );
    getAllChild(0);
  }

  return (
    <select
      multiple={true}
      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      onChange={handleOnChangeSector}
    >
      {optionList}
    </select>
  );
}
