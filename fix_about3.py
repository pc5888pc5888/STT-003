f = open('src/pages/About.tsx', encoding='utf-8')
lines = f.readlines()
f.close()

# 修改第384行：PILLAR卡片加金色左條
for i, line in enumerate(lines):
    # PILLAR卡片 (第384行附近)
    if 'className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg overflow-hidden"' in line and 'key={idx}' in line:
        lines[i] = line.replace(
            'className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg overflow-hidden"',
            'className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/70 border border-white/[0.03] hover:border-l-[#e6c84c] transition-all rounded-lg overflow-hidden"'
        )
        print(f"PILLAR卡片修改完成: 第{i+1}行")

    # Card元件左條 (relative + absolute bar)
    if 'className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg relative overflow-hidden"' in line:
        lines[i] = line.replace(
            'className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg relative overflow-hidden"',
            'className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/70 border border-white/[0.03] hover:border-l-[#e6c84c] transition-all rounded-lg overflow-hidden"'
        )
        print(f"Card元件修改完成: 第{i+1}行")

    # 移除Card元件裡多餘的absolute左條div
    if 'className="absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"' in line:
        lines[i] = ''
        print(f"移除absolute左條: 第{i+1}行")

    # Slide 2底部引言加金色線框
    if i == 248 or ('border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0' in line and 'fontSize' in line and 'clamp(10px, 0.9vw, 13px)' in line and 'marginBottom' not in line):
        lines[i] = line.replace(
            'className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0"',
            'className="border border-[#e6c84c]/60 rounded-lg flex-shrink-0"'
        )
        if 'border border-[#e6c84c]/60' in lines[i]:
            print(f"Slide2引言修改完成: 第{i+1}行")

    # Slide 3底部引言加金色線框（mt-auto那行）
    if 'text-[#e6c84c]/90 font-serif italic flex-shrink-0 mt-auto' in line:
        lines[i] = line.replace(
            'className="text-[#e6c84c]/90 font-serif italic flex-shrink-0 mt-auto"',
            'className="text-[#e6c84c] font-serif italic flex-shrink-0 mt-auto border border-[#e6c84c]/60 rounded-lg px-3 py-2"'
        )
        print(f"Slide3引言修改完成: 第{i+1}行")

    # Slide 0底部引言（已有border的確認）
    if 'text-[#e6c84c] font-serif italic tracking-wide flex-shrink-0 mt-auto' in line and 'border' not in line:
        lines[i] = line.replace(
            'className="text-[#e6c84c] font-serif italic tracking-wide flex-shrink-0 mt-auto"',
            'className="text-[#e6c84c] font-serif italic tracking-wide flex-shrink-0 mt-auto border border-[#e6c84c]/60 rounded-lg px-3 py-2"'
        )
        print(f"Slide0引言修改完成: 第{i+1}行")

f = open('src/pages/About.tsx', 'w', encoding='utf-8')
f.writelines(lines)
f.close()
print('全部完成')
