import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { Event as EventType } from "@/app/types/Event"

interface Props {
    params: {
        eventId: string
    }
}

export default function Event({ params }: Props) {
    const router = useRouter()
    const { eventId } = params
    const [eventData, setEventData] = useState<EventType>({ id: 0, title: "", description: "", type: "" })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/events/${eventId}/api`)
                const event = await response.json()
                setEventData(event)
            } catch (error) {
                console.error('Failed to fetch event data:', error)
            }
        }
        fetchData()
    }, [eventId])

    const handleChangeTitle = (title: string) => {
        setEventData(prev => ({ ...prev, title: title }))
    }

    const handleChangeDescription = (description: string) => {
        setEventData(prev => ({ ...prev, description: description }))
    }

    const updateEvent = async () => {
        try {
            if (eventData.title && eventData.description) {
                const response = await fetch(`/events/${eventId}/api`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    body: JSON.stringify(eventData)
                })
                const event = await response.json()
                setEventData(event)
            } else {
                alert("Fields can't be empty")
            }
        } catch (error) {
            console.error('Failed to update event:', error)
        }
    }

    const deleteEvent = async () => {
        try {
            await fetch(`/events/${eventId}/api`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": 'application/json',
                }
            })
            handleGoBack()
        } catch (error) {
            console.error('Failed to delete event:', error)
        }
    }

    const handleGoBack = () => {
        router.back()
    }

    return (
        <div>
            <button onClick={handleGoBack}>Go Back</button>
            <p>Title: </p>
            <input type="text" onChange={(e) => handleChangeTitle(e.target.value)} value={eventData.title} />
            <p>Description:</p>
            <textarea onChange={(e) => handleChangeDescription(e.target.value)} value={eventData.description} />
            <button onClick={updateEvent}>Update event</button>
            <button onClick={deleteEvent}>Delete event</button>
        </div>
    )
}
