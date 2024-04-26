import { Photo } from "@/types/Photo"
import photos from "../../../../../lib/photos"
import events from "../../../../../lib/events"
import Image from "next/image"

interface Props {
    photos: Photo[]
}

export default function EventPhotos({ photos }: Props) {
    return (
        <div>
            {photos.map((photo) =>
            (
                <div key={photo.id}>
                    <Image src={photo.url} alt="awda"/>
                </div>
            ))}
        </div>
    )
}


export function getServerSideProps(context: any) {
    let { params } = context

    let existingId = events.find((event) => event.id === String(params.eventId))
   
    if (!existingId) {
        return {
            notFound: true,
        }
    }

    let eventPhotos = photos.filter((photo) => photo.eventId === String(params.eventId))
   
    return {
        props:
        {
            photos: eventPhotos
        }
    }
}