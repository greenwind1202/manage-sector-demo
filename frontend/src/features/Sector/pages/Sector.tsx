import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BASE_API_URL } from "../../../utils/Constant";
import { MasterSector } from "../models/MasterSectorModel";
import { Sector } from "../models/SectorModel";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
    sectors: yup.array().min(1, "Choose at least 1"),
    agreeToTerms: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions"),
  })
  .required();

export default function SectorPage() {
  const [idSector, setIdSector] = React.useState<string>("");
  const [masterSector, setMasterSector] = React.useState<Array<MasterSector>>(
    [] as Array<MasterSector>
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const optionList: any = [];

  React.useEffect(() => {
    if (masterSector.length > 0) return;
    (async () => {
      try {
        const url = new URL(BASE_API_URL + "master_sector");
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          setMasterSector(data.data);
        }
      } catch (e) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateSector = async (data: Sector) => {
    try {
      const url = new URL(BASE_API_URL + "sector");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          sectors: data.sectors,
          agree_to_term: data.agreeToTerms,
        }),
      });
      const res = await response.json();
      alert(res.message);
      if (res.success) setIdSector(res.id);
    } catch (e) {}
  };

  const handleUpdateSector = async (data: Sector) => {
    try {
      const url = new URL(BASE_API_URL + "sector/" + idSector);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idSector,
          name: data.name,
          sectors: data.sectors,
          agree_to_term: data.agreeToTerms,
        }),
      });
      const res = await response.json();
      alert(res.message);
      if (res.success) setIdSector(res.id);
    } catch (e) {}
  };
  const onSubmit = (data: any) => {
    if (idSector === "") {
      handleCreateSector(data);
    } else {
      handleUpdateSector(data);
    }
  };

  const getAllChild = (id: number) => {
    let result: Array<MasterSector> = [] as Array<MasterSector>;
    masterSector.forEach((item) => {
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
  if (masterSector.length > 0) {
    masterSector.sort((a, b) => a.id - b.id);
    optionList.push(
      <option key={masterSector[0].id} value={masterSector[0].id}>
        {masterSector[0].name}
      </option>
    );
    getAllChild(0);
  }
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="text-red-700">{errors.name?.message?.toString()}</p>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Sectors
            </label>
          </div>
          <div className="md:w-2/3">
            <select
              multiple={true}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              {...register("sectors")}
            >
              {optionList}
            </select>
            {errors.sectors?.message && (
              <p className="text-red-700 text-normal">
                {errors.sectors?.message?.toString()}
              </p>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
          <label className="md:w-2/3 block text-gray-500">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              // checked={agreeToTerms || false}
              // onChange={handleAgreeToTermsChange}
              {...register("agreeToTerms")}
            />
            <span className="text-sm font-bold">Agree to terms</span>
            {errors.agreeToTerms?.message && (
              <p className="text-red-700 text-normal">
                {errors.agreeToTerms?.message?.toString()}
              </p>
            )}
          </label>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <input
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              value="Save"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
