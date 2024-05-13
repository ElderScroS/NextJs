import { useState } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/app/types/Event";

export default function AddEvent() {
    const router = useRouter()
    const [eventData, setEventData] = useState<Event>({ id: 0, title: "", description: "", type: "" });

    const handleChangeTitle = (title: string) => {
        setEventData(prev => ({ ...prev, title: title }))
    }

    const handleChangeDescription = (description: string) => {
        setEventData(prev => ({ ...prev, description: description }))
    }

    const handleAddEvent = async () => {
        if (eventData.title && eventData.description && eventData.type) {
            const response = await fetch(`/events/api`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(eventData)
            });
            if (response.ok) {
                router.back();
            } else {
                console.error('Failed to add event');
            }
        } else {
            alert("Fields can't be empty");
        }
    }

    return (
        <div>
            <p>Title: </p>
            <input type="text" value={eventData.title} onChange={(e) => handleChangeTitle(e.target.value)} />
            <p>Description:</p>
            <textarea value={eventData.description} onChange={(e) => handleChangeDescription(e.target.value)} />
            <p>Type:</p>
            <input type="text" value={eventData.type} onChange={(e) => setEventData(prev => ({ ...prev, type: e.target.value }))} />
            <button onClick={handleAddEvent}>Add event</button>
        </div>
    )
}
