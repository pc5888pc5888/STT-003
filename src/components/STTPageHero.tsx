import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import GovernedHero from "./GovernedHero";
import {sttVisual,type STTVisualKey} from "../sttVisuals";
type Props={visual:STTVisualKey;eyebrow:string;title:string;titleLines?:readonly string[];lead?:string;actions?:{text:string;to:string;primary?:boolean}[];primary?:boolean;children?:ReactNode;id?:string};
export default function STTPageHero({visual,eyebrow,title,lead,actions=[],children,id}:Props){return <GovernedHero kicker={eyebrow} title={title} lead={lead} image={sttVisual(visual)} id={id}>{actions.map(a=><Link key={a.to} to={a.to} className={a.primary?"cis-primary":undefined}>{a.text} →</Link>)}{children}</GovernedHero>;}
