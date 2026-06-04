import re

f = open('src/pages/About.tsx', encoding='utf-8')
c = f.read()
f.close()

# 修改2：Card元件左側金條改為隨內容等高（h-full -> h-auto）
c = c.replace(
    '"absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"',
    '"absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"'
)

# 修改3：四個PILLAR卡片加金色左條（加relative + 插入左條div）
old_pillar = '<div key={idx} className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg overflow-hidden">'
new_pillar = '<div key={idx} className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg overflow-hidden relative"><div className="absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"></div>'
c = c.replace(old_pillar, new_pillar)

# 修改1：六個slide的引言文字（mt-auto的italic段落）改為金色圓角線框
# Slide 0
old_s0 = '<p className="text-[#e6c84c] font-serif italic tracking-wide flex-shrink-0 mt-auto" style={{ fontSize: \'clamp(10px, 0.9vw, 13px)\' }}>'
new_s0 = '<p className="text-[#e6c84c] font-serif italic tracking-wide flex-shrink-0 mt-auto border border-[#e6c84c]/50 rounded-lg px-3 py-2" style={{ fontSize: \'clamp(10px, 0.9vw, 13px)\' }}>'
c = c.replace(old_s0, new_s0)

# Slide 3
old_s3 = '<p className="text-[#e6c84c]/90 font-serif italic flex-shrink-0 mt-auto" style={{ fontSize: \'clamp(10px, 0.9vw, 13px)\' }}>'
new_s3 = '<p className="text-[#e6c84c]/90 font-serif italic flex-shrink-0 mt-auto border border-[#e6c84c]/50 rounded-lg px-3 py-2" style={{ fontSize: \'clamp(10px, 0.9vw, 13px)\' }}>'
c = c.replace(old_s3, new_s3)

open('src/pages/About.tsx', 'w', encoding='utf-8').write(c)
print('完成')
