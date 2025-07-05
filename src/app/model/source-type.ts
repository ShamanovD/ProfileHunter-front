export enum SourceType {

  TELEGRAM = "TELEGRAM",
  INSTAGRAM = "INSTAGRAM",
  X = "X",
  YOUTUBE = "YOUTUBE",

}

export interface SourceTypeData {

  name: string;
  iconLink: string;

}

export const SourceTypeMap: Record<SourceType, SourceTypeData> = {
  [SourceType.TELEGRAM]: { name: "Telegram", iconLink: "assets/telegram.svg" },
  [SourceType.INSTAGRAM]: { name: "Instagram", iconLink: "assets/instagram.svg" },
  [SourceType.X]: { name: "X", iconLink: "x.svg" },
  [SourceType.YOUTUBE]: { name: "YouTube", iconLink: "assets/youtube.svg" },
}
