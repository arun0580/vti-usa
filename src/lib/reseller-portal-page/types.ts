export type PortalActionCard = {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: string;
};

export type PortalAssetItem = {
  label: string;
  href: string;
};

export type PortalTrainingCourse = {
  title: string;
  meta: string;
  description: string;
  href: string;
};

export type PortalAnnouncement = {
  date: string;
  title: string;
  description: string;
  href: string;
};

export type ResellerPortalPageContent = {
  hero: {
    kicker: string;
  };
  quickActions: {
    label: string;
    title: string;
    items: PortalActionCard[];
  };
  assetLibrary: {
    label: string;
    title: string;
    specSheetsTitle: string;
    specSheets: PortalAssetItem[];
    onescreenTitle: string;
    onescreenAssets: PortalAssetItem[];
    ledSignageTitle: string;
    ledSignageAssets: PortalAssetItem[];
    resourceCards: PortalActionCard[];
  };
  training: {
    label: string;
    title: string;
    courses: PortalTrainingCourse[];
  };
  announcements: {
    label: string;
    title: string;
    items: PortalAnnouncement[];
  };
  accountTeam: {
    label: string;
    title: string;
    phone: string;
    phoneHref: string;
    email: string;
  };
};
