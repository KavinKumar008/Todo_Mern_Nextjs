"use client";
import ContentPage from "./contentshown/page";
import { useEffect, useState } from "react";
import axios from "axios";

export type StoreInputType = {
  _id: string;
  userInput: string;
  time: string;
};

export default function Home() {
  const [userInput, setUserInput] = useState<string>("");
  const [storeInput, setStoreInput] = useState<StoreInputType[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const time = new Date().toLocaleTimeString();

  console.log(userInput, "skdjsdk");

  const handleStoreInput = () => {
    if (userInput.trim() === "") return;
    // setStoreInput((prevInputs) => [...prevInputs, userInput]);
    userPostApi();
    setUserInput("");
  };

  const userPostApi = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts`,
        {
          userInput: userInput,
          time: time,
        }
      );
      if (response.status === 200) {
        setStoreInput((prevInputs) => [
          ...prevInputs,
          {
            _id: response.data.data._id,
            userInput: userInput,
            time: time,
          },
        ]);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInputApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts`
      );
      if (response.status === 200) {
        setStoreInput(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error, "Unable to get the data from server");
    }
  };

  useEffect(() => {
    getInputApi();
  }, []);

  console.log([...storeInput]);

  const handleUpdate = async () => {
    if (editIndex !== null) {
      const itemToUpdate = storeInput[editIndex];

      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${itemToUpdate._id}`,
          {
            userInput: userInput,
            time: new Date().toLocaleTimeString(),
          }
        );

        if (response.status === 200) {
          // Update local state after successful API update
          const updated = [...storeInput];
          updated[editIndex] = {
            ...itemToUpdate,
            userInput: userInput,
            time: new Date().toLocaleTimeString(),
          };
          setStoreInput(updated);
          setUserInput("");
          setEditIndex(null);
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
  };

  return (
    <main>
      <div className="">
        <h1 className="text-center mt-20 text-3xl font-bold tracking-widest">
          Todo Lists
        </h1>
      </div>
      <section className="flex flex-col items-center">
        <div className="flex justify-center lg:mt-20 mt-16 gap-5 lg:gap-10">
          <input
            type="text"
            placeholder="Enter something..."
            className="lg:w-96 w-64 focus:outline-none p-2 border-2 border-blue-500 rounded-xl"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            type="button"
            className="w-20 cursor-pointer border-2 border-gray-400 rounded-md hover:bg-conic-240 font-semibold"
            onClick={editIndex !== null ? handleUpdate : handleStoreInput}
          >
            {editIndex !== null ? "Update" : "Enter"}
          </button>
        </div>
        <div>
          <ContentPage
            storeInput={storeInput}
            setStoreInput={setStoreInput}
            setUserInput={setUserInput}
            setEditIndex={setEditIndex}
          />
        </div>
      </section>
    </main>
  );
}
