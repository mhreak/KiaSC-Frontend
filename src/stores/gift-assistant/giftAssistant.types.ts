export interface GiftReceiver {
  gender: number;
  relationsId?: number;
}
export interface GiftPersonality {
  age: number;
  eventId?: number;
}
export interface GiftFavorite {
  favoriteIds: number[];
  jobId?: number;
}
export interface GiftPrice {
  priceFrom: number;
  priceTo?: number;
}

export interface GiftAssistantData {
  giftReceiver: GiftReceiver;
  giftPersonality: GiftPersonality;
  giftFavorite: GiftFavorite;
  giftPrice: GiftPrice;
}

export interface GiftAssistanStore extends GiftAssistantData {
  setGiftReceiver: (data: Partial<GiftReceiver>) => void;
  setGender: (gender: number) => void;
  setRelationId: (relationId?: number) => void;

  setGiftPersonality: (data: Partial<GiftPersonality>) => void;
  setAge: (age: number) => void;
  setEventId: (eventId?: number) => void;

  setGiftFavorite: (data: Partial<GiftFavorite>) => void;
  setFavoriteIds: (favoriteIds: number[]) => void;
  setJobId: (jobId?: number) => void;

  setGiftPrice: (data: Partial<GiftPrice>) => void;
  setPriceFrom: (priceFrom: number) => void;
  setPriceTo: (priceTo?: number) => void;

  reset: () => void;
}
