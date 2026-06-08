import { motion } from "motion/react";
import { Landmark, Users, Scroll } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const directory = [
  { role: "?µÊ??Ü‰???, name: "?äÈ?Áø??öÂ£´", title: "‰∏≠ËèØ‰ºÅÊ•≠Á≠ñÁï•Ê∞∏Á??ºÂ?Â≠∏Ê? ?µËæ¶‰∫? },
  { role: "?ØÁ?‰∫ãÈï∑", name: "?ÉËã±Â≥?, title: "?ÇÂÆ•?∞Â∑•Á®ãÊ??êÂÖ¨??Á∏ΩÁ??? },
  { role: "ÁßòÊõ∏??, name: "ÈªÉÊ?Á¶??ÉË?Â∏?, title: "?ùÈôΩ?ÉË?Â∏´‰??ôÊ? ?Ä?? },
  { role: "Â∏∏Â??Ü‰?", name: "?≥È?Á®?, title: "?âÂ±±?ÄË°?Ë•ÑÁ?" },
  { role: "?Ü‰?", name: "Ë¨ùÁ??°Â?Â∏?, title: "Ë¨ùÁ??°Â?Â∏´‰??ôÊ? ‰∏ªÊ?ÂæãÂ∏´" },
  { role: "?Ü‰?", name: "È´òÊ?Ë¨?ÂæãÂ∏´", title: "?öÁ?Ê≥ïÂ?‰∫ãÂ??Ä" },
  { role: "?Ü‰?", name: "?óÊ???ÂæãÂ∏´", title: "Ê¨??Ê≥ïÂ?‰∫ãÂ??Ä ‰∏ªÊ?ÂæãÂ∏´" },
  { role: "?Ü‰?", name: "Ë≥¥Á•∫??ÂæãÂ∏´", title: "Ë≥¥Á•∫?ÉÂ?Â∏´‰??ôÊ? ?Ä?? },
  { role: "?Ü‰?", name: "?âÁ???ÂæãÂ∏´", title: "‰∫ûÊ£Æ?ßÂ??õÊ?Âæã‰??ôÊ? ?Ä?? },
  { role: "?Ü‰?", name: "?óÊîø??ÂæãÂ∏´", title: "‰∏äÊµ∑?≥Êµ©ÂæãÂ∏´‰∫ãÂ??Ä ?àÂ§•ÂæãÂ∏´" },
  { role: "?ôË??Ü‰?", name: "Ê∏∏Á???, title: "?∫Áî∞Â∑•Ê•≠?âÈ??¨Âè∏ Ê•≠Â?Á∂ìÁ?" },
  { role: "Â∏∏Â????", name: "ÂªñÁ???, title: "?≠Á??ªÊ??âÈ??¨Âè∏ Á∏ΩÁ??? },
  { role: "???", name: "?éÂ???Âª∫Á?Â∏?, title: "?éÂ??êÂª∫ÁØâÂ∏´‰∫ãÂ??Ä ?Ä?? },
  { role: "???", name: "?óÂÆ∂Ë±?, title: "Ê®ÇÊ•≠?ãÈ?‰∫ãÊ•≠?âÈ??¨Âè∏ ?∑Ë??? },
  { role: "?ôË????", name: "?≥Â?ÂÆ?, title: "Ë£ïÂ??∏‰?Ë≥áË??°‰ªΩ?âÈ??¨Âè∏ ?ØÁ?" },
];

const charter = [
  {
    chapter: "Á¨¨‰?Á´†„ÄÄÁ∏ΩÂ?",
    articles: [
      { id: "Á¨¨‰?Ê¢?, content: "?¨Ê??çÁ®±?∫‰∏≠?Ø‰?Ê•≠Á??•Ê∞∏Á∫åÁôºÂ±ïÂ≠∏?ÉÔ?‰ª•‰?Á∞°Á®±?¨Ê?Ôºâ„Ä? },
      { id: "Á¨¨‰?Ê¢?, content: "?¨Ê??∫‰?Ê≥ïË®≠Á´ã„ÄÅÈ?‰ª•Á??©ÁÇ∫?ÆÁ?‰πãÂÖ¨?äÊÄßÁ§æ?ÉÂ?È´îÔ??¨Ê?ÂÆóÊó®?¥Â??ºÊé®Âª?Ö¨?∏Ê≤ª?Ü‰?Ê≥ïÈÅµÁ≤æÁ?Ôºå‰∏¶‰øÉÈÄ≤‰?Ê•≠Êô∫Â∫´Á??•‰??âÊ??âÁî®Ôºå‰ª•ÂºïÂ?‰ºÅÊ•≠Á©çÊ•µÂØ¶Ë?Á§æÊ?Ë≤¨‰ªªÔºå‰∏¶Ê∑±Â??¨Âè∏Ê≤ªÁ?‰πãËêΩÂØ¶Ô??≤ËÄåÂº∑?ñ‰?Ê•≠Á?ÁπîÈ?Ë≥™Ô??êÂ??¥È??üÈ??àËÉΩÔºå‰∏¶Á©çÊ•µÂª∫Ê?‰ºÅÊ•≠?å„ÄÅÊ??ìÂ?È´îÂ?Â≠∏Ë??å‰?Ë∑®Á?‰∫§Ê?Âπ≥Âè∞Ôºå‰ª•?çÁûª?ßÊÄùÁ∂≠Âº∑Â?È¢®Èö™?ßÁÆ°Ê©üÂà∂ÔºåÊ??àÈ?‰ΩéÊ??®Áà≠Ë≠∞Ë??çÂ§±ÔºåÊ?ÁµÇÊó®?®ÂÖ®?¢Ê??á‰?Ê•≠È??ëÊ∞∏Á∫åÁôºÂ±ï‰??ïËÉΩ?? },
      { id: "Á¨¨‰?Ê¢?, content: "?¨Ê?‰πã‰ªª?ôÂ?‰∏ãÔ?\n‰∏Ä?ÅÊàÆ?õÂÄ°Â?Á≠ñÁï•?ºÂ??ùÁ∂≠ÔºåÊ∑±Ê§çÁ??•ÁÇ∫?à„ÄÅÊ≤ª?ÜÁÇ∫?¨„ÄÅÁÆ°?ÜÁÇ∫ÁµÇ‰??≠Ëá¨ÔºåË?‰ª•Â?Ê§çÁî¢Ê•≠ÂÉπ?ºÂü∫Á£ê„ÄÇ\n‰∫å„ÄÅÁ≤æÂæÆË?ÂØüÁî¢Ê•≠Ë??ïË??ºÂ?Ë∂®Âã¢ÔºåÊ∑±?•ÊÄùËÄÉÂ??ãÁ??•ÁÆ°?Ü‰??ßÊ∂µÔºå‰∏¶ÂºòÊ??¨Âè∏Ê≤ªÁ?Ê≥ïÈÅµ‰πãÁ≤æÁ•û„ÄÇ\n‰∏â„ÄÅÊ??É‰?Ê•≠Á??•Ë??ñÔ??îÂä©‰ºÅÊ•≠?àÂª∫?∫Â∫´‰ª•Á¨¶‰ºÅÊ•≠?ºÂ?‰πãÈ??Ç\n?õ„ÄÅË??©Áî¢Ê•≠Á??ÅÂ≠∏Ë°ìÁ??äÁ?Á©∂Ê?ÊßãÔ?Âª∫Ê?Â§öÂ?‰∫§Ê?‰∫íÂ?Âπ≥Âè∞Ôºå‰??≤Áî¢Â≠∏Á?‰πãËì¨?ÉÁôºÂ±ï„ÄÇ\n‰∫î„ÄÅÁ?Ëæ¶Áî¢Ê•≠Ë∂®?¢Á?Ë®éÁ??É„ÄÅÂ?Ê•≠Ë≠∞È°åÂ∫ßË´áÊ??äÂ∑•?ÜÂØ¶?ôË??©Ë??ÖÔ?‰ª•Â?Ëø™Ê•≠?åÊñ∞?ùÁ∂≠?Ç\n?≠„ÄÅÊ??ÑÁ?ÂßîË?ÔºåÂ??©Á??üÁÆ°?ÜÁ?Á©∂„ÄÅËæ¶?ÜÂ≠∏Ë°ìÂ?È°åË?Â∫ßÔ?‰∏¶Ê?‰æõÂ?Ê•≠Ë´ÆË©¢Âª∫Ë≠∞Ô?‰ª•Ê??©Êñº‰ºÅÊ•≠Ê±∫Á?‰πãÂ??Ñ„ÄÇ\n‰∏É„ÄÅÊ?‰æõ‰?Ê•≠Á??ãÊ?Ë¶èË´ÆË©¢Ê??ôÔ?‰∏¶ÂæµË©¢Â≠∏Ë°ìÂ?ÂÆ∂Â?Ë¶ãÔ?‰øæÂà©‰ºÅÊ•≠Á©©ÂÅ•Á∂ìÁ??Ç\n?´„ÄÅÂ??åËæ¶?Ü‰?Ê•≠Á??•Ê∑±?ïÊ??≤ÂüπË®ìÂ??∏È?Ê¥ªÂ?Ôºå‰ª•?©Á??•ÊÄùÁ∂≠‰πãÊôÆ?äË?Ê∑±Â??? },
      { id: "Á¨¨Â?Ê¢?, content: "?¨Ê?‰πã‰∏ªÁÆ°Ê??úÁÇ∫?ßÊîø?®Ô??¨Ê?‰πãÁõÆ?Ñ‰?Ê•≠Ê??óÂ?Ë©≤‰?Ê•≠‰∏ªÁÆ°Ê??ú‰??áÂ??ÅÁõ£??Ä? },
      { id: "Á¨¨‰?Ê¢?, content: "?¨Ê?‰ª•ÂÖ®?ãË??øÂ??üÁÇ∫ÁµÑÁ??Ä?ü„Ä? },
      { id: "Á¨¨ÂÖ≠Ê¢?, content: "?¨Ê??ÉÂ?Ë®≠Êñº‰∏ªÁÆ°Ê©üÈ??ÄËΩÑÂú∞?ÄÔºå‰∏¶ÂæóÂ†±Á∂ì‰∏ªÁÆ°Ê??úÊ†∏?ÜË®≠?ÜÊîØÊ©üÊ??Ç\n?çÈ??ÜÊîØÊ©üÊ?ÁµÑÁ?Á∞°Â?Á∂ìÊ??°Ô??ÉÂì°‰ª?°®ÔºâÂ§ß?ÉÈÄöÈ?ÔºåÂ†±Ë´ã‰∏ªÁÆ°Ê??úÊ†∏?ÜÂ?Ë°å‰??Ç\n?ÉÂ??äÂ??ØÊ?Êßã‰??∞Â??ºË®≠ÁΩÆÂ?ËÆäÊõ¥?ÇÔ??âÂáΩ?±‰∏ªÁÆ°Ê??úÊ†∏?ô„Ä? }
    ]
  },
  {
    chapter: "Á¨¨‰?Á´†„ÄÄ?ÉÂì°?ÅÁ?‰∫ãÂ????",
    articles: [
      { id: "Á¨¨‰?Ê¢?, content: "?¨Ê??ÉÂì°?äÊ?Ë≤ªÂ?È°ûÂ?‰∏ãÔ?\n‰∏Ä?ÅÂÄã‰∫∫?ÉÂì°ÔºöÂá°Ë¥äÂ??¨Ê?ÂÆóÊó®?ÅÂπ¥Êªø‰??Å‰?Ê≠≤Ô?Â°´ÂÖ∑?•Ê??≥Ë??∏Ô?Á∂ìÁ?‰∫ãÊ?ÂØ©Êü•?öÈ?Ôºå‰∏¶Áπ≥Á??ÉË≤ªÂæåÔ??∫ÂÄã‰∫∫?ÉÂì°ÔºõÂÖ•?ÉË≤ª?∞Ëá∫Âπ?000?ÉÔ??ºÊ??°ÂÖ•?ÉÊ?Áπ≥Á?ÔºõÂ∏∏Âπ¥Ê?Ë≤ªÊñ∞?∫Âπ£2000?É„ÄÇ\n‰∫å„ÄÅÊ¶ÆË≠ΩÊ??°Ô?Ë¥äÂ??¨Ê?ÂÆóÊó®?ÑÂÖ¨ÁßÅÁ?Ê©üÊ??òÈ??ñÂÄã‰∫∫ÔºåÁ??¨Ê??ÄË´ãÊ?‰ªª‰??ÉÂì°?Ç\n‰∏â„ÄÅË??©Ê??°Ô?Ë¥äÂ??¨Ê?ÂÆóÊó®‰∏îÂ??¨Ê??°Â??êË?‰πãÂÄã‰∫∫?ÅÊ?ÊßãÊ??òÈ?ÔºåÁ??¨Ê??ÄË´ãÊ?‰ªª‰??ÉÂì°?? },
      { id: "Á¨¨ÂÖ´Ê¢?, content: "?ÉÂì°ÔºàÊ??°‰ª£Ë°®Ô??âË°®Ê±∫Ê??ÅÈÅ∏?âÊ??ÅË¢´?∏Ë?Ê¨äË?ÁΩ∑Â?Ê¨ä„ÄÇÊ?‰∏Ä?ÉÂì°ÔºàÊ??°‰ª£Ë°®Ô??∫‰?Ê¨ä„ÄÇË??©Ê??°„ÄÅÊ¶ÆË≠ΩÊ??°ÁÑ°?çÈ?Ê¨äÂà©?? },
      { id: "Á¨¨‰?Ê¢?, content: "?¨Ê??Ü‰??ÅÁõ£‰∫ãÂ??∫ÁÑ°Áµ¶ËÅ∑Ôºå‰ªª?ü‰?Âπ¥Ô???Å∏ÂæóÈÄ?ªª?ÇÁ?‰∫ãÈï∑‰πãÈÄ?ªªÔºå‰ª•‰∏ÄÊ¨°ÁÇ∫?ê„ÄÇÁ?‰∫ã„ÄÅÁõ£‰∫ã‰?‰ªªÊ??™Âè¨?ãÊú¨Â±ÜÁ¨¨‰∏ÄÊ¨°Á?‰∫ãÊ?‰πãÊó•Ëµ∑Ë?ÁÆó„Ä? },
      { id: "Á¨¨Â?Ê¢?, content: "?¨Ê?ÁΩÆÁ?‰∫?‰∫∫Ô??´Â∏∏?ôÁ?‰∫?‰∫∫Ô??∂‰∏≠1‰∫∫ÁÇ∫?Ü‰??∑Ô??∂‰∏≠1‰∫∫ÁÇ∫?ØÁ?‰∫ãÈï∑Ôºâ„ÄÅÂÄôË??Ü‰?1‰∫∫„ÄÇ\nÂ∏∏Â??Ü‰?ÔºåÁî±?®È??Ü‰?‰∫íÈÅ∏‰πã„ÄÇ\n?Ü‰??∑Ô??±ÂÖ®È´îÁ?‰∫ãÂ∞±Â∏∏Â??Ü‰?‰∏≠ÈÅ∏?â‰??Ç\n?ØÁ?‰∫ãÈï∑ÔºåÁî±?®È??Ü‰?Â∞±Â∏∏?ôÁ?‰∫ã‰∏≠?∏Ë?‰πã„Ä? },
      { id: "Á¨¨Â?‰∏ÄÊ¢?, content: "?¨Ê?ÁΩÆÁõ£‰∫?‰∫∫„ÄÅÂÄôË????1‰∫∫„ÄÅÂ∏∏?ôÁõ£‰∫?‰∫∫„ÄÅÁõ£‰∫ãÊ??¨È?‰∫?‰∫∫„ÄÇÁõ£‰∫ãÊ?ÁΩÆÂ∏∏?ôÁõ£‰∫ãÔ??±Áõ£‰∫ã‰??∏‰?ÔºåÁõ£ÂØüÊó•Â∏∏Ê??ôÔ?‰∏¶‰???‰∫∫Ê?‰ªªÁõ£‰∫ãÊ??¨È?‰∫∫„Ä? },
      { id: "Á¨¨Â?‰∫åÊ?", content: "?ÉÂì°?âÈÅµÂÆàÊú¨?ÉÁ?Á®ã„ÄÅÊ±∫Ë≠∞Â?Áπ≥Á??ÉË≤ª‰πãÁæ©?ô„ÄÇ\n?ÉÂì°?™Áπ≥Á¥çÊ?Ë≤ªËÄÖÔ?‰∏çÂ?‰∫´Ê??ÉÂì°Ê¨äÂà©ÔºåÈÄ??2Âπ¥Êú™Áπ≥Á??ÉË≤ª?ÖÔ?Ë¶ñÁÇ∫?™Â??Ä?É„ÄÇÊ??°Á??∫Ê??ÅÈÄÄ?ÉÊ??úÊ??ïÂ?ÔºåÂ?Ê¨≤Áî≥Ë´ãÂæ©?ÉÊ?Âæ©Ê??ÇÔ??§Ê?Ê≠?ï∂?ÜÁî±Á∂ìÁ?‰∫ãÊ?ÂØ©Ê†∏?öÈ??ÖÂ?ÔºåÊ?Áπ≥Ê??çÊ?Á©çÊ?‰πãÊ?Ë≤ª„Ä? },
      { id: "Á¨¨Â?‰∏âÊ?", content: "?ÉÂì°ÔºàÊ??°‰ª£Ë°®Ô??âÈ??çÊ?‰ª§„ÄÅÁ?Á®ãÊ?‰∏çÈÅµÂÆàÊ??°Â§ß?ÉÊ±∫Ë≠∞Ê?ÔºåÂ?Á∂ìÁ?‰∫ãÊ?Ê±∫Ë≠∞Ôºå‰?‰ª•Ë≠¶?äÊ??úÊ??ïÂ?ÔºåÂÖ∂?±ÂÆ≥?òÈ??ÖÁ??çÂ§ß?ÖÔ?ÂæóÁ??ÉÂì°Â§ßÊ?Ê±∫Ë≠∞‰∫à‰ª•?§Â??? },
      { id: "Á¨¨Â??õÊ?", content: "?ÉÂì°?â‰??óÊ?‰∫ã‰?‰∏Ä?ÖÔ??∫Âá∫?ÉÔ?\n‰∏Ä?ÅÂñ™Â§±Ê??°Ë??ºËÄÖ„ÄÇ\n‰∫å„ÄÅÁ??ÉÂì°Â§ßÊ?Ê±∫Ë≠∞?§Â??Ö„Ä? },
      { id: "Á¨¨Â?‰∫îÊ?", content: "?ÉÂì°Âæó‰ª•?∏Èù¢?òÊ??ÜÁî±?ëÊú¨?ÉËÅ≤?éÈÄÄ?É„Ä? }
    ]
  },
  {
    chapter: "Á¨¨‰?Á´†„ÄÄÁµÑÁ??äËÅ∑Ê¨?,
    articles: [
      { id: "Á¨¨Â??≠Ê?", content: "?¨Ê?‰ª•Ê??°Â§ß?ÉÁÇ∫?ÄÈ´òÊ??õÊ?Êßã„ÄÇÊ??°‰∫∫?∏Ë??é‰??æ‰∫∫‰ª•‰??ÇÂ??ÜÂ?ÊØî‰??∏Âá∫?ÉÂì°‰ª?°®ÔºåÂ??¨È??ÉÂì°‰ª?°®Â§ßÊ?ÔºåË?‰ΩøÊ??°Â§ß?ÉËÅ∑Ê¨ä„ÄÇÊ??°‰ª£Ë°®‰ªª?ü‰?Âπ¥Ô??∂Â?È°çÂ??∏Ë?Ëæ¶Ê??±Á?‰∫ãÊ??¨Ë?ÔºåÂ†±Ë´ã‰∏ªÁÆ°Ê??úÊ†∏?ôÂ?Ë°å‰??? },
      { id: "Á¨¨Â?‰∏ÉÊ?", content: "?ÉÂì°Â§ßÊ?‰πãËÅ∑Ê¨äÂ?‰∏ãÔ?\n‰∏Ä?ÅË?ÂÆöË?ËÆäÊõ¥Á´†Á??Ç\n‰∫å„ÄÅÈÅ∏?âÂ?ÁΩ∑Â??Ü‰??ÅÁõ£‰∫ã„ÄÇ\n‰∏â„ÄÅË≠∞Ê±∫ÂÖ•?ÉË≤ª?ÅÂ∏∏Âπ¥Ê?Ë≤ª„ÄÅ‰?Ê•≠Ë≤ª?äÊ??°Ê?Ê¨æ‰??∏È??äÊñπÂºè„ÄÇ\n?õ„ÄÅË≠∞Ê±∫Âπ¥Â∫¶Â∑•‰ΩúË??´„ÄÅÂ†±?äÂ??êÁ??ÅÊ±∫ÁÆó„ÄÇ\n‰∫î„ÄÅË≠∞Ê±∫Ê??°‰??§Â??ïÂ??Ç\n?≠„ÄÅË≠∞Ê±∫Ë≤°?¢‰??ïÂ??Ç\n‰∏É„ÄÅË≠∞Ê±∫Êú¨?É‰?Ëß?ï£?Ç\n?´„ÄÅË≠∞Ê±∫Ë??ÉÂì°Ê¨äÂà©Áæ©Â??âÈ?‰πãÂÖ∂‰ªñÈ?Â§ß‰??Ö„ÄÇÂ??ÖÁ¨¨?´Ê¨æ?çÂ§ß‰∫ãÈ?‰πãÁ??çÁî±?Ü‰??ÉÂ?‰πã„Ä? },
      { id: "Á¨¨Â??´Ê?", content: "?¨Ê??Ü‰??ÅÁõ£‰∫ãÔ??±Ê??°Ô??ÉÂì°‰ª?°®ÔºâÈÅ∏?â‰?ÔºåÂ??•Ê?Á´ãÁ?‰∫ãÊ??ÅÁõ£‰∫ãÊ??Ç\n?∏Ë??çÈ??Ü‰??ÅÁõ£‰∫ãÊ?Ôºå‰?Ë®àÁ•®?ÖÂΩ¢ÂæóÂ??ÇÈÅ∏?∫ÂÄôË??Ü‰?ÔºåÂÄôË????ÔºåÈ??Ü‰??ÅÁõ£‰∫ãÂá∫Áº∫Ê?ÔºåÂ??•‰?Â∫èÈ?Ë£ú‰??Ç\n?Ü‰??ÉÂ??êÂá∫‰∏ãÂ??Ü‰??ÅÁõ£‰∫ãÂÄôÈÅ∏‰∫∫Â??ÉÂ??Æ„ÄÇ\n?Ü‰??ÅÁõ£‰∫ãÂ??°Áî®?öË??∏Ë??ÇÈÄöË??∏Ë?Ëæ¶Ê??±Á?‰∫ãÊ??öÈ?ÂæåÂØ¶?ΩÔ?‰∏¶Â†±‰∏ªÁÆ°Ê©üÈ??ôÊü•?? },
      { id: "Á¨¨Â?‰πùÊ?", content: "?Ü‰??∑Â??ßÁ??ÜÁù£Â∞éÊ??ôÔ?Â∞çÂ?‰ª?°®?¨Ê?Ôºå‰∏¶?î‰ªª?ÉÂì°Â§ßÊ??ÅÁ?‰∫ãÊ?‰∏ªÂ∏≠?Ç\n?Ü‰??∑Â?‰∫ã‰??ΩÂü∑Ë°åËÅ∑?ôÊ?ÔºåÁî±?ØÁ?‰∫ãÈï∑‰ª??‰πãÔ??™Ê?ÂÆöÊ?‰∏çËÉΩ?áÂ??ÇÔ??±Â∏∏?ôÁ?‰∫ã‰???‰∫∫‰ª£?Ü‰??Ç\n?Ü‰??∑„ÄÅÂâØ?Ü‰??∑Ê?Â∏∏Â??Ü‰??∫Áº∫?ÇÔ??âÊñº2?ãÊ??ßË??∏‰??? },
      { id: "Á¨¨‰??ÅÊ?", content: "?Ü‰??É‰??∑Ê?Â¶Ç‰?Ôºö\n‰∏Ä?ÅÂØ©ÂÆöÊ??°Ô??ÉÂì°‰ª?°®Ôºâ‰?Ë≥áÊ†º?Ç\n‰∫å„ÄÅÈÅ∏?âÂ?ÁΩ∑Â?Â∏∏Â??Ü‰??ÅÂâØ?Ü‰??∑„ÄÅÁ?‰∫ãÈï∑?Ç\n‰∏â„ÄÅË≠∞Ê±∫Á?‰∫ã„ÄÅÂ∏∏?ôÁ?‰∫ãÂ??ØÁ?‰∫ãÈï∑?ÅÁ?‰∫ãÈï∑‰πãËæ≠?∑„ÄÇ\n?õ„ÄÅË??çÂ∑•‰Ωú‰∫∫?°„ÄÇ\n‰∫î„ÄÅÊì¨Ë®ÇÂπ¥Â∫¶Â∑•‰ΩúË??´„ÄÅÂ†±?äÂ??êÁ??ÅÊ±∫ÁÆó„ÄÇ\n?≠„ÄÅÂÖ∂‰ªñÊ??∑Ë?‰∫ãÈ??? },
      { id: "Á¨¨‰??Å‰?Ê¢?, content: "Â∏∏Â?????†‰?‰∏çËÉΩ?∑Ë??∑Â??ÇÔ??âÊ?ÂÆöÁõ£‰∫?‰∫∫‰ª£?Ü‰?ÔºåÊú™?áÂ??ñ‰??ΩÊ?ÂÆöÊ?ÔºåÁî±???‰∫íÊé®1‰∫∫‰ª£?Ü‰??Ç\n????É‰∏ªÂ∏≠Ô?Â∏∏Â????ÔºâÂá∫Áº∫Ê?ÔºåÊ????ãÊ??ßË??∏‰??? },
      { id: "Á¨¨‰??Å‰?Ê¢?, content: "????É‰??∑Ê?Â¶Ç‰?Ôºö\n‰∏Ä?ÅÁõ£ÂØüÁ?‰∫ãÊ?Â∑•‰?‰πãÂü∑Ë°å„ÄÇ\n‰∫å„ÄÅÂØ©?∏Âπ¥Â∫¶Ê±∫ÁÆó„ÄÇ\n‰∏â„ÄÅÈÅ∏?âÂ?ÁΩ∑Â?Â∏∏Â?????Ç\n?õ„ÄÅË≠∞Ê±∫Áõ£‰∫ãÂ?Â∏∏Â????‰πãËæ≠?∑„ÄÇ\n‰∫î„ÄÅÂÖ∂‰ªñÊ????‰∫ãÈ??? },
      { id: "Á¨¨‰??Å‰?Ê¢?, content: "?Ü‰??ÅÁõ£‰∫ãÂ??∫ÁÑ°Áµ¶ËÅ∑Ôºå‰ªª?ü‰?Âπ¥Ô???Å∏ÂæóÈÄ?ªª?ÇÁ?‰∫ãÈï∑‰πãÈÄ?ªªÔºå‰ª•1Ê¨°ÁÇ∫?ê„ÄÇÁ?‰∫ã„ÄÅÁõ£‰∫ã‰?‰ªªÊ??™Âè¨?ãÊú¨Â±ÜÁ¨¨1Ê¨°Á?‰∫ãÊ?‰πãÊó•Ëµ∑Ë?ÁÆó„Ä? },
      { id: "Á¨¨‰??ÅÂ?Ê¢?, content: "?Ü‰??ÅÁõ£‰∫ãÊ?‰∏ãÂ??Ö‰?‰πã‰??ÖÔ??âÂç≥Ëß?ªªÔºö\n‰∏Ä?ÅÂñ™Â§±Ê??°Ô??ÉÂì°‰ª?°®ÔºâË??ºËÄÖ„ÄÇ\n‰∫å„ÄÅÂ??ÖËæ≠?∑Á??Ü‰??ÉÊ?????ÉÊ±∫Ë≠∞ÈÄöÈ??Ö„ÄÇ\n‰∏â„ÄÅË¢´ÁΩ∑Â??ñÊí§?çËÄÖ„ÄÇ\n?õ„ÄÅÂ??úÊ??ïÂ??üÈ??æ‰ªª?ü‰??Ü‰?‰∏Ä?Ö„Ä? },
      { id: "Á¨¨‰??Å‰?Ê¢?, content: "?¨Ê?ÁΩÆÁ??∏Èï∑1‰∫∫Ô??øÁ?‰∫ãÈï∑‰πãÂëΩ?ïÁ??¨Ê?‰∫ãÂ?ÔºåÂÖ∂‰ªñÂ∑•‰Ωú‰∫∫?°Ëã•Âπ≤‰∫∫ÔºåÁî±?Ü‰??∑Ê??çÁ??Ü‰??ÉÈÄöÈ?ÂæåË??ç‰??Ç\n?çÈ?Â∑•‰?‰∫∫Âì°‰∏çÂ??±Á?‰∫ã„ÄÅÁõ£‰∫ãÊ?‰ªª„ÄÇÂ∑•‰Ωú‰∫∫?°Ê?Ë≤¨Â??ÜÂ±§Ë≤†Ë≤¨‰∫ãÈ??±Á?‰∫ãÊ??¶Â?‰πã„Ä? },
      { id: "Á¨¨‰??ÅÂÖ≠Ê¢?, content: "?¨Ê?ÂæóË®≠?ÑÁ®ÆÂßîÂì°?É„ÄÅÂ?ÁµÑÊ??∂‰??ßÈÉ®‰ΩúÊ•≠ÁµÑÁ?ÔºåÂÖ∂ÁµÑÁ?Á∞°Â?Á∂ìÁ?‰∫ãÊ??öÈ?ÂæåÊñΩË°åÔ?ËÆäÊõ¥?Ç‰∫¶?å„Ä? },
      { id: "Á¨¨‰??Å‰?Ê¢?, content: "?¨Ê?ÂæóÁî±?Ü‰??ÉË?Ë´ãÂ?Ë≠ΩÁ?‰∫ãÈï∑?ÅÂ?Ë≠ΩÁ?‰∫ã„ÄÅÈ°ß?èËã•Âπ≤‰∫∫ÔºåÂÖ∂?òÊ??áÁ?‰∫ã„ÄÅÁõ£‰∫ã‰?‰ªªÊ??å„Ä? }
    ]
  },
  {
    chapter: "Á¨¨Â?Á´†„ÄÄ?ÉË≠∞",
    articles: [
      { id: "Á¨¨‰??ÅÂÖ´Ê¢?, content: "?ÉÂì°Â§ßÊ??ÜÂ??üÊ?Ë≠∞Ë??®Ê??ÉË≠∞2Á®ÆÔ??±Á?‰∫ãÈï∑?¨È?‰πãÔ??¨È??ÇÈô§Á∑äÊÄ•‰??Ö‰??®Ê??ÉË≠∞Â§ñÔ??âÊñº15?•Â??öÁü•?®È??âÂá∫Â∏≠‰∫∫?°„ÄÇ\nÂÆöÊ??ÉË≠∞ÊØèÂπ¥?¨È?1Ê¨°Ô??®Ê??ÉË≠∞?ºÁ?‰∫ãÊ?Ë™çÁÇ∫ÂøÖË?ÔºåÊ?Á∂ìÊ??°‰??Ü‰?‰∏Ä‰ª•‰?‰πãË?Ê±ÇÔ??ñÁõ£‰∫ãÊ??ΩË??¨È??ÇÂè¨?ã‰??Ç\n?¨Ê?Ëæ¶Á?Ê≥ï‰∫∫?ªË?ÂæåÔ??®Ê??ÉË≠∞Á∂ìÊ??°Â??Ü‰?‰∏Ä‰ª•‰?‰πãË?Ê±ÇÂè¨?ã‰??Ç\n?ÉÂì°Â§ßÊ?Âæó‰ª•Ë¶ñË??ÉË≠∞?ñÂÖ∂‰ªñÁ?‰∏≠Â§Æ‰∏ªÁÆ°Ê©üÈ??¨Â?‰πãÊñπÂºèÂè¨?Ü‰?ÔºåÁ∞Ω?∞Â?Ë°®Ê±∫?πÂ??áÈ??àÈõªÂ≠êÂ?Ë®≠Â??üËÉΩËæ¶Á??Ç‰?Ê∂âÂ??∏Ë??ÅË??∏„ÄÅÁΩ∑?ç‰??ÖÔ??â‰ª•ÂØ¶È??ÜÊ??πÂ?Ëæ¶Á??? },
      { id: "Á¨¨‰??Å‰?Ê¢?, content: "?ÉÂì°‰∏çËÉΩË¶™Ëá™?∫Â∏≠?ÉÂì°Â§ßÊ??ÇÔ?Âæó‰ª•?∏Èù¢ÂßîË??∂‰??ÉÂì°‰ª??ÔºåÊ?1?ÉÂì°‰ª•‰ª£??‰∫∫ÁÇ∫?ê„Ä? },
      { id: "Á¨¨‰??ÅÊ?", content: "?ÉÂì°Â§ßÊ?‰πãÊ±∫Ë≠∞Ô?‰ª•Ê??°È??äÊï∏‰πãÂá∫Â∏≠Ô??∫Â∏≠‰∫∫Êï∏?éÂ??∏Ê?ËºÉÂ??∏‰??åÊ?Ë°å‰??Ç‰?‰∏ãÂ?‰∫ãÈ?‰πãÊ±∫Ë≠∞‰ª•?∫Â∏≠‰∫∫Êï∏‰∏âÂ?‰πã‰?‰ª•‰??åÊ?Ë°å‰?Ôºö\n‰∏Ä?ÅÁ?Á®ã‰?Ë®ÇÂ??áË??¥„ÄÇ\n‰∫å„ÄÅÊ??°‰??§Â??Ç\n‰∏â„ÄÅÁ?‰∫ã„ÄÅÁõ£‰∫ã‰?ÁΩ∑Â??Ç\n?õ„ÄÅË≤°?¢‰??ïÂ??Ç\n‰∫î„ÄÅÊú¨?É‰?Ëß?ï£?Ç\n?≠„ÄÅÂÖ∂‰ªñË??ÉÂì°Ê¨äÂà©Áæ©Â??âÈ?‰πãÈ?Â§ß‰??Ö„ÄÇ\n?¨Ê?Ëæ¶Á?Ê≥ï‰∫∫?ªË?ÂæåÔ?Á´†Á?‰πãË??¥‰ª•?∫Â∏≠‰∫∫Êï∏?õÂ?‰πã‰?‰ª•‰?‰πãÂ??èÊ??®È??ÉÂì°‰∏âÂ?‰πã‰?‰ª•‰??∏Èù¢‰πãÂ??èË?‰πãÔ??¨Ê?‰πãËß£???ÂæóÈö®?Ç‰ª•?®È??ÉÂì°‰∏âÂ?‰πã‰?‰ª•‰?‰πãÂèØÊ±∫Ëß£????? },
      { id: "Á¨¨‰??Å‰?Ê¢?, content: "?Ü‰??ÉÊ?6?ãÊ??≥Â??âË??ÉË≠∞1Ê¨°Ô?????ÉÊ?6?ãÊ??≥Â??âÊ?Ë≠?Ê¨°Ô?Â∏∏Â??Ü‰??ÉÊ?6?ãÊ??¨È?‰∏ÄÊ¨°Ô?ÂøÖË??ÇÂ??¨È??ØÂ∏≠?ÉË≠∞?ñËá®?ÇÊ?Ë≠∞„ÄÇ\n?çÈ??ÉË≠∞?¨È??ÇÈô§?®Ê??ÉË≠∞Â§ñÔ??âÊñº7?•Â??öÁü•?®È??âÂá∫Â∏≠‰∫∫?°Ô??ÉË≠∞‰πãÊ±∫Ë≠∞Ô??Ñ‰ª•?Ü‰??ÅÁõ£‰∫ãÈ??äÊï∏‰πãÂá∫Â∏≠Ô??∫Â∏≠‰∫∫Êï∏ËºÉÂ??∏‰??åÊ?Ë°å‰??? },
      { id: "Á¨¨‰??Å‰?Ê¢?, content: "?Ü‰??âÂá∫Â∏≠Á?‰∫ãÊ?Ë≠∞Ô?????âÂá∫Â∏≠Áõ£‰∫ãÊ?Ë≠∞Ô??Ü‰??É„ÄÅÁõ£‰∫ãÊ?‰∏çÂ?ÂßîË??∫Â∏≠?Ç\n?Ü‰??ÉË≠∞?ÅÁõ£‰∫ãÊ?Ë≠∞Â??ÜÁõ£‰∫ãËÅØÂ∏≠Ê?Ë≠∞Â?‰ª•Ë?Ë®äÊ?Ë≠∞Ê??∂‰?Á∂ì‰∏≠Â§Æ‰∏ªÁÆ°Ê??úÂÖ¨?ä‰??πÂ??¨È?‰πãÔ??Ü‰??ÅÁõ£‰∫ãÂá∫Â∏≠Â?Ë¶ñË??ÉË≠∞ÔºåË??∫Ë¶™?™Âá∫Â∏≠Ô?Á∞ΩÂà∞?äË°®Ê±∫ÊñπÂºèÂ??çÂ??ªÂ??ñË®≠?ôÂ??ΩËæ¶?Ü„ÄÇ‰?Ê∂âÂ??∏Ë??ÅË??∏„ÄÅÁΩ∑?ç‰??ÖÔ??â‰ª•ÂØ¶È??ÜÊ??πÂ?Ëæ¶Á??Ç\n?Ü‰??ÅÁõ£‰∫ãÈÄ??2Ê¨°ÁÑ°?ÖÁº∫Â∏≠Á?‰∫ãÊ??ÅÁõ£‰∫ãÊ??ÖÔ?Ë¶ñÂ?Ëæ≠ËÅ∑?? }
    ]
  },
  {
    chapter: "Á¨¨‰?Á´†„ÄÄÁ∂ìË≤ª?äÊ?Ë®?,
    articles: [
      { id: "Á¨¨‰??Å‰?Ê¢?, content: "?¨Ê?Á∂ìË≤ª‰æÜÊ?Â¶Ç‰?Ôºö\n‰∏Ä?ÅÂÖ•?ÉË≤ªÔºöÂÖ•?ÉË≤ª?∞Ëá∫Âπ?000?ÉÔ??ºÊ??°ÂÖ•?ÉÊ?Áπ≥Á??Ç\n‰∫å„ÄÅÂ∏∏Âπ¥Ê?Ë≤ªÔ??∞Ëá∫Âπ?000?É„ÄÇ\n‰∏â„ÄÅ‰?Ê•≠Ë≤ª?Ç\n?õ„ÄÅÊ??°Ê?Ê¨æ„ÄÇ\n‰∫î„ÄÅÂ?Ë®óÊî∂?ä„ÄÇ\n?≠„ÄÅÂü∫?ëÂ??∂Â≠≥?Ø„ÄÇ\n‰∏É„ÄÅÂÖ∂‰ªñÊ??©Â??∂ÂÖ•?? },
      { id: "Á¨¨‰??ÅÂ?Ê¢?, content: "?¨Ê??ÉË?Âπ¥Â∫¶‰ª•Ê?Âπ¥ÁÇ∫Ê∫ñÔ??™Ê?Âπ????•Ëµ∑??2??1?•Ê≠¢?Ç\n?¨Ê??ºÊ?Ë®àÂπ¥Â∫¶È?ÂßãÂ?2?ãÊ??±Á?‰∫ãÊ?Á∑®ÈÄ†Âπ¥Â∫¶Â∑•‰ΩúË??´Â??∂ÊîØ?êÁ?Ë°®„ÄÅÂì°Â∑•Â??áË°®ÔºåÊ??ÉÂì°Â§ßÊ??öÈ?ÔºàÊ??°Â§ß?ÉÂ??ÖÊú™?ΩÂ??üÂè¨?ãËÄÖÔ??àÊ??ÜÁõ£‰∫ãËÅØÂ∏≠Ê?Ë≠∞ÈÄöÈ?ÔºâÔ??ºÊ?Ë®àÂπ¥Â∫¶È?ÂßãÂ??±‰∏ªÁÆ°Ê??úÊ†∏?ô„ÄÇ‰∏¶?ºÊ?Ë®àÂπ¥Â∫¶Á?‰∫ÜÂ?2?ãÊ??ßÁî±?Ü‰??ÉÁ∑®?†Âπ¥Â∫¶Â∑•‰ΩúÂ†±?äÂ??ÉË??±Â?ÔºåÈÄÅÁõ£‰∫ãÊ?ÂØ©Ê†∏ÂæåÔ??†ÂÖ∑ÂØ©Ê†∏?èË??∏ÈÄÅÈ??Ü‰??ÉÔ?????∂Âπ¥Â∫¶Â∑•‰ΩúË??´Â??∂ÊîØ?êÁ?Ë°®Ô??êÁ??ÉÂì°Â§ßÊ??öÈ?ÂæåÂ†±‰∏ªÁÆ°Ê©üÈ??ôÊü•?ÇÊ??°Â§ß?ÉÂ??ÖÊú™?ΩÂ??üÂè¨?ãÔ??ØÂ?Á∂ìÊú¨?ÉÁ?‰∫ãÊ??äÁõ£‰∫ãÊ??ñÁ?????ØÂ∏≠?ÉË≠∞?öÈ?Ôºå‰?ÂæåÊ??±Â§ß?ÉËøΩË™çÂ?ÔºåÂ??±Ë?‰∏ªÁÆ°Ê©üÈ??ôÊü•?? },
      { id: "Á¨¨‰??Å‰?Ê¢?, content: "?¨Ê??ºËß£???ÔºåÂâ©È§òË≤°?¢Ê≠∏Â±¨Ê??®Âú∞‰πãÂú∞?πËá™Ê≤ªÂ?È´îÊ?‰∏ªÁÆ°Ê©üÈ??áÂ?‰πãÊ??úÂ?È´îÊ??â„ÄÇ\n?¨Ê?Ëß?ï£‰πãÊ?ÁÆó‰∫∫?∏‰ªª?äË≤°?¢Ê?ÁÆóÁ?Â∫èÔ?Â¶ÇÊú¨?ÉÁ?Ê≥ï‰∫∫?ªË?ÔºåÈô§Ê≥ïÂ??¶Ê?Ë¶èÂ?Â§ñÔ?‰æùÊ?Ê≥ï‰?Ë¶èÂ?Ëæ¶Á?ÔºõÂ??¨Ê??™Á?Ê≥ï‰∫∫?ªË?ÔºåÊ?‰æùÊ??°Ô??ÉÂì°‰ª?°®ÔºâÂ§ß?ÉÊ±∫Ë≠∞Ëæ¶?ÜÔ??ÉÂì°ÔºàÊ??°‰ª£Ë°®Ô?Â§ßÊ??°Ê?Ê±∫Ë≠∞?ÇÔ??±Á?‰∫ãÈï∑?î‰ªªÊ∏ÖÁ?‰∫∫Ô?‰∏¶Ê??®Ê?Ê≥ïÊ?ÁÆó‰?Ë¶èÂ??? }
    ]
  },
  {
    chapter: "Á¨¨ÂÖ≠Á´†„ÄÄ?ÑÂ?",
    articles: [
      { id: "Á¨¨‰??ÅÂÖ≠Ê¢?, content: "?¨Á?Á®ãÊú™Ë¶èÂ?‰∫ãÈ?ÔºåÊ?‰æùÊ??úÊ?‰ª§Ë?ÂÆöËæ¶?Ü„Ä? },
      { id: "Á¨¨‰??Å‰?Ê¢?, content: "?¨Á?Á®ãÁ??ÉÂì°ÔºàÊ??°‰ª£Ë°®Ô?Â§ßÊ??öÈ?ÂæåÊñΩË°åÔ?‰∏¶Â†±‰∏ªÁÆ°Ê©üÈ??∏Â?ÔºåË??¥Ê?‰∫¶Â??? },
      { id: "Á¨¨‰??ÅÂÖ´Ê¢?, content: "?¨Á?Á®ãÁ??¨Ê?114Âπ?7??1?•Á¨¨‰∏ÄÂ±ÜÁ¨¨‰∏ÄÊ¨°Ê??°Â§ß?ÉÈÄöÈ??Ç\n114/04/07 ?≥Ë?ÁµÑÊ??®Â??ßÁ§æ?ÉÂ?È´??Ü‰?Á±åÁ??Ç\n114/08/12 ?≥Ë??êÁ??®Â??ßÁ§æ?ÉÂ?È´?ÁµêÊ??? }
    ]
  }
];

interface GCSDAPProps { onContactOpen?: () => void; }
export default function GCSDA({ onContactOpen }: GCSDAPProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F8F7F4] pt-24 pb-20 selection:bg-gold-500 selection:text-black font-sans leading-relaxed">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* HERO SECTION - INSTITUTIONAL PURITY */}
        <section className="relative flex flex-col items-center justify-center min-h-[95vh] py-8 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full"
          >
            {/* The primary logo already contains the slogan; do not repeat textual slogans in the UI layer. */}
            <div className="w-full max-w-[650px] flex justify-center mb-16 px-4">
              <img 
                src="/images/gcsda-logo.png" 
                alt="‰∏≠ËèØ‰ºÅÊ•≠Á≠ñÁï•Ê∞∏Á??ºÂ?Â≠∏Ê?" 
                className="w-full h-auto object-contain mix-blend-screen drop-shadow-[0_0_80px_rgba(212,175,55,0.15)]" 
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col items-center gap-10 text-center max-w-4xl px-4">
              <div className="h-px w-32 bg-gold-600/30"></div>
              
              <button
                onClick={() => onContactOpen && onContactOpen()}
                className="block transform hover:-translate-y-1 transition-all duration-700 active:scale-95 bg-transparent border-none p-0 cursor-pointer"
                style={{display:"inline-block"}}
              >
                <div style={{
                  position: "relative",
                  padding: "0",
                  display: "inline-block",
                }}>
                  {/* Ê≠êÂ??ëËâ≤Ê≤πÁï´Ê°?*/}
                  <div style={{
                    position: "relative",
                    border: "none",
                    background: "transparent",
                    padding: "6px",
                  }}>
                    {/* Â§ñÊ?Ë£ùÈ£æ SVG */}
                    <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:2,pointerEvents:"none"}}>
                      {/* ‰∏ªÊ?Á∑?*/}
                      <rect x="4" y="4" width="592" height="192" fill="none" stroke="#C9A84C" strokeWidth="3"/>
                      <rect x="12" y="12" width="576" height="176" fill="none" stroke="#8B6914" strokeWidth="1.5"/>
                      <rect x="16" y="16" width="568" height="168" fill="none" stroke="#E5C56A" strokeWidth="1"/>
                      {/* ?õË??±È£æ */}
                      <path d="M4,4 Q30,4 30,30" fill="none" stroke="#C9A84C" strokeWidth="3"/>
                      <path d="M596,4 Q570,4 570,30" fill="none" stroke="#C9A84C" strokeWidth="3"/>
                      <path d="M4,196 Q30,196 30,170" fill="none" stroke="#C9A84C" strokeWidth="3"/>
                      <path d="M596,196 Q570,196 570,170" fill="none" stroke="#C9A84C" strokeWidth="3"/>
                      {/* ËßíËêΩË£ùÈ£æ?ìÈ? */}
                      <circle cx="4" cy="4" r="4" fill="#C9A84C"/>
                      <circle cx="596" cy="4" r="4" fill="#C9A84C"/>
                      <circle cx="4" cy="196" r="4" fill="#C9A84C"/>
                      <circle cx="596" cy="196" r="4" fill="#C9A84C"/>
                      {/* ‰∏ä‰?‰∏≠Â§ÆË£ùÈ£æ */}
                      <path d="M270,4 Q300,14 330,4" fill="none" stroke="#C9A84C" strokeWidth="2"/>
                      <path d="M270,196 Q300,186 330,196" fill="none" stroke="#C9A84C" strokeWidth="2"/>
                      <circle cx="300" cy="4" r="3" fill="#C9A84C"/>
                      <circle cx="300" cy="196" r="3" fill="#C9A84C"/>
                      {/* Â∑¶Âè≥‰∏≠Â§ÆË£ùÈ£æ */}
                      <path d="M4,80 Q14,100 4,120" fill="none" stroke="#C9A84C" strokeWidth="2"/>
                      <path d="M596,80 Q586,100 596,120" fill="none" stroke="#C9A84C" strokeWidth="2"/>
                    </svg>
                    {/* Ê≤πÁï´Â∏ÉÂ??≤ÂÖßÂÆπÂ? */}
                    <div style={{
                      background: "linear-gradient(135deg, #2a1f08 0%, #3d2d0a 25%, #4a3510 50%, #3a2808 75%, #2a1f08 100%)",
                      padding: "40px 80px",
                      position: "relative",
                      zIndex: 1,
                      minWidth: "400px",
                      textAlign: "center",
                    }}>
                      <div style={{
                        color: "#C9A84C",
                        fontSize: "clamp(18px, 2.5vw, 28px)",
                        fontWeight: "900",
                        letterSpacing: "0.4em",
                        fontFamily: "serif",
                        textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 0 20px rgba(201,168,76,0.3)",
                        whiteSpace: "nowrap",
                      }}>
                        Ë´???Á¥?Á≠???Ê≤?????Â∏???                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        </section>

        {/* GOVERNANCE AUTHORITY - THE CANONICAL INSTITUTIONAL ZONE */}
        <section className="relative py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <span className="text-gold-500 font-bold tracking-[0.5em] text-xs uppercase opacity-60">Governance Collective</span>
              <h2 className="text-4xl md:text-6xl font-display font-light text-gold-metallic tracking-widest">Á≠ñÁï•Ê≤ªÁ??ØÂ∏≠??/h2>
              <p className="text-stone-300 text-xl md:text-2xl font-serif font-light tracking-[0.2em] mt-8">Â≠∏Ê?Á≠ñÁï•?∫Â∫´ ¬∑ ?µÂ?Ê¶ÆË≠Ω?òÈ??êÂì°</p>
              <div className="h-px w-16 bg-gold-900/40 mx-auto mt-10"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start px-4">
              <p className="text-stone-100 text-2xl md:text-5xl font-serif font-light leading-[1.6] text-justify relative pl-16 border-l-4 border-gold-500">
                ?åÂ?Â∞éÁî¢Â≠∏ÂÖ±Ê≤ªÔ??∫‰?Ê•≠Âª∫Á´ã‰??ØË??¥Á?Á∂ìÁ??≤Ê??Ç„Ä?              </p>
              <p className="text-stone-400 text-lg md:text-2xl font-serif font-light leading-[1.7] text-justify italic opacity-80 pl-8 border-l border-white/10">
                ?¢Â≠∏?îËÅØ?àÊô∫Â∫´Â?Ê≥®Êñº?§Êñ∑Ê±∫Á??Ñ„ÄåÂ?Á∑ö„ÄçËÄåÈ??å‰??ê„ÄçÔ??∫Ë??úÁ??üÂª∫Á´ãÊ?Âæå‰??ìÂ??ßÈ??ßÊ??∂„ÄÇÊ??ëÁ?‰ªªÂ??ØÂ?Ê∑±Â?Ê¥ûË?ËΩâÂ??∫ÂÖ∑?ôÂº∑?∂Â??ÑÊ≤ª?ÜÊ≠£?∏„Ä?              </p>
            </div>

            {/* THE DEFINITIVE THINK TANK ALLIANCE */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="relative pt-12 flex flex-col items-center"
            >
              <div className="relative w-full lg:w-[95%] border border-white/5 shadow-[0_100px_200px_rgba(0,0,0,0.8)] overflow-hidden bg-black/40 backdrop-blur-sm">
                 <div className="relative group overflow-hidden">
                   {/* Refined Group Photo with Masking for perfect dark-theme integration */}
                   <img 
                     src="/images/group-001.png" 
                     alt="‰∏≠ËèØ‰ºÅÊ•≠Á≠ñÁï•Ê∞∏Á??ºÂ?Â≠∏Ê? Á≠ñÁï•?∫Â∫´?®È?Â∞àÂÆ∂?êÂì°" 
                     className="w-full h-auto drop-shadow-2xl transition-all duration-[20s] ease-out scale-[1.01] group-hover:scale-[1.03] opacity-95 group-hover:opacity-100"
                     style={{ 
                       imageRendering: 'auto' as any,
                       maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                       WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                       maskComposite: 'intersect',
                       WebkitMaskComposite: 'source-in'
                     }}
                     referrerPolicy="no-referrer"
                   />
                   
                   {/* Artistic Vignette Overlay to help blend white background with dark theme */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none mix-blend-multiply opacity-60"></div>
                 </div>
                 
                 {/* OVERLAY PANEL - IDENTIFYING THE EXPERTS */}
                 <div className="relative lg:absolute lg:bottom-0 lg:left-0 lg:right-0 z-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 border-t border-white/5 lg:border-t-0">
                    {[
                      { role: "?Ü‰?", name: "?óÊ???, title: "ÂæãÂ∏´" },
                      { role: "?Ü‰?", name: "?óÊîø??, title: "ÂæãÂ∏´" },
                      { role: "?Ü‰?", name: "?âÁ???, title: "ÂæãÂ∏´" },
                      { role: "?µÊ??Ü‰???, name: "?äÈ?Áø?, title: "?öÂ£´", highlight: true },
                      { role: "?Ü‰?", name: "È´òÊ?Ë¨?, title: "ÂæãÂ∏´" },
                      { role: "ÁßòÊõ∏??, name: "ÈªÉÊ?Á¶?, title: "?ÉË?Â∏? },
                      { role: "?Ü‰?", name: "Ë¨ùÁ???, title: "ÂæãÂ∏´" },
                      { role: "?Ü‰?", name: "Ë≥¥Á•∫??, title: "ÂæãÂ∏´" }
                    ].map((expert, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className={`py-4 md:py-8 px-2 text-center flex flex-col justify-center gap-1 transition-all duration-1000 backdrop-blur-[2px] border-r border-white/5 last:border-r-0 ${
                          expert.highlight 
                            ? 'bg-gold-500/40 text-white shadow-[inset_0_0_20px_rgba(212,175,55,0.2)] z-20 border-x border-white/20' 
                            : 'bg-black/80 text-stone-200 hover:bg-black/60'
                        }`}
                      >
                        <span className={`text-[8px] md:text-[10px] font-black tracking-[0.3em] uppercase block mb-1 ${expert.highlight ? 'text-white' : 'text-gold-500/60'}`}>{expert.role}</span>
                        <h4 className={`text-lg md:text-2xl font-display font-medium tracking-tighter whitespace-nowrap ${expert.highlight ? 'font-black scale-110 drop-shadow-lg' : ''}`}>{expert.name}</h4>
                        <p className={`text-[8px] md:text-[10px] font-bold tracking-widest uppercase leading-tight ${expert.highlight ? 'text-white/90' : 'text-stone-500'}`}>{expert.title}</p>
                      </motion.div>
                    ))}
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* DIRECTORY SECTION */}
        <section className="py-32 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-baseline gap-6 mb-24 max-w-4xl">
            <Users className="h-10 w-10 text-gold-500/30" />
            <h2 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight">Á¨¨‰?Â±ÜÁ?????ÉÂ???/h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-20">
            {directory.map((member, i) => (
              <div key={i} className="group relative border-l border-white/10 pl-8 hover:border-gold-500 transition-all duration-700">
                <span className="text-gold-500/40 font-black text-xs tracking-widest uppercase block mb-4">{member.role}</span>
                <h4 className="text-3xl font-display font-light text-white group-hover:text-gold-metallic transition-colors mb-2">
                  {member.name}
                </h4>
                <p className="text-stone-500 text-base font-serif italic">
                  {member.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* BYLAWS ACCORDION */}
        <section className="py-32 border-t border-white/5">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 gap-6">
            <Scroll className="h-12 w-12 text-gold-500/10" />
            <h2 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight">Â≠∏Ê?Á´†Á??òË?</h2>
          </div>

          <div className="max-w-5xl mx-auto bg-black border border-white/5 p-4 md:p-12">
            <Accordion className="space-y-4">
              {charter.map((chapter, i) => (
                <AccordionItem key={i} value={`chapter-${i}`} className="border-white/5 px-6 pb-4">
                  <AccordionTrigger className="text-xl md:text-2xl font-display font-light text-gold-metallic/60 hover:text-white transition-all py-8">
                    {chapter.chapter}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-12 pt-8 pb-12">
                    {chapter.articles.map((art, idx) => (
                      <div key={idx} className="space-y-4 pl-8 border-l border-gold-900/10">
                        <span className="text-gold-500 font-bold text-xs tracking-widest uppercase">{art.id}</span>
                        <p className="text-stone-300 font-serif font-light text-lg md:text-xl leading-relaxed text-justify">
                          {art.content}
                        </p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL REGISTRATION CTA */}
        <section className="py-40 border-t border-white/5 text-center bg-black -mx-6 md:-mx-24 px-6 md:px-24">
          <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">

            {/* Ê≤πÁï´Ê°Ü‰∏ªÈ´?- ?†ÂÖ•Ê≤ªÁ??üÊ???*/}
            <div style={{ position: "relative", display: "inline-block", width: "100%", maxWidth: "900px" }}>
              {/* Â§ñÂ±§?ëËâ≤?∞ÂΩ±?âÊ? */}
              <div style={{
                position: "absolute", inset: "-12px",
                background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)",
                pointerEvents: "none", zIndex: 0,
              }}/>
              {/* SVG Â∑¥Ê??ãÁï´Ê°?*/}
              <svg viewBox="0 0 900 320" xmlns="http://www.w3.org/2000/svg"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }}>
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E8D48A"/>
                    <stop offset="30%" stopColor="#C9A84C"/>
                    <stop offset="60%" stopColor="#A07828"/>
                    <stop offset="100%" stopColor="#D4AF50"/>
                  </linearGradient>
                </defs>
                {/* ?ÄÂ§ñÊ? */}
                <rect x="3" y="3" width="894" height="314" fill="none" stroke="url(#goldGrad)" strokeWidth="4"/>
                {/* ?ßÊ?Á∑?*/}
                <rect x="14" y="14" width="872" height="292" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeDasharray="4,2"/>
                <rect x="20" y="20" width="860" height="280" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.5"/>
                {/* ?õË?Â∑¥Ê??ãË?È£?*/}
                <path d="M3,3 Q50,3 50,50 Q30,30 3,30 Z" fill="#C9A84C" opacity="0.6"/>
                <path d="M897,3 Q850,3 850,50 Q870,30 897,30 Z" fill="#C9A84C" opacity="0.6"/>
                <path d="M3,317 Q50,317 50,270 Q30,290 3,290 Z" fill="#C9A84C" opacity="0.6"/>
                <path d="M897,317 Q850,317 850,270 Q870,290 897,290 Z" fill="#C9A84C" opacity="0.6"/>
                {/* ËßíËêΩ?ìÈ? */}
                <circle cx="3" cy="3" r="5" fill="#E8D48A"/>
                <circle cx="897" cy="3" r="5" fill="#E8D48A"/>
                <circle cx="3" cy="317" r="5" fill="#E8D48A"/>
                <circle cx="897" cy="317" r="5" fill="#E8D48A"/>
                {/* ‰∏äÊñπ‰∏≠Â§ÆË£ùÈ£æ */}
                <path d="M400,3 Q430,0 450,10 Q470,0 500,3" fill="none" stroke="#C9A84C" strokeWidth="2"/>
                <path d="M420,3 Q450,16 480,3" fill="none" stroke="#E8D48A" strokeWidth="1.5"/>
                <circle cx="450" cy="3" r="5" fill="#C9A84C"/>
                <circle cx="420" cy="3" r="3" fill="#C9A84C" opacity="0.6"/>
                <circle cx="480" cy="3" r="3" fill="#C9A84C" opacity="0.6"/>
                {/* ‰∏ãÊñπ‰∏≠Â§ÆË£ùÈ£æ */}
                <path d="M400,317 Q430,320 450,310 Q470,320 500,317" fill="none" stroke="#C9A84C" strokeWidth="2"/>
                <path d="M420,317 Q450,304 480,317" fill="none" stroke="#E8D48A" strokeWidth="1.5"/>
                <circle cx="450" cy="317" r="5" fill="#C9A84C"/>
                <circle cx="420" cy="317" r="3" fill="#C9A84C" opacity="0.6"/>
                <circle cx="480" cy="317" r="3" fill="#C9A84C" opacity="0.6"/>
                {/* Â∑¶ÂÅ¥‰∏≠Â§ÆË£ùÈ£æ */}
                <path d="M3,130 Q0,155 10,160 Q0,165 3,190" fill="none" stroke="#C9A84C" strokeWidth="2"/>
                <circle cx="3" cy="160" r="5" fill="#C9A84C"/>
                {/* ?≥ÂÅ¥‰∏≠Â§ÆË£ùÈ£æ */}
                <path d="M897,130 Q900,155 890,160 Q900,165 897,190" fill="none" stroke="#C9A84C" strokeWidth="2"/>
                <circle cx="897" cy="160" r="5" fill="#C9A84C"/>
                {/* ?ßÂ±§?õË?Â∞èË?È£?*/}
                <rect x="14" y="14" width="20" height="20" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
                <rect x="866" y="14" width="20" height="20" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
                <rect x="14" y="286" width="20" height="20" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
                <rect x="866" y="286" width="20" height="20" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
              </svg>
              {/* ?´Ê??ßÂÆπ - Ê≤πÁï´Â∏ÉÂ???*/}
              <div style={{
                background: "linear-gradient(135deg, #1a1205 0%, #2e2008 30%, #3d2d0a 50%, #2a1c06 75%, #1a1205 100%)",
                padding: "clamp(40px, 6vw, 70px) clamp(40px, 8vw, 100px)",
                position: "relative", zIndex: 1,
                boxShadow: "inset 0 0 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(201,168,76,0.05)",
              }}>
                {/* Ë£ùÈ£æ?ÜÈ?Á∑?*/}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "clamp(20px,3vw,36px)" }}>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #C9A84C60)" }}/>
                  <div style={{ width: "6px", height: "6px", background: "#C9A84C", transform: "rotate(45deg)" }}/>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #C9A84C60)" }}/>
                </div>
                {/* ‰∏ªÊ?È°?*/}
                <h2 style={{
                  color: "#E8D48A",
                  fontSize: "clamp(32px, 6vw, 72px)",
                  fontWeight: "300",
                  letterSpacing: "0.15em",
                  fontFamily: "serif",
                  textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.2)",
                  margin: "0 0 clamp(16px,2vw,24px) 0",
                  lineHeight: 1.2,
                }}>
                  ?†ÂÖ•<span style={{ color: "#C9A84C" }}>Ê≤ªÁ??üÊ???/span>
                </h2>
                {/* ?ØÊ?È°?*/}
                <p style={{
                  color: "#a08050",
                  fontSize: "clamp(14px, 1.8vw, 22px)",
                  fontFamily: "serif",
                  fontStyle: "italic",
                  letterSpacing: "0.08em",
                  fontWeight: "300",
                  margin: "0",
                  lineHeight: 1.7,
                  textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                }}>
                  ?áÁî¢Â≠∏Á≤æ?±ÂÖ±?åÂ?‰ΩúÔ?ÂºïÂ?‰ºÅÊ•≠Âª∫Á?Á©©ÂÅ•?ÑÁ??•Ê≤ª?ÜÂü∫?§„Ä?                </p>
                {/* Ë£ùÈ£æ?ÜÈ?Á∑?*/}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "clamp(20px,3vw,36px)" }}>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #C9A84C60)" }}/>
                  <div style={{ width: "6px", height: "6px", background: "#C9A84C", transform: "rotate(45deg)" }}/>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #C9A84C60)" }}/>
                </div>
              </div>
            </div>

            {/* ?≥Ë??•Ê?Ë´ÆË©¢?âÈ? - Ê≤πÁï´Ê°ÜÈ¢®?ºÔ???? Line ÂÆòÊñπ */}
            <a
              href="https://line.me/R/ti/p/@387nbnjs"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "inline-block", position: "relative" }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                {/* ?âÈ? SVG Ê°?*/}
                <svg viewBox="0 0 480 90" xmlns="http://www.w3.org/2000/svg"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }}>
                  <rect x="2" y="2" width="476" height="86" fill="none" stroke="#C9A84C" strokeWidth="2.5"/>
                  <rect x="8" y="8" width="464" height="74" fill="none" stroke="#8B6914" strokeWidth="1" strokeDasharray="3,3"/>
                  {/* ?õË? */}
                  <circle cx="2" cy="2" r="3" fill="#C9A84C"/>
                  <circle cx="478" cy="2" r="3" fill="#C9A84C"/>
                  <circle cx="2" cy="88" r="3" fill="#C9A84C"/>
                  <circle cx="478" cy="88" r="3" fill="#C9A84C"/>
                  {/* Â∑¶Âè≥Ë£ùÈ£æ */}
                  <path d="M2,35 Q12,45 2,55" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
                  <path d="M478,35 Q468,45 478,55" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
                  {/* ‰∏ä‰?‰∏≠Â§ÆÂ∞èËè±ÂΩ?*/}
                  <path d="M235,2 L240,8 L245,2 L240,-4 Z" fill="#C9A84C" opacity="0.7"/>
                  <path d="M235,88 L240,82 L245,88 L240,94 Z" fill="#C9A84C" opacity="0.7"/>
                </svg>
                {/* ?âÈ??ßÂÆπ */}
                <div style={{
                  background: "linear-gradient(135deg, #2e2008 0%, #4a3510 50%, #2e2008 100%)",
                  padding: "28px 80px",
                  position: "relative", zIndex: 1,
                  transition: "all 0.4s ease",
                  minWidth: "400px",
                  textAlign: "center",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "linear-gradient(135deg, #4a3510 0%, #6b4f1a 50%, #4a3510 100%)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "linear-gradient(135deg, #2e2008 0%, #4a3510 50%, #2e2008 100%)"; }}
                >
                  <span style={{
                    color: "#E8D48A",
                    fontSize: "clamp(16px, 2vw, 22px)",
                    fontFamily: "serif",
                    fontWeight: "700",
                    letterSpacing: "0.5em",
                    textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 0 20px rgba(201,168,76,0.3)",
                  }}>
                    ????Ë´?????Ë´?Ë©???                  </span>
                </div>
              </div>
            </a>

          </div>
        </section>
      </div>
    </div>
  );
}
