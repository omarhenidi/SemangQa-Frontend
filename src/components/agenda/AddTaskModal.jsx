import React, { useState } from "react";
import axios from "axios";
import AppURL from "../../api/AppURL";

function AddTaskModal({ showModal, setShowModal, setEvents }) {
  const [task, setTask] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");

  const addTask = async () => {
    try {
      const MyFormData = new FormData();
      MyFormData.append("task", task);
      MyFormData.append("start_time", start_time);
      MyFormData.append("end_time", end_time);
      MyFormData.append("color", color);
      MyFormData.append("image", image);

      const response = await axios.post(AppURL.AddTask, MyFormData);

      if (response.data.status === true) {
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            id: response.data.task.id,
            title: task,
            start: start_time,
            end: end_time,
            color: color,
            image: response.data.task.image, // Use the image URL returned by the backend
          },
        ]);
        window.location.reload(); // Refresh the page

        setShowModal(false);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return showModal ? (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
              <h6 className="text-1xl font-semibold">
                Add Task
              </h6>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <input
                type="text"
                placeholder="Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring focus:border-emerald-500 w-full"
              />
              <input
                type="datetime-local"
                placeholder="Start Time"
                value={start_time}
                onChange={(e) => setStartTime(e.target.value)}
                className="border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring focus:border-emerald-500 w-full"
              />
              <input
                type="datetime-local"
                placeholder="End Time"
                value={end_time}
                onChange={(e) => setEndTime(e.target.value)}
                className="border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring focus:border-emerald-500 w-full"
              />
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring focus:border-emerald-500 w-full"
              />
              <input
                type="file"
                className="border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring focus:border-emerald-500 w-full"
                onChange={handleImageChange}
              />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-white bg-red-500  active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-dark text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={addTask}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;

}

export default AddTaskModal;
