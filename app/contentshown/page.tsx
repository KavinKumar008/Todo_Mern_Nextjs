import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";
import axios from "axios";
import { StoreInputType } from "../page";

type ContentPageProps = {
  storeInput: StoreInputType[];
  setStoreInput: React.Dispatch<React.SetStateAction<StoreInputType[]>>;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  setEditIndex?: React.Dispatch<React.SetStateAction<number | null>>;
};
const ContentPage = ({
  storeInput,
  setStoreInput,
  setUserInput,
  setEditIndex,
}: ContentPageProps) => {
  console.log(storeInput, "skdjsd");

  // const handleDeleteInput = (id: string) => {
  //   const updatedDelete = storeInput.filter((_, ind) => ind !== id);
  //   console.log(updatedDelete, "updatedDelete");
  //   setStoreInput(updatedDelete);
  // };

  const deleteApi = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`
      );
      if (response.status === 200) {
        console.log(response, "kdskdsjdkk");
        setStoreInput((prevInputs) =>
          prevInputs.filter((item) => item._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditApi = (index: number) => {
    const itemToEdit = storeInput[index];
    setUserInput(itemToEdit.userInput);

    setEditIndex && setEditIndex(index);
  };

  return (
    <>
      {storeInput?.map((item, index) => (
        <section className="flex items-end gap-5" key={item._id}>
          <div className="lg:w-96 w-64 mt-15 flex justify-between border-b-2 border-b-gray-200">
            <h2 className="font-semibold text-lg ml-2">{item.userInput}</h2>
            <div className="flex items-center space-x-6">
              <FiEdit2
                className="cursor-pointer text-xl"
                onClick={() => handleEditApi(index)}
              />
              <HiXMark
                className="cursor-pointer text-xl"
                onClick={() => deleteApi(item._id)}
              />
            </div>
          </div>
          <div>
            <p className="text-[12px] font-bold">{item.time}</p>
          </div>
        </section>
      ))}
    </>
  );
};

export default ContentPage;
