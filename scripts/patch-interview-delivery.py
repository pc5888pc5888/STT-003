"""CR-INTERVIEW-20261020-02. Owner-authorized functional repair, exact source guarded."""
from pathlib import Path
import hashlib,json,re
OLD='https://shimmering-longma-509244.netlify.app/'
CANON='https://stt-003.vercel.app/humanistic-interview/'
def gitsha(data):return hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
def patch_page(s):
 if 'stt-delivery-version' in s:return s
 before_media=re.findall(r'data:image/[^\s\'"<>]+|src="assets/stations/[^"]+"',s)
 before_questions=re.findall(r'<section class="screen question-screen".*?</section>',s,re.S)
 assert len(before_questions)==20
 s=re.sub(r'<!-- This site is hosted on Netlify.*?-->\s*','',s,count=1,flags=re.S)
 s=re.sub(r'<meta name="(?:hosting-provider|netlify-deploy)"[^>]*>\s*','',s)
 s=s.replace('<head>','<head><link rel="canonical" href="'+CANON+'"><meta name="stt-delivery-version" content="20261020.2">',1)
 s=s.replace('id="netlify-form"','id="interview-form"')
 old='<div class="bottom-tools"><button class="tool-btn" id="save-now" title="立即保存" type="button">✓</button><button class="tool-btn" id="export-json" title="匯出 JSON" type="button">⇩</button></div>'
 new='<div class="bottom-tools delivery-tools" aria-label="回答工具"><button class="tool-btn" id="toolbar-copy" type="button">複製</button><button class="tool-btn" id="save-now" type="button">儲存</button><button class="tool-btn" id="toolbar-download" type="button">下載</button><button class="tool-btn" id="toolbar-submit" type="button">送出</button></div>'
 assert s.count(old)==1;s=s.replace(old,new)
 marker='<div class="backup-actions">';assert s.count(marker)==1
 s=s.replace(marker,marker+'\n<button class="ghost" id="save-draft-final" type="button">儲存可續填草稿</button>',1)
 welcome=s.index('<section class="screen landing active"');end=s.index('</section>',welcome);close=s.rfind('</div>',welcome,end)
 insert='<div class="soft-note"><p>換題時會暫存於本分頁。關閉分頁前，請用「儲存」留下可續填的草稿檔；暫存不是永久備份。</p><button class="ghost" id="read-draft" type="button">讀取草稿檔</button><input class="hidden" id="draft-file" type="file" accept=".json,application/json" aria-label="從此裝置讀取草稿"><p id="draft-import-status" role="status" aria-live="polite"></p></div>'
 s=s[:close]+insert+s[close:]
 style='''<style id="delivery-controls-style">
.bottom-tools.delivery-tools{left:50%!important;right:auto!important;bottom:max(12px,env(safe-area-inset-bottom))!important;transform:translateX(-50%);display:flex;gap:6px!important;max-width:calc(100vw - 20px);padding:6px;border-radius:18px;background:var(--paper)}
.bottom-tools.delivery-tools .tool-btn{width:auto!important;min-width:58px!important;min-height:44px!important;height:44px!important;border-radius:12px;font-size:14px;padding:0 10px;white-space:nowrap}
.screen{padding-bottom:110px!important}
@media(max-width:700px){.nav-row{bottom:80px!important}}
#backup-preview[hidden]{display:none!important}
</style>'''
 s=s.replace('</head>',style+'</head>',1)
 target=[m for m in re.finditer(r'<script\b[^>]*>(.*?)</script>',s,re.S|re.I) if "const storageKey='stt20q.v02.answers'" in m.group(1)]
 assert len(target)==1
 m=target[0];s=s[:m.start()]+'<script src="/humanistic-interview/interview.js?v=20261020.2"></script>'+s[m.end():]
 s=s.replace('<main>','<main><noscript><p>此訪談需要 JavaScript。請在一般瀏覽器開啟正式網址並啟用 JavaScript，尚未填寫或送出任何回答。</p></noscript>',1)
 assert re.findall(r'data:image/[^\s\'"<>]+|src="assets/stations/[^"]+"',s)==before_media
 assert re.findall(r'<section class="screen question-screen".*?</section>',s,re.S)==before_questions
 assert '文字送出後，本網站不保留您輸入的文字。' in s
 return s
def patch_config(c):
 c['rewrites']=[r for r in c.get('rewrites',[]) if r['source']!='/humanistic-20q']
 routes=['/humanistic-20q','/humanistic-20q/','/humanistic-interview/index.html','/humanistic-interview']
 c['redirects']=[r for r in c.get('redirects',[]) if r['source'] not in routes]+[{'source':p,'destination':'/humanistic-interview/','permanent':True}for p in routes]
 c['headers']=[r for r in c.get('headers',[]) if r['source']!='/humanistic-interview/:path*']+[{'source':'/humanistic-interview/:path*','headers':[{'key':'Cache-Control','value':'no-store'},{'key':'Referrer-Policy','value':'same-origin'},{'key':'X-Content-Type-Options','value':'nosniff'}]}]
 return c
def main():
 out=Path('qa-interview');out.mkdir(exist_ok=True)
 p=Path('public/humanistic-interview/index.html');raw=p.read_bytes()
 if 'stt-delivery-version' not in raw.decode():assert gitsha(raw)=='abb06850a55ad0ac617ece96b52a4d80a2109614','Interview source changed; review before patch'
 assert Path('public/humanistic-interview/interview.js').is_file();p.write_text(patch_page(raw.decode()))
 changes=[]
 for f in Path('src').rglob('*'):
  if not f.is_file() or f.suffix not in ('.ts','.tsx','.js','.jsx'):continue
  original=f.read_text();count=original.count(OLD)
  if count:
   changed=original.replace(OLD,'/humanistic-interview/')
   assert len(original)-len(changed)==count*(len(OLD)-len('/humanistic-interview/'))
   f.write_text(changed);changes.append(str(f));print('INTERVIEW_URL_ONLY',str(f),count)
  assert OLD not in f.read_text()
 (out/'changed-source-files.txt').write_text(''.join(f+'\n' for f in changes))
 config=Path('vercel.json');config.write_text(json.dumps(patch_config(json.loads(config.read_text())),ensure_ascii=False,indent=2)+'\n')
 assert not Path('.github/workflows/mirror-humanistic-interview.yml').exists()
 print('PATCH_APPLIED: canonical interview, exact old-URL replacements, Vercel aliases. Approved20 questions/art/privacy preserved.')
if __name__=='__main__':main()
