import logger from "../config/logger";
import { CreateEventPayload, EventSearchParams } from "../domain/dto"
import { Event, EventModel, EventStatus } from "../domain/entity"
import { NonExistentResourceError } from "../domain/error";

export const createEvent = async (payload: CreateEventPayload): Promise<Event> => {
    const event = await EventModel.create({
        title: payload.title,
        authorId: payload.authorId,
        memberIds: payload.memberIds,
        locationId: payload.locationId,
        isPublic: payload.isPublic,
        dateStart: payload.dateStart,
        dateEnd: payload.dateEnd
    });
    event.__v = undefined;
    logger.info({
        operation: "createEvent",
        payload,
        resource: `event:${event._id}`
    });
    return event;
}

export const findEvents = async (params: EventSearchParams, offset: number = 0, limit: number = 10): Promise<Event[]> => {
    const events = await EventModel.find({
        authorId: params.authorId,
        memberIds: { $in: params.memberIds },
        locationId: params.locationId,
        isPublic: params.isPublic,
        dateStart:{
            $gte: params.dateFrom,
            $lte: params.dateUntil
        }
    }).skip(offset).limit(limit).select('-__v').lean();
    logger.info({
        operation: 'findEvents',
        params,
        additionalParams: { offset, limit }
    });
    return events;
}

export const findEvent = async (id: string): Promise<Event> => {
    const event = await EventModel.findOne({ _id: id }).select('-__v').lean();
    if (!event) throw new NonExistentResourceError("event", JSON.stringify({ id }));
    logger.info({
        operation: "findEvent",
        resource: `event:${event._id}`,
        params: { id }
    });
    return event;
}

export const updateEventTitle = async (id: string, title: string): Promise<Boolean> => {
    const event = await EventModel.findOne({ _id: id });
    if (!event) throw new NonExistentResourceError("event", JSON.stringify({ id }));
    event.title = title;
    event.dateModified = new Date(Date.now());
    await event.save();
    logger.info({
        operation: 'updateEventTitle',
        resource: `event:${event._id}`,
        params: { id, title }
    });
    return true;
}

export const addEventMember = async (id: string, memberId: string): Promise<Boolean> => {
    const event = await EventModel.findOne({ _id: id });
    if (!event) throw new NonExistentResourceError("event", JSON.stringify({ id }));
    event.memberIds.push(memberId);
    event.dateModified = new Date(Date.now());
    await event.save();
    logger.info({
        operation: 'addEventMember',
        resource: `event:${event._id}`,
        params: { id, memberId }
    });
    return true;
}

export const dropEventMember = async (id: string, memberId: string): Promise<Boolean> => {
    const event = await EventModel.findOne({ _id: id });
    if (!event) throw new NonExistentResourceError("event", JSON.stringify({ id }));
    event.memberIds = event.memberIds.filter((m) => { return m != memberId });
    event.dateModified = new Date(Date.now());
    await event.save();
    logger.info({
        operation: 'dropEventMember',
        resource: `event:${event._id}`,
        params: { id, memberId }
    });
    return true;
}

export const updateEventIsPublic = async (id: string, isPublic: boolean): Promise<Boolean> => {
    const event = await EventModel.findOne({ _id: id });
    if (!event) throw new NonExistentResourceError("event", JSON.stringify({ id }));
    event.isPublic = isPublic;
    event.dateModified = new Date(Date.now());
    await event.save();
    logger.info({
        operation: 'updateEventIsPublic',
        resource: `event:${event._id}`,
        params: { id, isPublic }
    });
    return true;
}

export const updateEventLocation = async (id: string, location: string): Promise<Boolean> => {
    const event = await EventModel.findOne({ _id: id });
    if (!event) throw new NonExistentResourceError("event", JSON.stringify({ id }));
    event.locationId = location;
    event.dateModified = new Date(Date.now());
    await event.save();
    logger.info({
        operation: 'updateEventLocation',
        resource: `event:${event._id}`,
        params: { id, location }
    });
    return true;
}

export const updateEventDateStart = async (id: string, dateStart: Date): Promise<Boolean> => {
    const event = await EventModel.findOne({ _id: id });
    if (!event) throw new NonExistentResourceError("event", JSON.stringify({ id }));
    event.dateStart = dateStart;
    event.dateModified = new Date(Date.now());
    await event.save();
    logger.info({
        operation: 'updateEventStart',
        resource: `event:${event._id}`,
        params: { id, dateStart }
    });
    return true;
}

export const updateEventDateEnd = async (id: string, dateEnd: Date): Promise<Boolean> => {
    const event = await EventModel.findOne({ _id: id });
    if (!event) throw new NonExistentResourceError("event", JSON.stringify({ id }));
    event.dateEnd = dateEnd;
    event.dateModified = new Date(Date.now());
    await event.save();
    logger.info({
        operation: 'updateEventEnd',
        resource: `event:${event._id}`,
        params: { id, dateEnd }
    });
    return true;
}

export const cancelEvent = async (id: string): Promise<Boolean> => {
    const event = await EventModel.findOne({ _id: id });
    if (!event) throw new NonExistentResourceError("event", JSON.stringify({ id }));
    event.status = EventStatus.CANCELLED;
    event.dateModified = new Date(Date.now());
    await event.save();
    logger.info({
        operation: 'cancelEvent',
        resource: `event:${event._id}`,
        params: { id }
    });
    return true;
}
