import React from "react";
import {
  API_URL_GET_MASTER_SECTOR,
  API_URL_INSERT_SECTOR,
  API_URL_UPDATE_SECTOR,
} from "../../../utils/Constant";
import { MasterSector } from "../models/MasterSectorModel";
import { SelectSector } from "../components/SelectSector";

export default function SectorPage() {
  const [selectedSectors, setSelectedSectors] = React.useState<Array<Number>>(
    [] as Array<Number>
  );
  const [idSector, setIdSector] = React.useState<string>("");
  const [masterSector, setMasterSector] = React.useState<Array<MasterSector>>(
    [] as Array<MasterSector>
  );
  const [agreeToTerms, setAgreeToTerms] = React.useState<boolean>(false);
  const nameRef = React.useRef<HTMLInputElement>(null);

  const handleOnChangeSector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    let values: Array<Number> = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(parseInt(options[i].value));
      }
    }
    setSelectedSectors(values);
  };
  const handleAgreeToTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
  };

  React.useEffect(() => {
    if (masterSector.length > 0) return;
    (async () => {
      try {
        const response = await fetch(API_URL_GET_MASTER_SECTOR);
        const data = await response.json();
        if (data.success) {
          setMasterSector(data.data);
        }
      } catch (e) {}
    })();
  }, []);

  const handleSave = () => {
    if (!nameRef.current?.value) {
      alert("Please input name");
      return;
    }
    if (selectedSectors.length === 0) {
      alert("Please select sector");
      return;
    }
    if (!agreeToTerms) {
      alert("Please agree to terms");
      return;
    }
    if (idSector === "") {
      handleCreateSector();
    } else {
      handleUpdateSector();
    }
  };
  const handleCreateSector = async () => {
    try {
      const response = await fetch(API_URL_INSERT_SECTOR, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameRef.current?.value,
          sectors: selectedSectors,
          agreeToTerms: agreeToTerms,
        }),
      });
      const data = await response.json();
      alert(data.message);
      if (data.success) setIdSector(data.id);
    } catch (e) {}
  };

  const handleUpdateSector = async () => {
    try {
      const response = await fetch(
        API_URL_UPDATE_SECTOR.replace("{0}", idSector),
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: idSector,
            name: nameRef.current?.value,
            sectors: selectedSectors,
            agreeToTerms: agreeToTerms,
          }),
        }
      );
      const data = await response.json();
      alert(data.message);
      if (data.success) setIdSector(data.id);
    } catch (e) {}
  };

  return (
    <div className="flex justify-center">
      <form>
        <div className="md:flex md:items-center mb-6">
          Please enter your name and pick the Sectors you are currently involved
          in.
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              ref={nameRef}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Sectors
            </label>
          </div>
          <div className="md:w-2/3">
            <SelectSector
              handleOnChangeSector={handleOnChangeSector}
              data={masterSector}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
          <label className="md:w-2/3 block text-gray-500 font-bold">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              checked={agreeToTerms || false}
              onChange={handleAgreeToTermsChange}
            />
            <span className="text-sm">Agree to terms</span>
          </label>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
