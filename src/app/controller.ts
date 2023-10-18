import { Router, Request, Response, NextFunction } from "express";
import { InvalidInputError } from "../domain/error";
import { CreateEventPayload } from "../domain/dto";
import {
    createEvent,
    findEvents,
    findEvent,
    cancelEvent,
    updateEventTitle,
    addEventMember,
    dropEventMember,
    updateEventIsPublic,
    updateEventLocation,
    updateEventDateStart,
    updateEventDateEnd
} from "./service";

const router = Router();

router.post("/api/events", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const payload: CreateEventPayload = request.body.data;
        if (!payload) throw new InvalidInputError("data");
        const data = await createEvent(payload);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.get("/api/events", async (request: Request, response: Response, next: NextFunction) => {
    try {
        let offset;
        let limit;
        if (request.query.offset) offset = +request.query.offset;
        if (request.query.limit) limit = +request.query.limit;

        // Add query parameter to search by user

        const data = await findEvents({}, offset, limit);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.get("/api/events/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        if (!request.params.id) throw new InvalidInputError("param:id");
        const data = await findEvent(request.params.id);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.put("/api/events/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        if (!request.params.id) throw new InvalidInputError("param:id");
        const id = request.params.id;
        if (request.query.title) await updateEventTitle(id, request.query.title.toString());
        if (request.query.add) await addEventMember(id, request.query.add.toString());
        if (request.query.drop) await dropEventMember(id, request.query.drop.toString());
        if (request.query.isPublic) await updateEventIsPublic(id, (request.query.isPublic === "true"));
        if (request.query.location) await updateEventLocation(id, request.query.location.toString());
        if (request.query.dateStart) await updateEventDateStart(id, new Date(request.query.dateStart.toString()));
        if (request.query.dateEnd) await updateEventDateEnd(id, new Date(request.query.dateEnd.toString()));
        response.status(200);
        next();
    } catch (err: any) {
        next(err);
    }
});

router.delete("/api/events/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        if (!request.params.id) throw new InvalidInputError("param:id");
        await cancelEvent(request.params.id);
        response.status(200);
        next();
    } catch (err: any) {
        next(err);
    }
});

export default router;
