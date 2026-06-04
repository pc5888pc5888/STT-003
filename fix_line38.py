with open('src/pages/About.tsx', 'rb') as f:
    lines = f.readlines()

print(f"第38行原內容: {lines[37]}")

lines[37] = b'      alert("\xe8\xab\x8b\xe5\xa1\xab\xe5\xaf\xab\xe4\xbc\x81\xe6\xa5\xad\xe5\x90\x8d\xe7\xa8\xb1\xe3\x80\x81\xe5\xa7\x93\xe5\x90\x8d\xe3\x80\x81Email \xe5\x8f\x8a\xe9\x9b\xbb\xe8\xa9\xb1");\r\n'

print(f"第38行新內容: {lines[37]}")

with open('src/pages/About.tsx', 'wb') as f:
    f.writelines(lines)

print("完成")
