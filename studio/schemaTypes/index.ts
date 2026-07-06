import { blockContent } from "./objects/blockContent";
import { navLink, navItem } from "./objects/navLink";
import { siteSettings } from "./documents/siteSettings";
import { navigation } from "./documents/navigation";
import { homePage } from "./documents/homePage";
import { pricePage } from "./documents/pricePage";
import { page } from "./documents/page";
import { service } from "./documents/service";
import { staffMember } from "./documents/staffMember";
import { post } from "./documents/post";
import { testimonial } from "./documents/testimonial";
import { video } from "./documents/video";

export const schemaTypes = [
  // Oggetti
  blockContent,
  navLink,
  navItem,
  // Documenti
  siteSettings,
  navigation,
  homePage,
  pricePage,
  page,
  service,
  staffMember,
  post,
  testimonial,
  video,
];
