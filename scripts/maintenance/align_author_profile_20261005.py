"""One-time owner-approved author alignment; only named source/docs files may change.
Authority: CR-20261005-AUTHOR-PROFILE-ALIGNMENT, owner instruction 請按上述說明執行.
No credentials, image changes, external biography enrichment, or forced pushes.
"""
from pathlib import Path
import json
import re
import subprocess
import sys

PROFILE = {
    "version": "2026-10-05",
    "englishName": "CHUANG CHUN HSIANG Ph.D.",
    "chineseName": "莊鈞翔 博士",
    "positionsHeading": "Current Position 現任職務",
    "publicationsHeading": "Publications | 著　作",
    "positions": [
        "STT Governance 策略智庫 創辦人暨執行長",
        "中華企業策略永續發展學會 創會理事長",
        "臺灣厝買賣文化發展協會 永續長",
        "逢甲大學商學院 兼任助理教授",
        "M傳媒 法律策略專欄 特約評論",
    ],
    "publications": [
        "內在法遵 Internal Compliance｜為你的內心，打造一座不可侵犯的至聖所",
        "內在法遵 AI Governance｜為你的判斷，守住最後不可外包的決定權",
        "內在法遵 Family Governance ｜為你的家族，留下比財富更能穿越世代的秩序",
        "2026 永續家族治理實務錄",
        "臺灣企業接班人的佈局規劃與傳承家族價值",
        "企業策略導入公司治理法遵精神｜以外部法律顧問團隊協助為例",
        "顧客關係管理對服務永續之探討｜以 A 國際法律事務所為例",
        "不同世代企業家人格特質、創新能力對企業經營績效之影響｜以領導風格為中介變數",
    ],
}

COMPONENT = '''import profile from "../data/authorProfile.json";
import "../styles/author-profile.css";

// The same owner-approved registry and component are published to both independent sites.
export default function AuthorProfile({ showName = false }: { showName?: boolean }) {
  const Heading = showName ? "h3" : "h2";
  return <div id="author-profile" className="author-profile" data-author-profile={profile.version}>
    {showName && <header className="author-profile__identity">
      <p lang="en" className="author-profile__english">{profile.englishName}</p>
      <h2 className="author-profile__name">{profile.chineseName}</h2>
    </header>}
    <section aria-labelledby="author-positions-title">
      <Heading id="author-positions-title" className="author-profile__heading">{profile.positionsHeading}</Heading>
      <ul className="author-profile__positions" data-author-positions>
        {profile.positions.map(position => <li key={position}>{position}</li>)}
      </ul>
    </section>
    <section aria-labelledby="author-publications-title">
      <Heading id="author-publications-title" className="author-profile__heading">{profile.publicationsHeading}</Heading>
      <ul className="author-profile__publications" data-author-publications>
        {profile.publications.map(title => <li key={title}>{title}</li>)}
      </ul>
    </section>
  </div>;
}
'''

CSS = '''/* CR-20261005-AUTHOR-PROFILE-ALIGNMENT: scoped, text-only; no existing asset/style replacement. */
.author-profile { max-width: 100%; min-width: 0; color: inherit; scroll-margin-top: 120px; }
.author-profile section + section { margin-top: 44px; }
.author-profile .author-profile__identity { margin-bottom: 40px; }
.author-profile .author-profile__english { margin: 0 0 12px; font-size: clamp(15px, 1.6vw, 20px); line-height: 1.7; letter-spacing: .06em; overflow-wrap: anywhere; }
.author-profile .author-profile__name { margin: 0; font-family: "Noto Serif TC", serif; font-weight: 500; font-size: clamp(30px, 4vw, 46px); line-height: 1.5; }
.author-profile .author-profile__heading { margin: 0 0 22px; font-family: "Noto Serif TC", serif; font-weight: 500; font-size: clamp(20px, 2.1vw, 27px); line-height: 1.6; letter-spacing: .01em; }
.author-profile ul { list-style: none; margin: 0; padding: 0; }
.author-profile li { margin: 0; font-size: 16px; line-height: 1.95; overflow-wrap: anywhere; word-break: normal; }
.author-profile__positions li + li { margin-top: 10px; }
.author-profile__publications li { padding: 16px 0; border-bottom: 1px solid #ded4c4; }
.author-profile__publications li:first-child { padding-top: 0; }
@media (max-width: 600px) {
  .author-profile section + section { margin-top: 34px; }
  .author-profile li { font-size: 16px; line-height: 1.9; }
}
'''

