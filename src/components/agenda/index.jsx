import React, { useState, useEffect } from "react";
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import axios from "axios";
import AppURL from "../../api/AppURL";
import "./style.css";
import {
    MdNavigateBefore,
    MdNavigateNext,
    MdOutlineMoreVert,
    MdOutlineNotificationsNone

} from "react-icons/md";
import Dropdown from "components/dropdown";


function Agenda() {
    const [myEvents, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = React.useState(false);
    const [showUpdateTask, setShowUpdateTask] = React.useState(false);
    const [task, setTask] = useState("");
    const [selectedTask, setSelectedTask] = useState(null);

    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");
    const [image, setImage] = useState("");
    const [color, setColor] = useState("");

    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const openUpdateModal = (id) => {
        setSelectedTaskId(id);
        setShowUpdateTask(true);
    };
    const [updatedTaskData, setUpdatedTaskData] = useState({ task: "", start_time: "", end_time: "", color: "", image: null });





    // 
    const getTasks = async () => {
        try {
            const response = await axios.get(AppURL.GetTask);
            setEvents(response.data.tasks.map(task => ({
                id: task.id,
                title: task.task,
                start: task.start_time,
                end: task.end_time,
                color: task.color,
                image: task.image,
            })));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const addTask = () => {

        let MyFormData = new FormData();
        MyFormData.append("task", task);
        MyFormData.append("start_time", start_time);
        MyFormData.append("end_time", end_time);
        MyFormData.append("color", color);
        MyFormData.append("image", image);

        axios.post(AppURL.AddTask, MyFormData)
            .then((response) => {
                console.log(response);
                if (response.data.status === true) {
                    setEvents([...myEvents, {
                        id: response.data.task.id,
                        title: task,
                        start: start_time,
                        end: end_time,
                        color: color,
                        image: response.data.task.image, // Use the image URL returned by the backend
                    }]);
                    setShowModal(false);
                    setTask("");
                    setStartTime("");
                    setEndTime("");
                    setImage("");
                    window.location.reload(); // Refresh the page

                } else {
                }
            })
            .catch((error) => {
                window.location.reload(); // Refresh the page
            });
    };


    // Update task

    const closeUpdateModal = () => {
        setShowUpdateTask(false);
        setSelectedTask(null);
        setUpdatedTaskData({
            task: "",
            start_time: "",
            end_time: "",
            image: null,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const updateTask = (id, updatedData) => {
        console.log('Updating Task Data:', updatedData);

        const formData = new FormData();
        formData.append('task', updatedData.task);
        formData.append('start_time', updatedData.start_time);
        formData.append('end_time', updatedData.end_time);
        formData.append('color', updatedData.color);
        formData.append('image', updatedData.image);

        axios.post(AppURL.UpdateTask(id), formData)
            .then((response) => {
                if (response.data.status === true) {
                    const updatedEvents = myEvents.map(event => {
                        if (event.id === id) {
                            return {
                                ...event,
                                title: updatedData.task,
                                start: updatedData.start_time,
                                end: updatedData.end_time,
                                color: updatedData.color,
                                image: updatedData.image.name, // Use image name only
                            };
                        }
                        return event;
                    });
                    setEvents(updatedEvents);
                    closeUpdateModal();
                    window.location.reload(); // Refresh the page

                }
            })
            .catch((error) => {
                console.error("Error updating task:", error);
            });
    };

    // delete task
    const deleteTask = (id) => {
        axios.delete(AppURL.DeleteTask(id))
            .then((response) => {
                if (response.data.status === true) {
                    const updatedEvents = myEvents.filter(event => event.id !== id);
                    setEvents(updatedEvents);

                }
                window.location.reload(); // Refresh the page

            })
            .catch((error) => {
                window.location.reload(); // Refresh the page

                console.error("Error deleting task:", error);
            });
    };


    useEffect(() => {
        getTasks();
    }, []);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
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



    // Extract unique hours from myEvents
    const uniqueHours = [...new Set(myEvents.map(event => new Date(event.start).getHours()))];

    // Filter events for the selected date
    const eventsForSelectedDate = myEvents.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate.toDateString() === selectedDate.toDateString();
    });





    return (
        <>
            {showModal ? (
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
            ) : null}


            <div className="mt-3" >
                <div className="custom-calendar">
                    <div className="calendar-header inline" >
                        <button onClick={() => handleDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1))}><MdNavigateBefore className="h-5 w-7" /></button>
                        <button onClick={() => handleDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1))}><MdNavigateNext className="h-5 w-7" /></button>
                        <h4 className="inline" > {selectedDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</h4>
                    </div>
                    <div style={{ float: "right" }} >
                        <MdOutlineNotificationsNone className="h-6 w-6 inline" />
                        <MdOutlineMoreVert className="h-6 w-6 inline" />

                    </div>
                </div>

                <hr />
                <button
                    className="float-right z-40 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-4 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(true)}
                    style={{ backgroundColor: "black" }}
                >
                    New Task
                </button>
                {eventsForSelectedDate.length > 0 && (
                    <div className="hourly-events-container">
                        {uniqueHours.map((hour) => {
                            const eventsInHour = eventsForSelectedDate.filter(
                                (event) =>
                                    new Date(event.start).getHours() === hour
                            );

                            if (eventsInHour.length > 0) {
                                return (
                                    <div key={hour} className="z-40 hour-events">
                                        <div className="flex items-center mt-3">
                                            <h6 className="mr-2">{hour}.00</h6>
                                            <div className="flex-1 border-t border-dashed border-gray-700 "></div>
                                        </div>
                                        <div className="events-in-hour">
                                            {eventsInHour.map((event) => (
                                                <div className="event-item" key={event.id} >
                                                    <div className="md-full-event m-3" style={{ backgroundColor: event.color }}>
                                                        <img className="md-full-event-img" src={event.image} alt="Event" />
                                                        <div className="float-right">
                                                            <Dropdown
                                                                button={
                                                                    <MdOutlineMoreVert className="h-6 w-6 mr-3 mt-3" />
                                                                }
                                                                children={
                                                                    <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500">
                                                                        <div className="p-4">
                                                                            <div className="flex items-center gap-2 text-gray-800">
                                                                                {event.title}
                                                                            </div>
                                                                        </div>
                                                                        <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />
                                                                        <div className="flex flex-col p-4 inline">

                                                                            <button
                                                                                type="button"
                                                                                onClick={() => openUpdateModal(event.id)}
                                                                                className="inline rounded bg-info mb-2 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600"
                                                                            >
                                                                                Update Task
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => deleteTask(event.id)}
                                                                                class="inline rounded bg-danger ">
                                                                                Delete
                                                                            </button>
                                                                        </div>

                                                                    </div>
                                                                }
                                                                classNames={"py-2 top-8 -left-[180px] w-max"}
                                                            />

                                                        </div>

                                                        <div className="md-full-event-details">
                                                            <div className="md-full-event-title">{event.title}</div>
                                                            <div className="md-full-event-time flex">
                                                                {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '} - {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    {showUpdateTask ? (
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
                                                                                Edit Task
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
                                                                        {/*footer*/}
                                                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                                            <button
                                                                                className="text-white bg-red-500  active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                type="button"
                                                                                onClick={() => setShowUpdateTask(false)}
                                                                            >
                                                                                Close
                                                                            </button>
                                                                            <button
                                                                                className="bg-dark text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                type="button"
                                                                                onClick={() => updateTask(selectedTaskId, updatedTaskData)}
                                                                            >
                                                                                Save Changes
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                        </>
                                                    ) : null}
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                );
                            } else {
                                return null; // Don't render if no events for this hour on the selected day
                            }
                        })}
                    </div>
                )}

                {eventsForSelectedDate.length === 0 && (
                    <div className="no-events">
                        No events for the selected day.
                    </div>
                )}
            </div>
        </>
    );
}

export default Agenda;
