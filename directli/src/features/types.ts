import { GenderPreference, LightingRequirement } from "./enums";

export interface Details {
    title: string;
    author: string;
    date: string;
    brief: string;
    desc: string;
    postType: string;
    subReq: string;
    postLenMin: number;
    postLenMax: number;
    gender?: GenderPreference;
    lighting?: LightingRequirement;
    rights: string;
    copy: string;
  }
  
  export interface FeedItemProps {
    details: Details;
  }