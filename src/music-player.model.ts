import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.224.0/assert/mod.ts";

export class InvalidStringFormatError extends Error {
  constructor() {
    super("Invalid string format");
  }
}

export class MusicPlayerModel {
  constructor(
    public title: string,
    public artist: string,
  ) {}

  static fromString(str: string): MusicPlayerModel {
    const match = str.match(/^(?<title>.+)\n(?<artist>.+)\n$/);
    if (!match?.groups?.title && !match?.groups?.artist) {
      throw new InvalidStringFormatError();
    }
    return new MusicPlayerModel(match.groups.title, match.groups.artist);
  }
}

Deno.test("タイトルとアーティストを正しくパースする", () => {
  const str = "BASH BASH - feat. JP THE WAVY & Awich\nLANA\n";
  const { title, artist } = MusicPlayerModel.fromString(str);
  assertEquals(title, "BASH BASH - feat. JP THE WAVY & Awich");
  assertEquals(artist, "LANA");
});

Deno.test("空文字列のときはエラーを吐く", () => {
  const str = "";
  assertThrows(() => MusicPlayerModel.fromString(str));
});