CR = '''# CR-20261005-AUTHOR-PROFILE-ALIGNMENT

Status: APPROVED / IMPLEMENTATION IN PROGRESS. Not a whole-site BUILD_LOCK.
Date: 2026-10-05, Asia/Taipei.
Owner: 莊鈞翔博士.
Approval: explicit follow-up instruction「請按上述說明執行」to the previously supplied author-profile alignment proposal.
Source: owner-supplied book-author introduction in the project conversation; not an independent verification of all books or appointments.

## Approved source of truth
`src/data/authorProfile.json` is the exact shared author-copy registry: English name, Chinese name, five current positions and eight publication titles in owner-supplied order. Both sites use byte-identical copies; `src/components/AuthorProfile.tsx` renders them without reclassification or abbreviation.

## Page specification / copy registry amendment
This approved amendment supersedes only ERIC-01 author identity, ERIC-05 publication list and ERIC-06 current-position list in PAGE-ERIC / the 2026-09-17 Master Build Specification / copy_registry. Unrelated LOCKED copy remains in force.
ERIC-01: Eric Chuang, Ph.D. / 莊鈞翔博士 -> englishName / chineseName from the shared registry, English displayed before Chinese.
ERIC-05: former publication overview -> all eight owner-supplied titles, preserving subtitles and sequence; no invented ISBN, dates, categories, covers or links.
ERIC-06: former academic/institutional list -> exactly the five supplied current positions and sequence. No claim that omitted historical roles are false.
STT target: existing /eric-chuang; retain URL, portrait, governance-role section, research section and third-party publication disclosure.
GCSDA target: /governance#author-profile; add the common introduction under the founding-chair context, without changing other directors, council members, charter, fees, navigation or routes.
STT Person metadata in src/seo.ts and vite.config.ts uses the same name, alternateName and primary position. Existing page titles/descriptions retain their approved governance-role description.
HOME-07 governance responsibility is deliberately unchanged: formal job titles and governance responsibilities are distinct.

## Boundaries and exclusions
No new routes, services, subscriptions, database, public AI, social-channel work or image generation.
STT and GCSDA remain separate entities. M傳媒 remains an external third-party source.
Existing /books redirects, publication-card images and reading links are unchanged.
The author list uses the supplied「2026 永續家族治理實務錄」. The separate existing publication-card title「2026 永續家族治理實務實錄」and cover remain outside this author-profile amendment; their discrepancy is not represented as resolved.

## Release and verification
STT source: main, official origin https://stt-003.vercel.app.
GCSDA source: gcsda-release-20261005, official origin https://gcsda-governance.vercel.app.
Only the association alias may be assigned to the new GCSDA build; never promote GCSDA over the STT production project.
Required: both builds, exact five/eight item arrays, displayed names, no stale English author identity, desktop/tablet/mobile rendering, preserved image paths and existing /books routing. Deployment READY alone does not constitute content acceptance.
Local-build and live-URL evidence is retained separately under the author-profile QA artifact. Runtime approval must use actual public URLs.
'''


def run(*args, cwd=None):
    return subprocess.check_output(args, cwd=cwd, text=True).strip()


def replace_once(text, old, new, label):
    if text.count(old) != 1:
        raise RuntimeError(f"{label}: expected exactly one target, got {text.count(old)}")
    return text.replace(old, new, 1)


