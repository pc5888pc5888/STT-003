import c00 from "./assets/stt-logo-exact/chunk00.txt?raw";
import c01 from "./assets/stt-logo-exact/chunk01.txt?raw";
import c02 from "./assets/stt-logo-exact/chunk02.txt?raw";
import c03 from "./assets/stt-logo-exact/chunk03.txt?raw";
import c0405 from "./assets/stt-logo-exact/chunk04_05.txt?raw";
import c0607 from "./assets/stt-logo-exact/chunk06_07.txt?raw";
import c08a from "./assets/stt-logo-exact/chunk08_0.txt?raw";
import c08b from "./assets/stt-logo-exact/chunk08_1.txt?raw";
import c09a from "./assets/stt-logo-exact/chunk09_0.txt?raw";
import c09b from "./assets/stt-logo-exact/chunk09_1.txt?raw";
import c1011 from "./assets/stt-logo-exact/chunk10_11.txt?raw";
import c12 from "./assets/stt-logo-exact/chunk12.txt?raw";
import c13 from "./assets/stt-logo-exact/chunk13.txt?raw";
import c14 from "./assets/stt-logo-exact/chunk14.txt?raw";
import c15 from "./assets/stt-logo-exact/chunk15.txt?raw";
import c16 from "./assets/stt-logo-exact/chunk16.txt?raw";
import c17 from "./assets/stt-logo-exact/chunk17.txt?raw";

const logoBase64 = [
  c00, c01, c02, c03, c0405, c0607,
  c08a, c08b, c09a, c09b,
  c1011, c12, c13, c14, c15, c16, c17,
].join("").replace(/\s+/g, "");

export const STT_OFFICIAL_LOGO_SRC = `data:image/webp;base64,${logoBase64}`;
