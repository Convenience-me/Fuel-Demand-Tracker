import { Router, type IRouter } from "express";
import { db, pageViewsTable, waitlistTable } from "@workspace/db";
import { TrackPageViewBody } from "@workspace/api-zod";
import { count } from "drizzle-orm";
import { isNotNull } from "drizzle-orm";

const router: IRouter = Router();

router.post("/analytics/track", async (req, res): Promise<void> => {
  const parsed = TrackPageViewBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.message });
    return;
  }

  const [view] = await db
    .insert(pageViewsTable)
    .values({ page: parsed.data.page })
    .returning();

  res.status(201).json({
    id: view.id,
    page: view.page,
    createdAt: view.createdAt.toISOString(),
  });
});

router.get("/analytics/summary", async (_req, res): Promise<void> => {
  const [pageViewCount] = await db
    .select({ count: count() })
    .from(pageViewsTable);

  const [signupCount] = await db
    .select({ count: count() })
    .from(waitlistTable);

  const [nameCount] = await db
    .select({ count: count() })
    .from(waitlistTable)
    .where(isNotNull(waitlistTable.name));

  const totalPageViews = pageViewCount?.count ?? 0;
  const totalSignups = signupCount?.count ?? 0;
  const signupsWithName = nameCount?.count ?? 0;
  const conversionRate = totalPageViews > 0 ? (totalSignups / totalPageViews) * 100 : 0;

  res.json({
    totalPageViews,
    totalSignups,
    signupsWithName,
    conversionRate: Math.round(conversionRate * 100) / 100,
  });
});

export default router;
