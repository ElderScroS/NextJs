import { useRouter } from "next/router"
import {Event} from "@/types/Event"

interface Props
{
    event: Event
}

export default function EventDetails({event}: Props)
{
    let router = useRouter()
    if (router.isFallback)
    {
        return <>Loading...</>
    }

    return (
        <div>
            <h2>{event.title} </h2>
            <p>Category: {event.type}</p>
        </div>
    )
}

export function getStaticPaths()
{
    return {
        paths: [
            {
                params: {
                    eventId: '1'
                }
            },
        ],
        fallback: true
    }
}


export async function getStaticProps(context: any)
{
    const {
        params: {eventId}
    } = context
    const response = await fetch(`http://localhost:3000/events/${eventId}`)
   
    let event = await response.json()

    return {
        props:
        {
            event: event
        }
    }
}