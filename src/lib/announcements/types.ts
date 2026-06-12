export type AnnouncementStatus = "active" | "inactive";

export type AnnouncementCreator = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type SiteAnnouncement = {
  id: string;
  title: string;
  dateFrom: string;
  dateTo: string;
  dateRangeLabel: string;
  linkText: string;
  linkUrl: string;
  status: AnnouncementStatus;
  createdBy: AnnouncementCreator;
  createdAt: string;
  updatedAt: string;
};

export type PublicAnnouncement = Pick<
  SiteAnnouncement,
  "id" | "title" | "dateFrom" | "dateTo" | "dateRangeLabel" | "linkText" | "linkUrl"
>;

export type AnnouncementPayload = {
  title: string;
  dateFrom: string;
  dateTo: string;
  linkText: string;
  linkUrl: string;
  status: AnnouncementStatus;
};
