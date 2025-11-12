# Script PowerShell para remover fundo branco da logo
Add-Type -AssemblyName System.Drawing

$imagePath = "logo.jpeg"
$outputPath = "logo.png"

# Carregar a imagem
$bitmap = New-Object System.Drawing.Bitmap($imagePath)

# Criar nova imagem com suporte a transparência
$newBitmap = New-Object System.Drawing.Bitmap($bitmap.Width, $bitmap.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Threshold para considerar branco (0-255)
$threshold = 240

for ($x = 0; $x -lt $bitmap.Width; $x++) {
    for ($y = 0; $y -lt $bitmap.Height; $y++) {
        $pixel = $bitmap.GetPixel($x, $y)
        
        # Se o pixel for branco ou quase branco, tornar transparente
        if ($pixel.R -gt $threshold -and $pixel.G -gt $threshold -and $pixel.B -gt $threshold) {
            $newPixel = [System.Drawing.Color]::FromArgb(0, 255, 255, 255)
        } else {
            $newPixel = $pixel
        }
        
        $newBitmap.SetPixel($x, $y, $newPixel)
    }
}

# Salvar como PNG
$newBitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Limpar
$bitmap.Dispose()
$newBitmap.Dispose()

Write-Host "✅ Logo convertida com sucesso! Arquivo salvo como: $outputPath" -ForegroundColor Green
Write-Host "Atualizando HTML para usar logo.png..." -ForegroundColor Yellow
