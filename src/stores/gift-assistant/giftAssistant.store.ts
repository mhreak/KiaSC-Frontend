import { GiftAssistanStore, GiftAssistantData } from "./giftAssistant.types";
import { create } from "zustand";

const initialState: GiftAssistantData = {
  giftReceiver: {
    gender: 1,
    relationsId: undefined,
  },
  giftPersonality: {
    age: 18,
    eventId: undefined,
  },
  giftFavorite: {
    favoriteIds: [],
    jobId: undefined,
  },
  giftPrice: {
    priceFrom: 500000,
    priceTo: 10000000,
  },
};

export const useGiftAssistantStore = create<GiftAssistanStore>((set) => ({
  ...initialState,

  setGiftReceiver: (data) =>
    set((state) => ({
      giftReceiver: {
        ...state.giftReceiver,
        ...data,
      },
    })),

  setGender: (data) =>
    set((state) => ({
      giftReceiver: {
        ...state.giftReceiver,
        gender: data,
      },
    })),
  setRelationId: (data) =>
    set((state) => ({
      giftReceiver: {
        ...state.giftReceiver,
        relationsId: data,
      },
    })),

  setGiftPersonality: (data) =>
    set((state) => ({
      giftPersonality: {
        ...state.giftPersonality,
        ...data,
      },
    })),

  setAge: (data) =>
    set((state) => ({
      giftPersonality: {
        ...state.giftPersonality,
        age: data,
      },
    })),
  setEventId: (data) =>
    set((state) => ({
      giftPersonality: {
        ...state.giftPersonality,
        eventId: data,
      },
    })),

  setGiftFavorite: (data) =>
    set((state) => ({
      giftFavorite: {
        ...state.giftFavorite,
        ...data,
      },
    })),

  setFavoriteIds: (data) =>
    set((state) => ({
      giftFavorite: {
        ...state.giftFavorite,
        favoriteIds: data,
      },
    })),
  setJobId: (data) =>
    set((state) => ({
      giftFavorite: {
        ...state.giftFavorite,
        jobId: data,
      },
    })),

  setGiftPrice: (data) =>
    set((state) => ({
      giftPrice: {
        ...state.giftPrice,
        ...data,
      },
    })),
  setPriceFrom: (data) =>
    set((state) => ({
      giftPrice: {
        ...state.giftPrice,
        priceFrom: data,
      },
    })),
  setPriceTo: (data) =>
    set((state) => ({
      giftPrice: {
        ...state.giftPrice,
        priceTo: data,
      },
    })),

  reset: () =>
    set({
      ...initialState,
      giftReceiver: {
        ...initialState.giftReceiver,
      },
      giftPersonality: {
        ...initialState.giftPersonality,
      },
      giftFavorite: {
        ...initialState.giftFavorite,
        favoriteIds: [],
      },
      giftPrice: {
        ...initialState.giftPrice,
      },
    }),
}));
