import type { ReactNode } from "react";
import STTPageHero from "../components/STTPageHero";
import { useNavigate } from "react-router-dom";
import { books, masterPapers, phdPapers } from "../data/mockData";

function LibraryShell({ children }: { children: ReactNode }) { return <div className="lib-root">{children}</div>; }

export function BooksCanonical(){
  const navigate=useNavigate();
  return <LibraryShell><STTPageHero visual="books" eyebrow="BOOKS · STT PRESS" title="著作正典" lead="這裡只呈現已存在於 STT 出版資料中的著作。書籍頁的責任是說清楚作品本身，而不是以黑金商城、過度權威宣稱或 AI 系統話術取代內容。" />
    <section className="lib-body"><div className="lib-wrap"><div className="lib-list">{books.map((book,index)=><article className="lib-row" key={book.id}><div className="lib-index">{String(index+1).padStart(2,"0")}</div><div><h2>{book.title}</h2><div className="lib-meta">{book.author}｜{book.publisher}</div>{book.id==="b1"&&<p>《內在法遵》在本網站被定位為內在治理思想正典，處理責任、邊界、節制與判斷主權；不與企業契約、付款、稽核等企業法遵制度混為同一概念。</p>}</div><div className="lib-actions">{book.id==="b1"&&<button onClick={()=>navigate('/books/internal-compliance')}>正典頁</button>}{book.previewUrl&&<a href={book.previewUrl} target="_blank" rel="noreferrer">試閱／預覽 ↗</a>}</div></article>)}</div><div className="lib-note"><h2>出版資料仍需逐本校對。</h2><p>正式上線前，書名、版本、年份、售價、出版狀態與外部預覽連結必須再對照最新出版母檔；網站不得自行修正或補寫不存在的出版資訊。</p></div></div></section></LibraryShell>;
}

export function InternalComplianceCanonical(){
  const navigate=useNavigate(); const book=books.find((b)=>b.id==='b1');
  return <LibraryShell><STTPageHero visual="internalCompliance" eyebrow="INTERNAL COMPLIANCE · CANON" title="內在法遵" lead="《內在法遵》不是企業稽核手冊，也不是契約審查流程。它處理的是一個人在權力、利益、壓力與不確定性中，如何保留自己的責任、邊界與判斷主權。" />
    <section className="lib-body"><div className="lib-wrap"><div className="lib-columns"><article className="lib-panel"><h2>思想定位</h2><p>能力可以外包，資訊可以由工具協助，專業可以由不同角色進場；但最後的授權、否決與責任不能因此消失。內在法遵關心的是外部規則進入一個人的判斷後，如何成為不可輕易交換的內在秩序。</p><ul><li>責任不因工具或專業分工而消失</li><li>判斷先有邊界，再追求效率</li><li>不可承擔的錯誤不以短期利益交換</li><li>制度最終要能回到人的自我治理</li></ul></article><article className="lib-panel"><h2>與企業法遵的界線</h2><p>企業法遵與契約治理處理授權、契約、交易、付款、證據、稽核與法律風險；《內在法遵》處理的是內在治理。兩者可以相互支援，但不得在網站上使用同一頁面或同一套概念互相取代。</p><div className="lib-actions" style={{marginTop:22}}><button onClick={()=>navigate('/domains/compliance-contract')}>企業法遵與契約治理 →</button></div></article></div>{book?.previewUrl&&<div className="lib-note"><h2>正式版本</h2><p>{book.title}</p><div className="lib-actions" style={{marginTop:20}}><a href={book.previewUrl} target="_blank" rel="noreferrer">開啟預覽 ↗</a></div></div>}<button className="lib-back" onClick={()=>navigate('/books')}>← 回到著作正典</button></div></section></LibraryShell>;
}

export function ResearchCanonical(){
  const papers=[...phdPapers,...masterPapers];
  return <LibraryShell><STTPageHero visual="research" eyebrow="RESEARCH & THESIS" title="研究與論文" lead="研究頁只承載可追溯到原始論文的研究資料。這一階段先保留論文題名、類型與正式來源入口；研究問題、方法、樣本、統計結果與結論必須逐篇回到原始論文後再上線。" />
    <section className="lib-body"><div className="lib-wrap"><div className="lib-list">{papers.map((paper,index)=><article className="lib-row" key={paper.id}><div className="lib-index">{String(index+1).padStart(2,"0")}</div><div><h2>{paper.title}</h2><div className="lib-meta">{paper.type}</div><p>{paper.enTitle}</p></div><div className="lib-actions">{paper.previewUrl&&<a href={paper.previewUrl} target="_blank" rel="noreferrer">論文預覽 ↗</a>}</div></article>)}</div><div className="lib-note"><h2>不把後來的策略推論冒充既有實證。</h2><p>目前舊研究頁中若存在「研究已證明某治理模型」「量化某策略效果」等延伸文案，正式版一律不沿用，除非原始論文可直接支持該敘述。</p></div></div></section></LibraryShell>;
}
