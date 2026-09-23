import pathlib, subprocess, sys, requests, json, hashlib
subprocess.check_call([sys.executable,'-m','pip','-q','install','pymupdf'])
import fitz
out=pathlib.Path(__file__).parent/'evidence'
out.mkdir(parents=True,exist_ok=True)
urls={'cbc_rules_pdf':'https://www.cbc.gov.tw/tw/dl-227611-e262ea5d31724ec696a8e2fa75a94600.html','presale_pdf':'https://www.ey.gov.tw/File/17FD66C7511F7121?A=C'}
report={}
for k,u in urls.items():
    try:
        r=requests.get(u,timeout=45);r.raise_for_status();assert r.content.startswith(b'%PDF')
        (out/(k+'.pdf')).write_bytes(r.content)
        d=fitz.open(stream=r.content,filetype='pdf')
        (out/(k+'.txt')).write_text('\n'.join('[PAGE %s]\n%s'%(i+1,p.get_text()) for i,p in enumerate(d)),encoding='utf-8')
        report[k]={'url':r.url,'sha256':hashlib.sha256(r.content).hexdigest(),'pages':len(d)}
        for i in (range(min(3,len(d))) if k=='cbc_rules_pdf' else [0,6,7]):
            d[i].get_pixmap(matrix=fitz.Matrix(1,1)).save(str(out/(k+'-'+str(i)+'.png')))
    except Exception as e:report[k]={'url':u,'error':str(e)}
(out/'pdf_report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
