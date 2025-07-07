# MD Dermatologia Integrada - Website

Site responsivo e moderno para a MD Dermatologia Integrada, desenvolvido com HTML5, CSS3, JavaScript e Tailwind CSS.

## 🏗️ Estrutura do Projeto

```
md-dermatologia/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos customizados
├── js/
│   └── script.js           # JavaScript principal
├── assets/
│   └── img/                # Imagens do site
├── data/
│   └── config.json         # Configurações e dados
└── README.md              # Este arquivo
```

## 🚀 Como Executar Localmente

### Opção 1: Servidor HTTP Simples (Recomendado)
```bash
# Navegue até a pasta do projeto
cd md-dermatologia

# Instale o servidor HTTP global (apenas uma vez)
npm install -g http-server

# Execute o servidor
http-server -p 8080

# Acesse: http://localhost:8080
```

### Opção 2: Python Server
```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

### Opção 3: Live Server (VS Code)
1. Instale a extensão "Live Server" no VS Code
2. Clique com o botão direito no `index.html`
3. Selecione "Open with Live Server"

## ✏️ Como Editar o Conteúdo

### 📞 Alterar Telefones e WhatsApp

Edite o arquivo `data/config.json`:

```json
{
  "contact": {
    "phone": "(51) 3377-3333",          // ← Altere aqui
    "whatsapp": "(51) 99193-3393",      // ← Altere aqui
    "whatsappLink": "https://wa.me/5551991933393?text=Olá%20gostaria%20de%20agendar%20uma%20consulta"  // ← Altere o número aqui também
  }
}
```

**⚠️ Importante:** Ao alterar o WhatsApp, atualize também o link em `whatsappLink` seguindo o formato:
`https://wa.me/55[DDD][NÚMERO]?text=Sua%20mensagem`

### 🏥 Alterar Informações da Clínica

No arquivo `data/config.json`, seção `clinica`:

```json
{
  "clinica": {
    "descricao": "Seu novo texto da clínica aqui...",  // ← Altere a descrição
    "galeria": [                                        // ← Adicione/remova imagens
      "assets/img/clinic-reception.jpg",
      "assets/img/consultation-room.jpg"
    ]
  }
}
```

### 👨‍⚕️ Gerenciar Equipe Médica

No arquivo `data/config.json`, seção `equipe`:

```json
{
  "equipe": [
    {
      "nome": "Dr. Nome do Médico",
      "especialidade": "Especialidade",
      "crm": "CRM-RS 12345 | RQE 67890",
      "bio": "Biografia do médico...",
      "foto": "assets/img/doctor-portrait-1.webp"  // ← Caminho para a foto
    }
  ]
}
```

**Para adicionar um novo médico:**
1. Copie um bloco existente
2. Altere os dados
3. Adicione a foto na pasta `assets/img/`

### 🏢 Alterar Endereço e Mapa

No arquivo `data/config.json`:

```json
{
  "contact": {
    "address": "Sua nova rua, 123 | Bairro | Cidade | Estado",  // ← Novo endereço
    "mapEmbed": "URL_DO_GOOGLE_MAPS"                           // ← Novo embed do mapa
  }
}
```

**Para obter novo embed do Google Maps:**
1. Acesse [Google Maps](https://maps.google.com)
2. Busque pelo novo endereço
3. Clique em "Compartilhar" → "Incorporar um mapa"
4. Copie o código HTML e extraia a URL do `src="..."`

### 🩺 Alterar Áreas de Atuação

No arquivo `data/config.json`, seção `atuacao`:

```json
{
  "atuacao": {
    "estetica": {
      "titulo": "Dermatologia Estética",
      "descricao": "Descrição dos serviços...",
      "procedimentos": [
        "Procedimento 1",
        "Procedimento 2"
      ]
    }
  }
}
```

## 🖼️ Como Substituir Imagens

### Logo da Clínica
1. Substitua o arquivo `assets/img/logo-placeholder.jpeg`
2. Mantenha o mesmo nome ou atualize as referências no `index.html`
3. Formatos recomendados: JPG, PNG, WebP
4. Tamanho recomendado: 100x100px

### Fotos da Equipe
1. Adicione as fotos em `assets/img/`
2. Nome sugerido: `doctor-nome-sobrenome.jpg`
3. Atualize o caminho no `data/config.json`
4. Tamanho recomendado: 400x400px (formato quadrado)

### Galeria da Clínica
1. Adicione as fotos em `assets/img/`
2. Atualize a lista em `data/config.json` → `clinica.galeria`
3. Tamanho recomendado: 800x600px (paisagem)

### Imagem do Hero
1. Substitua `assets/img/hero-background.jpg`
2. Tamanho recomendado: 1920x1080px
3. Imagem deve ter boa qualidade e relacionada à área médica

## 🌐 Deploy do Site

### GitHub Pages (Gratuito)
1. Faça upload dos arquivos para um repositório GitHub
2. Vá em Settings → Pages
3. Selecione a branch `main` como source
4. Seu site estará em: `https://seuusuario.github.io/nome-do-repositorio`

### Netlify (Gratuito)
1. Acesse [netlify.com](https://netlify.com)
2. Faça o drag and drop da pasta do projeto
3. Seu site estará online em segundos
4. Para atualizações, faça novo upload da pasta

### Vercel (Gratuito)
1. Acesse [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Deploy automático a cada commit

### Hospedagem Tradicional
1. Faça upload de todos os arquivos via FTP
2. Aponte para a pasta pública do seu domínio
3. Certifique-se de que o `index.html` está na raiz

## 🔧 Configurações Avançadas

### Personalizando Cores
No arquivo `index.html`, localize a seção `tailwind.config` e altere as cores:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#SUA_COR_AQUI',  // ← Cor principal
        }
      }
    }
  }
}
```

### Adicionando Novos Procedimentos
1. Edite `data/config.json`
2. Na seção desejada (`estetica`, `clinica`, `cirurgica`)
3. Adicione itens na lista `procedimentos`

### Analytics e Tracking
Adicione antes do `</head>` no `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 🖥️ Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## ♿ Acessibilidade

O site inclui:
- ✅ Navegação por teclado
- ✅ Textos alternativos em imagens
- ✅ Contraste adequado
- ✅ Estrutura semântica HTML
- ✅ ARIA labels

## 🚀 Performance

- ✅ Imagens otimizadas
- ✅ CSS e JS minificados
- ✅ Carregamento assíncrono
- ✅ Lazy loading para imagens

## 🛠️ Troubleshooting

### Imagens não carregam
- Verifique os caminhos no `config.json`
- Certifique-se de que as imagens existem na pasta `assets/img/`
- Verifique se os nomes dos arquivos estão corretos (case-sensitive)

### WhatsApp não funciona
- Verifique se o número está no formato correto: `5551991933393`
- Teste o link manualmente no navegador

### Site não carrega localmente
- Certifique-se de usar um servidor HTTP (não abrir o arquivo diretamente)
- Verifique se não há bloqueadores de JavaScript

## 📞 Suporte

Para dúvidas técnicas ou modificações avançadas, entre em contato com o desenvolvedor do site.

---

**Desenvolvido com ❤️ para MD Dermatologia Integrada**
