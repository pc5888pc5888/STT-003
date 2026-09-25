import {Link} from "react-router-dom";
import GovernedHero from "./GovernedHero";
export default function NotFound(){return <><GovernedHero kicker="404" title="找不到這個頁面。" lead="這個網址不在目前的 STT Governance 正式路由中。"/><section className="cis-utility"><Link to="/">回到首頁 →</Link><Link to="/start">開始治理判讀 →</Link></section></>}
