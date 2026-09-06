import part0 from "./assets/stt-logo/part0.txt?raw";
import part1 from "./assets/stt-logo/part1.txt?raw";
import part2 from "./assets/stt-logo/part2.txt?raw";
import part3 from "./assets/stt-logo/part3.txt?raw";
import part4 from "./assets/stt-logo/part4.txt?raw";

export const STT_OFFICIAL_LOGO_SRC = `data:image/webp;base64,${[part0, part1, part2, part3, part4].join("").replace(/\s+/g, "")}`;
