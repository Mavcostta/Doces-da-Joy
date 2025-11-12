from PIL import Image
import os

# Abrir a imagem
img = Image.open('logo.jpeg').convert('RGBA')
datas = img.getdata()

new_data = []
# Threshold para considerar como branco (ajuste se necessário)
threshold = 240

for item in datas:
    # Verificar se o pixel é branco ou quase branco
    if item[0] > threshold and item[1] > threshold and item[2] > threshold:
        # Tornar transparente
        new_data.append((255, 255, 255, 0))
    else:
        # Manter o pixel
        new_data.append(item)

img.putdata(new_data)
img.save('logo.png', 'PNG')
print('✅ Logo convertida com sucesso para logo.png com fundo transparente!')