def patch(root: Path, site: str):
    changed = []
    def write(path, content):
        target = root / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
        changed.append(path)
    write("src/data/authorProfile.json", json.dumps(PROFILE, ensure_ascii=False, indent=2) + "\n")
    write("src/components/AuthorProfile.tsx", COMPONENT)
    write("src/styles/author-profile.css", CSS)
    write("docs/change-requests/CR-20261005-AUTHOR-PROFILE-ALIGNMENT.md", CR)
    if site == "stt":
        path = "src/pages/InstitutionalPages.tsx"
        source = (root / path).read_text()
        source = replace_once(source, 'const M_MEDIA_URL', 'import AuthorProfile from "../components/AuthorProfile";\nimport AUTHOR_PROFILE from "../data/authorProfile.json";\n\nconst M_MEDIA_URL', path)
        start = source.index("export function EricPage(){")
        end = source.index("export function InstitutionsPage(){", start)
        block = source[start:end]
        block = replace_once(block, 'title="莊鈞翔博士 Eric Chuang, Ph.D."', 'title={AUTHOR_PROFILE.chineseName}', "author title")
        block = replace_once(block, '      titleLines={["莊鈞翔博士", "Eric Chuang, Ph.D."]}\n', '', "legacy title lines")
        block = replace_once(block, 'subtitle="STT Governance 創辦人｜治理總控者｜制度設計與重大決策判讀。"', 'subtitle={AUTHOR_PROFILE.positions[0]}', "author position")
        block = replace_once(block, '    <Section kicker="GOVERNANCE ROLE"', '    <section className="stt-inst-section"><div className="stt-inst-shell"><AuthorProfile /></div></section>\n\n    <Section kicker="GOVERNANCE ROLE"', "profile placement")
        block, count = re.subn(r'\n    <Section kicker="PUBLICATION".*?</Section>\s*\n    <Section kicker="ACADEMIC & INSTITUTIONAL ROLES".*?</Section>', '', block, count=1, flags=re.S)
        if count != 1:
            raise RuntimeError("Expected old author publication and role blocks not found")
        write(path, source[:start] + block + source[end:])

        path = "src/data/pagePresentation.ts"
        source = (root / path).read_text()
        source = 'import AUTHOR_PROFILE from "./authorProfile.json";\n' + source
        source = replace_once(source, 'byline?: string;', 'byline?: string; bylineBefore?: boolean;', "presentation type")
        start = source.index('  "/eric-chuang": {')
        end = source.index('  "/institutions": {', start)
        block = source[start:end]
        block = replace_once(block, '"莊鈞翔博士"', 'AUTHOR_PROFILE.chineseName', "presentation name")
        block = replace_once(block, '"莊鈞翔博士 Eric Chuang, Ph.D."', '`${AUTHOR_PROFILE.englishName} ${AUTHOR_PROFILE.chineseName}`', "original identity")
        block = replace_once(block, '"byline": "Eric Chuang, Ph.D.",', '"byline": AUTHOR_PROFILE.englishName,\n    "bylineBefore": true,', "presentation English")
        write(path, source[:start] + block + source[end:])

        path = "src/components/GovernedHero.tsx"
        source = (root / path).read_text()
        source = replace_once(source, '          <h1 id={titleId}', '          {page?.byline && page.bylineBefore && <p className="cis-byline" lang="en">{page.byline}</p>}\n          <h1 id={titleId}', "English before Chinese")
        source = replace_once(source, '{page?.byline&&<p className="cis-byline"', '{page?.byline&&!page.bylineBefore&&<p className="cis-byline"', "prevent duplicate English")
        write(path, source)
        for path, import_path in [("src/seo.ts", "./data/authorProfile.json"), ("vite.config.ts", "./src/data/authorProfile.json")]:
            source = (root / path).read_text()
            source = f'import AUTHOR_PROFILE from "{import_path}";\n' + source
            source = replace_once(source, 'name: "莊鈞翔博士 Eric Chuang, Ph.D.",', 'name: AUTHOR_PROFILE.chineseName,\n      alternateName: AUTHOR_PROFILE.englishName,', path + " Person name")
            source = replace_once(source, 'jobTitle: "STT Governance 創辦人｜治理總控者｜制度設計與重大決策判讀",', 'jobTitle: AUTHOR_PROFILE.positions[0],', path + " Person position")
            write(path, source)
    elif site == "gcsda":
        path = "src/GCSDAStandaloneV3.tsx"
        source = (root / path).read_text()
        source = 'import AuthorProfile from "./components/AuthorProfile";\n' + source
        start = source.index("function Governance(){")
        end = source.index("function Council(){", start)
        block = source[start:end]
        block = replace_once(block, '</section></div>}', '</section><section className="g4-section"><div className="g4-wrap"><p className="g4-kicker">創會理事長</p><AuthorProfile showName /></div></section></div>}', "GCSDA existing Governance placement")
        write(path, source[:start] + block + source[end:])
    else:
        raise ValueError("Unsupported site")
    if any(p.startswith("public/") or p in {"src/App.tsx", "vercel.json"} for p in changed):
        raise RuntimeError("Out-of-scope assets or routes")
    (root / ".author-profile-changed.json").write_text(json.dumps(changed))
    print(json.dumps({"site": site, "changed": changed}, ensure_ascii=False))


def main():
    if len(sys.argv) != 3:
        raise SystemExit("Usage: align_author_profile_20261005.py ROOT stt|gcsda")
    patch(Path(sys.argv[1]).resolve(), sys.argv[2])


if __name__ == "__main__":
    main()
