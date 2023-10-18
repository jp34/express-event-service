import { v4 } from "uuid";
import mongoose, { Schema } from "mongoose";

export enum EventStatus {
    PLANNED = "PLANNED",
    ACTIVE = "ACTIVE",
    DONE = "DONE",
    CANCELLED = "CANCELLED"
}

export interface Event {
    _id: string
    status: EventStatus
    title: string
    authorId: string
    memberIds: string[]
    locationId: string
    isPublic: boolean
    dateStart: Date
    dateEnd: Date
    dateCreated: Date
    dateModified: Date
}

export const EventSchema = new Schema<Event>({
    _id: { type: String, default: v4 },
    status: { type: String, default: EventStatus.PLANNED },
    title: { type: String, default: null },
    authorId: { type: String, required: true },
    memberIds: [{ type: String }],
    locationId: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    dateCreated: { type: Date, default: Date.now() },
    dateModified: { type: Date, default: Date.now() }
});

export const EventModel = mongoose.model<Event>("Event", EventSchema);
