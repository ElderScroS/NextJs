import { Event } from "@/types/Event";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddEvent() {
    const router = useRouter()
    const [eventData, setEventData] = useState<Event>({} as Event)

    const handleChangeTitle = (title: string) => {
        setEventData(prev => (
            { ...prev, title: title }
        ))
    }
    const handleChangeDescription = (description: string) => {
        setEventData(prev => (
            { ...prev, description: description }
        ))
    }

    const handleAddEvent = async () => {
        if (eventData.title && eventData.description) {

            await fetch(`http://localhost:3000/api/events`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({ newEvent: eventData })
            })
            router.back()
        }
        else
        {
            alert("Field's can't be empty")
        }

    }

    return (
        <div>
            <p>Title: </p>
            <input onChange={(e) => handleChangeTitle(e.target.value)} value={eventData.title} />
            <p>Description:</p>
            <input onChange={(e) => handleChangeDescription(e.target.value)} value={eventData.description} />
            <button onClick={handleAddEvent}>Add event</button>
        </div>
    )

}