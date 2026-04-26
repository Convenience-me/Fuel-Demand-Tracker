import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, waitlistTable } from "@workspace/db";
import {
  CreateWaitlistEntryBody,
  UpdateWaitlistNameParams,
  UpdateWaitlistNameBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/waitlist", async (req, res): Promise<void> => {
  const parsed = CreateWaitlistEntryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.message });
    return;
  }

  const [entry] = await db
    .insert(waitlistTable)
    .values({
      neighborhood: parsed.data.neighborhood,
      phone: "",
    })
    .returning();

  res.status(201).json({
    id: entry.id,
    neighborhood: entry.neighborhood,
    phone: entry.phone,
    name: entry.name,
    createdAt: entry.createdAt.toISOString(),
  });
});

router.patch("/waitlist/:id/name", async (req, res): Promise<void> => {
  const params = UpdateWaitlistNameParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ message: params.error.message });
    return;
  }

  const body = UpdateWaitlistNameBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ message: body.error.message });
    return;
  }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  const [entry] = await db
    .update(waitlistTable)
    .set({ name: body.data.name })
    .where(eq(waitlistTable.id, id))
    .returning();

  if (!entry) {
    res.status(404).json({ message: "Entry not found" });
    return;
  }

  res.json({
    id: entry.id,
    neighborhood: entry.neighborhood,
    phone: entry.phone,
    name: entry.name,
    createdAt: entry.createdAt.toISOString(),
  });
});

export default router;
