"use client";

import React, { useState, DragEvent, ChangeEvent } from "react";
import Button from "@/components/Button";
import HamburgerIcon from "@/components/hamburger-icon";

const newData = [
  {
    wait: "#user",
  },
  {
    fill: {
      selector: "#username",
      text: "user@gmail.com",
      delay: "2000",
    },
  },
  {
    fill: {
      selector: "#username",
      text: "user@gmail.com",
      delay: "20099",
    },
  },
  {
    delay: "1000",
  },
  {
    click: "@username",
  },
];

type WaitType = {
  wait: string;
};

type FillType = {
  fill: {
    selector: string;
    text: string;
    delay: string;
  };
};

type DelayType = {
  delay: string;
};

type ClickType = {
  click: string;
};

type AllType = WaitType | FillType | DelayType | ClickType;

type AllDataType = AllType[];

type InputType = {
  value: string;
  idx: number;
  nextKey: string | any;
  subKey?: string;
};

const Task = () => {
  const [dataSet, setDataSet] = useState<AllDataType>(newData);
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(newData, null, 2)
  );

  const [swap, setSwap] = useState<string | {}>("" || {});
  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleSelectChange = (idx: number, prev: string, cur: string) => {
    const updateData = dataSet.map(
      (item: AllType, index: number, instanceData: any) => {
        console.log("Instance", instanceData);

        if (index !== idx) return item;

        console.log("cur", cur + idx);
        console.log("prev", prev + idx);
        console.log("wait-cur-outside", instanceData[idx][cur]);

        switch (cur) {
          case "wait": {
            console.log("wait-cur", instanceData[idx][cur]);
            console.log("wait-prev", instanceData[idx - 1][prev]);

            return { wait: "" };
          }

          case "delay": {
            console.log("delay-cur", instanceData[idx][cur]);
            console.log("delay-prev", instanceData[idx - 1][prev]);
            return { delay: "" };
          }
          case "click": {
            // console.log("click", data[idx]);
            console.log("click", instanceData[idx][cur]);

            return { click: (item as ClickType).click ?? "" };
          }
          case "fill": {
            // console.log("fill", item);
            console.log("fill", instanceData[idx][prev]);
            return {
              fill: {
                selector: (item as FillType).fill?.selector ?? "",
                text: (item as FillType).fill?.text ?? "",
                delay: (item as FillType).fill?.delay ?? "",
              },
            };
          }
        }
      }
    );

    console.log("updateData", updateData);

    setDataSet(updateData);
    setJsonInput(JSON.stringify(updateData, null, 2));
  };

  const handleInput = ({ value, idx, nextKey, subKey }: InputType) => {
    const updateData = dataSet.map((item: AllType, index: number) => {
      if (index === idx) {
        if (subKey) {
          return {
            ...item,
            [nextKey]: { ...(item as any)[nextKey], [subKey]: value },
          };
        }
        return { ...item, [nextKey]: value };
      }
      return item;
    });

    console.log("input", updateData);

    setDataSet(updateData);
    setJsonInput(JSON.stringify(updateData, null, 2));
  };

  const handleClone = (idx: number) => {
    const cloneData = { ...dataSet[idx] };

    const updatedData = [...dataSet, cloneData];
    setDataSet(updatedData);
    setJsonInput(JSON.stringify(updatedData, null, 2));
  };

  const handleDelete = (idx: number) => {
    const remainData = dataSet.filter(
      (_item: any, indx: number) => indx !== idx
    );

    setDataSet(remainData);
    setJsonInput(JSON.stringify(remainData, null, 2));
  };

  const handleAllDelete = () => {
    setDataSet([]);
    setJsonInput(JSON.stringify([], null, 2));
  };

  const handleJsonInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    try {
      const parsedData = JSON.parse(e.target.value);
      setDataSet(parsedData);
      setJsonError(null);
    } catch (error) {
      setJsonError("Invalid JSON format.");
    }
  };

  return (
    <main className="flex gap-4 w-[90%] mx-auto">
      <section className="w-[60%] p-4">
        <h1 className="text-2xl font-bold py-6">Browser ToDo List</h1>
        <div className="flex justify-end gap-3 items-center pb-6">
          <Button onClick={handleAllDelete}>Clean</Button>
          <Button onClick={() => handleClone(0)}>+</Button>
        </div>

        {dataSet.map((item: AllType, idx: number) => (
          <div
            key={idx}
            className="rounded-md border border-gray-300 p-2 flex gap-3 items-center justify-between my-4">
            <div className="flex items-center gap-3">
              <div className="text-gray-500 cursor-move">
                <HamburgerIcon />
              </div>

              <select
                className="appearance-auto bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline text-gray-500 cursor-pointer"
                value={Object.keys(item)[0]}
                onChange={(e) => {
                  handleSelectChange(idx, Object.keys(item)[0], e.target.value);
                }}>
                <option value="wait">Wait</option>
                <option value="delay">Delay</option>
                <option value="click">Click</option>
                <option value="fill">Fill</option>
              </select>
            </div>
            <div className="w-[100%] flex gap-3 items-center">
              {"wait" in item && (
                <input
                  value={(item as WaitType).wait}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInput({ value: e.target.value, idx, nextKey: "wait" })
                  }
                  placeholder="wait..."
                  type="text"
                  className="w-full bg-white border text-gray-500 border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
              {"click" in item && (
                <input
                  value={(item as ClickType).click}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInput({
                      value: e.target.value,
                      idx,
                      nextKey: "click",
                    })
                  }
                  placeholder="click..."
                  type="text"
                  className="w-full bg-white border text-gray-500 border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
              {"delay" in item && (
                <input
                  value={(item as DelayType).delay}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInput({
                      value: e.target.value,
                      idx,
                      nextKey: "delay",
                    })
                  }
                  placeholder="delay..."
                  type="text"
                  className="w-[100px] bg-white border text-gray-500 border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
              {"fill" in item && (
                <>
                  <input
                    value={(item as FillType).fill.selector}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInput({
                        value: e.target.value,
                        idx,
                        nextKey: "fill",
                        subKey: "selector",
                      })
                    }
                    placeholder="selector..."
                    type="text"
                    className="w-full bg-white border text-gray-500 border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <input
                    value={(item as FillType).fill.text}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInput({
                        value: e.target.value,
                        idx,
                        nextKey: "fill",
                        subKey: "text",
                      })
                    }
                    placeholder="text..."
                    type="text"
                    className="w-[150px] bg-white border text-gray-500 border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <input
                    value={(item as FillType).fill.delay}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInput({
                        value: e.target.value,
                        idx,
                        nextKey: "fill",
                        subKey: "delay",
                      })
                    }
                    placeholder="delay..."
                    type="text"
                    className="w-[150px] bg-white border text-gray-500 border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                  />
                </>
              )}
            </div>
            <div className="flex gap-3 items-center">
              <Button onClick={() => handleClone(idx)}>Clone</Button>
              <Button onClick={() => handleDelete(idx)}>X</Button>
            </div>
          </div>
        ))}
      </section>
      <section className="w-[40%] p-4">
        <h1 className="text-2xl font-bold py-6">Json ToDo List</h1>
        <div className="w-full h-[300px] rounded-md bg-slate-500">
          <textarea
            className="w-full h-full p-4 rounded-md shadow-sm bg-slate-200"
            value={jsonInput}
            onChange={handleJsonInputChange}></textarea>
          {jsonError && <p className="text-red-500 mt-2">{jsonError}</p>}
        </div>
      </section>
    </main>
  );
};

export default Task;
