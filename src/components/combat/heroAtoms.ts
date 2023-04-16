import { atom } from "recoil";

export type HeroType = {
  id?: number;
  name?: string;
  enemy?: boolean;
  conditions?: {condition: string; value: number;}[];
  next?: boolean;
  initiative: number;
};

export const heroInfoState = atom<HeroType | undefined>({
  key: "heroInfo",
  default: undefined
})


export const herolistState = atom<HeroType[]>({
  key: "heroListkey",
  default: [],
});


export const heroSelectedState = atom<HeroType | undefined>({
  key: "heroSelectedKey",
  default: undefined
})

export const openHeroDialogState = atom<boolean>({
  key: 'heroDialog',
  default: false
})
