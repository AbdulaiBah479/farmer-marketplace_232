import { google } from "googleapis";
import { getIntegration, createCalendarEvent } from "../db/queries";

async function getCalendarClient(tenantId: string) {
  const integration = await getIntegration(tenantId, "google");
  if (!integration?.is_active || !integration.access_token) throw new Error("Google Calendar not connected.");
  const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
  oauth2Client.setCredentials({ access_token: integration.access_token, refresh_token: integration.refresh_token ?? undefined });
  return google.calendar({ version: "v3", auth: oauth2Client });
}

export async function googleCalendarCheckAvailability(tenantId: string, opts: { startDate: string; endDate: string }) {
  const calendar = await getCalendarClient(tenantId);
  const freeBusy = await calendar.freebusy.query({ requestBody: { timeMin: opts.startDate, timeMax: opts.endDate, items: [{ id: "primary" }] } });
  const busy = freeBusy.data.calendars?.primary?.busy ?? [];
  return { startDate: opts.startDate, endDate: opts.endDate, busySlots: busy, available: busy.length === 0 };
}

export async function googleCalendarCreateEvent(tenantId: string, opts: { title: string; startTime: string; endTime: string; attendees?: string[]; description?: string; location?: string }) {
  const calendar = await getCalendarClient(tenantId);
  const event = await calendar.events.insert({ calendarId: "primary", sendUpdates: "all", requestBody: { summary: opts.title, description: opts.description, location: opts.location, start: { dateTime: opts.startTime }, end: { dateTime: opts.endTime }, attendees: (opts.attendees ?? []).map((email) => ({ email })) } });
  await createCalendarEvent({ tenant_id: tenantId, google_event_id: event.data.id ?? null, title: opts.title, description: opts.description ?? null, location: opts.location ?? null, start_time: opts.startTime, end_time: opts.endTime, attendees: (opts.attendees ?? []).map((email) => ({ email })), organizer_id: null, status: "confirmed" });
  return { success: true, eventId: event.data.id, htmlLink: event.data.htmlLink, title: opts.title, startTime: opts.startTime, endTime: opts.endTime };
}

export async function googleCalendarUpdateEvent(tenantId: string, eventId: string, updates: { title?: string; startTime?: string; endTime?: string; description?: string; status?: string }) {
  const calendar = await getCalendarClient(tenantId);
  const patch: Record<string, unknown> = {};
  if (updates.title) patch.summary = updates.title;
  if (updates.description) patch.description = updates.description;
  if (updates.startTime) patch.start = { dateTime: updates.startTime };
  if (updates.endTime) patch.end = { dateTime: updates.endTime };
  if (updates.status) patch.status = updates.status;
  await calendar.events.patch({ calendarId: "primary", eventId, sendUpdates: "all", requestBody: patch });
  return { success: true, eventId };
}
