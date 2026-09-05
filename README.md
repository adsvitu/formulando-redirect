# Landing Page de Redirecionamento — Mentoria SEEDF (Prof. Guilherme Silva)

Landing Page ultra-rápida de alta conversão para captura de leads e redirecionamento para Grupo VIP no WhatsApp do **Prof. Guilherme Silva** (Mentoria Professor Efetivo SEEDF - 10.604 Vagas).

## 🚀 Tecnologias e Performance
- HTML5 Semântico e ultraleve
- CSS Vanilla com Design System em tons de Azul Royal e fundo suave
- JS Vanilla com persistência em `localStorage`
- Suporte a Meta Pixel (Evento de `Lead`)
- Totalmente otimizado para celulares (Mobile-First)

---

## 🛠️ Como Alterar os Links e Rastreamentos

### 1. Alterar o Link do Grupo de WhatsApp
No arquivo `index.html`, substitua os links `https://chat.whatsapp.com/ER5x0qbjqvS8nX4vGvd6LP` do botão principal (`id="cta"`) e do sticky CTA (`id="cta2"`) pelo seu novo link de grupo.

### 2. Configurar o Meta Pixel (Facebook Ads)
No arquivo `index.html`, procure a tag de script do Meta Pixel e insira o seu ID onde indicado:
```html
fbq('init', 'SEU_PIXEL_ID');
```

---

## 🌐 Publicação e Deploy (Netlify)

1. Repositório Git configurado nesta pasta.
2. No Netlify, selecione o repositório `formulando`.
3. Direcione a pasta de publicação para a raiz `./`.
4. O arquivo `netlify.toml` já está pré-configurado para performance e cache.
