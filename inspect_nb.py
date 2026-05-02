import json

with open(r'c:\Users\asus\Downloads\DFDS.ipynb', encoding='utf-8') as f:
    d = json.load(f)

with open('notebook_dump.txt', 'w', encoding='utf-8') as out:
    for i, c in enumerate(d['cells']):
        out.write(f"Cell {i} ({c.get('cell_type')}):\n")
        out.write(''.join(c.get('source', [])))
        out.write('\n' + '='*40 + '\n\n')
