f = open('src/pages/About.tsx', encoding='utf-8')
c = f.read()
f.close()

# 修改1：Card元件左條改為inline style隨內容，不用absolute
old_card_bar = '      <div className="absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"></div>\n      <span'
new_card_bar = '      <span'
c = c.replace(old_card_bar, new_card_bar)

old_card_div = '    <div className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg relative overflow-hidden">'
new_card_div = '    <div className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/60 border-t-0 border-r-0 border-b-0 hover:border-l-[#e6c84c] transition-all rounded-lg overflow-hidden" style={{borderTopColor:"transparent",borderRightColor:"transparent",borderBottomColor:"transparent"}}>'
c = c.replace(old_card_div, new_card_div)

# 修改2：Slide 2底部引言加金色線框
old_s2 = '                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: \'clamp(8px, 1vh, 14px)\', fontSize: \'clamp(10px, 0.9vw, 13px)\' }}>\n                        <p className="text-[#dbd7cf] font-light italic leading-relaxed">'
new_s2 = '                      <div className="border border-[#e6c84c]/50 rounded-lg flex-shrink-0" style={{ padding: \'clamp(8px, 1vh, 14px)\', fontSize: \'clamp(10px, 0.9vw, 13px)\' }}>\n                        <p className="text-[#e6c84c] font-serif italic leading-relaxed">'
c = c.replace(old_s2, new_s2)

# 修改3：四個PILLAR卡片加金色左條（用border-l方式）
old_pillar = '                          <div key={idx} className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg overflow-hidden relative"><div className="absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"></div>'
new_pillar = '                          <div key={idx} className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/60 border-t border-t-white/[0.03] border-r border-r-white/[0.03] border-b border-b-white/[0.03] hover:border-l-[#e6c84c] transition-all rounded-lg overflow-hidden">'
c = c.replace(old_pillar, new_pillar)

# 備用：若上面的PILLAR替換沒有匹配到，嘗試原始版本
old_pillar2 = '                          <div key={idx} className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg overflow-hidden">'
new_pillar2 = '                          <div key={idx} className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/60 border-t border-t-white/[0.03] border-r border-r-white/[0.03] border-b border-b-white/[0.03] hover:border-l-[#e6c84c] transition-all rounded-lg overflow-hidden">'
c = c.replace(old_pillar2, new_pillar2)

open('src/pages/About.tsx', 'w', encoding='utf-8').write(c)
print('完成')
