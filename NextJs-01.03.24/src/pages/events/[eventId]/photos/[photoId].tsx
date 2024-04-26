import { Photo } from "@/types/Photo"
import photos from "../../../../../lib/photos"
import events from "../../../../../lib/events"
import Image from "next/image"

interface Props
{
    photo: Photo
}


export default function EventPhoto({photo} : Props) 
{
    return (
        <div>
            <Image src={photo.url} alt={photo.alt}/>
        </div>
    )
}


export function getServerSideProps(context: any)
{
    let { params } = context
    let eventId = String(params.eventId)

    let existingEvent = events.find((event) => event.id === eventId)

    if (!existingEvent) {
        return {
            notFound: true,
        }
    }

    let eventPhotos = photos.filter((photo) => photo.eventId === eventId)

    if (eventPhotos.length === 0) {
        return {
            notFound: true,
        }
    }

    let photo = eventPhotos[Number(params.photoId) - 1]
    if (!photo) {
        return {
            notFound: true,
        }
    }

    return {
        props:
        {
            photo: photo
        }
    }
}