import PropTypes from 'prop-types';
import axios from "axios";
import AppURL from "../../api/AppURL";
import React, { useState, useEffect } from 'react';


const UpdateTaskModal = ({ isOpen, onClose, onUpdate, taskId }) => {


    const [showUpdateTask, setShowUpdateTask] = useState(false);
    const [updatedTaskData, setUpdatedTaskData] = useState({ task: "", start_time: "", end_time: "", color: "", image: null });
    const [specificTask, setSpecificTask] = useState(null); // State to hold the specific task data

    const closeUpdateModal = () => {
        setShowUpdateTask(false);
        setUpdatedTaskData({
            task: "",
            start_time: "",
            end_time: "",
            image: null,
        });
    };

    const handleImageChangeUpdate = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            setUpdatedTaskData((prevData) => ({
                ...prevData,
                image: selectedImage,
            }));
        }
    };

    const fetchSpecificTask = async (taskId) => {
        try {
          const response = await axios.get(AppURL.GetSpecificTask(taskId)); // Use your method to construct the URL
          setSpecificTask(response.data); // Set the specific task data
          console.log(response);
        } catch (error) {
          console.error('Error fetching specific task:', error);
        }
      };

      useEffect(() => {
        // Fetch specific task data when component mounts
        fetchSpecificTask(taskId);
      }, [taskId]);


  

    const handleUpdateClick = () => {
        onUpdate(updatedTaskData); // Call the onUpdate prop to trigger the updateTask function
        setShowUpdateTask(false);
    };


    return (
        isOpen && (
            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-sm">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                                <h6 className="text-1xl font-semibold">
                                    Edit Task
                                </h6>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={handleUpdateClick}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>

                            <div className="relative p-6 flex-auto">
                                <input
                                    type="text"
                                    placeholder="Task"
                                    value={updatedTaskData.task}

                                    onChange={(e) =>
                                        setUpdatedTaskData((prevData) => ({
                                            ...prevData,
                                            task: e.target.value,
                                        }))
                                    }
                                    className="border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring focus:border-emerald-500 w-full"
                                />
                                <input
                                    type="datetime-local"
                                    placeholder="Start Time"
                                    value={updatedTaskData.start_time}
                                    onChange={(e) =>
                                        setUpdatedTaskData((prevData) => ({
                                            ...prevData,
                                            start_time: e.target.value,
                                        }))
                                    }
                                    className="border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring focus:border-emerald-500 w-full"
                                />
                                <input
                                    type="datetime-local"
                                    placeholder="End Time"
                                    value={updatedTaskData.end_time}
                                    onChange={(e) =>
                                        setUpdatedTaskData((prevData) => ({
                                            ...prevData,
                                            end_time: e.target.value,
                                        }))
                                    }
                                    className="border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring focus:border-emerald-500 w-full"
                                />
                                <input
                                    type="color"
                                    value={updatedTaskData.color}
                                    onChange={(e) =>
                                        setUpdatedTaskData((prevData) => ({
                                            ...prevData,
                                            color: e.target.value,
                                        }))
                                    }
                                    className="border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring focus:border-emerald-500 w-full"
                                />
                                <input
                                    type="file"
                                    className="border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring focus:border-emerald-500 w-full"
                                    onChange={handleImageChangeUpdate}
                                />
                            </div>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-white bg-red-500  active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleUpdateClick}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-dark text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleUpdateClick}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        )
    );
};

UpdateTaskModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default UpdateTaskModal;
