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
import AddTaskModal from "./AddTaskModal";
import UpdateTaskModal, { updateTask } from './UpdateTaskModal'; // Import the updateTask function


function Agenda() {
    const [myEvents, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showUpdateTask, setShowUpdateTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [updatedTaskData, setUpdatedTaskData] = useState({ task: "", start_time: "", end_time: "", color: "", image: null });


    // Get Tasks
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

    useEffect(() => {
        getTasks();
    }, []);


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


    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
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
                <AddTaskModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setEvents={setEvents}
                />
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
                                                        <img className="md-full-event-img sm-font mt-1" src={event.image} alt="Event" />
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
                                                                        <div className="h-px w-full bg-gray-200" />
                                                                        <div className="flex flex-col p-4 inline">

                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    setSelectedTaskId(event.id);
                                                                                    setShowUpdateTask(true);
                                                                                }} className="inline rounded bg-info mb-2 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600"
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
                                                    <UpdateTaskModal
                                                        isOpen={showUpdateTask}
                                                        onClose={() => setShowUpdateTask(false)}
                                                        onUpdate={(updatedData) => {
                                                            updateTask(selectedTaskId, updatedData);
                                                            setShowUpdateTask(false);
                                                        }}
                                                        taskId={selectedTaskId} // Pass the selectedTaskId as a prop
                                                    />
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
            </div >
        </>
    );
}

export default Agenda;
