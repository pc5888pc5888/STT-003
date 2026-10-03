import {Link} from "react-router-dom";
import GovernedHero from "../components/GovernedHero";
export default function Success(){return <div><GovernedHero kicker="ORDER INFORMATION" title="付款與訂單確認" lead="付款與訂單狀態，請以實際交易平台的通知與訂單紀錄為準。開啟本頁不代表付款已成功。"/><section className="cis-utility"><p>透過 STT Press 或外部通路取得數位內容時，請依該交易頁面的付款、交付與聯絡資訊辦理。</p><Link to="/books">回到著作正典 →</Link></section></div>}
