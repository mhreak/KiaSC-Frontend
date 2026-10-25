type EndpointGroup = {
  endpoint: string;
  actions: Record<string, string>;
};

type ApiEndpoints = Record<string, EndpointGroup>;

export const API_ENDPOINT = {
  athlete: "/Athlete",
  sport: "/Sport",
  team: "/Team",
  term: "/Term",
  place: "/Place",
  subPlace: "/SubPlace",
  guild: "/Senf",
  ageGroup: "/AgeGroup",
  athleteRole: "/AthleteRole",
  personRole: "/PersonRole",
  shop: "/Shop",
  shopProduct: "/ShopProduct",
  fileType: "/FileType",
  promoType: "/PromoType",
  course: "/Course",
  discountCode: "/DiscountCode",
  person: "/Person",
  birthdayGift: "/BirthdayGift",
  courseClasses: "/CourseClass",
  installment: "/Installment",
};
