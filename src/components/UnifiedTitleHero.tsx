import type { ReactNode } from "react";
import GovernedHero from "./GovernedHero";
type Props={kicker:string;title:string;subtitle?:string;lead?:string;image?:string;imagePosition?:string;imageFit?:"cover"|"contain";titleLines?:readonly string[];id?:string;children?:ReactNode};
export default function UnifiedTitleHero(props:Props){return <GovernedHero {...props}/>;}
