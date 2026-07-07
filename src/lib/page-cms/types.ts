export type AdminPageContent<T = unknown> = {
  slug: string;
  content: T | null;
  updatedBy: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  updatedAt: string;
  createdAt: string;
};
