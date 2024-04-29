import { useRouter } from "next/router"
import { useState } from "react"

interface Props {
    event: import("@/types/Event").Event // использование type-only import для импорта типа Event
}

export default function Event({ event }: Props) {
    const router = useRouter()
    const [eventData, setEventData] = useState(event)

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

    const updateEvent = async () => {
        if (eventData.title && eventData.description) {

            const response = await fetch(`http://localhost:3000/api/events/${eventData.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({ updatedEvent: eventData })
            })
            const updatedEvent = await response.json()
            setEventData(updatedEvent)
        }
        else {
            alert("Fields can't be empty")
        }
    }

    const deleteEvent = async () => {
        await fetch(`http://localhost:3000/api/events/${eventData.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
            }
        })

        handleGoBack()
    }

    const handleGoBack = () => {
        router.back()
    }
    return (
        <div style={{ padding: 10 }}>
            <button onClick={handleGoBack}>Go back</button>
            <p>Id: {eventData.id}</p>
            <p>Title: </p>
            <input onChange={(e) => handleChangeTitle(e.target.value)} value={eventData.title} />
            <p>Description:</p>
            <input onChange={(e) => handleChangeDescription(e.target.value)} value={eventData.description} />
            <button onClick={updateEvent}>Update event</button>
            <button onClick={deleteEvent}>Delete event</button>
        </div>
    )
}


export async function getServerSideProps({ params }: any) {
    const { eventId } = params

    const response = await fetch(`http://localhost:3000/api/events/${eventId}`)
    const event = await response.json()

    return {
        props:
        {
            event: event
        }
    }
}
