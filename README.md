
## Resumo 🎧 

<img width="1915" height="897" alt="image" src="https://github.com/user-attachments/assets/a78198bb-b406-4d18-95ce-e22023c7359f" />

O **Audio Uploader** é uma ferramenta criada com o objetivo de **simplificar o envio e a incorporação de áudios em sites de notícias e blogs**, especialmente em plataformas como o **Blogger**, que exigem código HTML manual para adicionar players de áudio.

A ideia surgiu para ajudar meu pai, que administra um site de notícias, e precisava de uma maneira prática de publicar áudios sem depender de processos manuais.
Agora, com apenas **dois cliques** — selecionar o áudio e copiar o código — o upload é feito automaticamente, o áudio é hospedado e o player pronto é gerado instantaneamente.

---

## Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript puro (sem frameworks).
* **Upload de arquivos:** API do **Cloudinary**.
* **Destacamento de código:** **Highlight.js** para visualização formatada do HTML.
* **Backend opcional (Node.js + Express):** versão que permite upload via servidor com `multer`.
* **Hospedagem local:** execução simples com Node.js ou abertura direta via navegador.

---

**Exemplo de player gerado automaticamente:**

```html
<audio controls>
  <source src="https://res.cloudinary.com/seu-cloud/audio.mp3" type="audio/mpeg">
  Seu navegador não suporta o elemento de áudio.
</audio>
```

## Diferenciais

* **Solução pessoal com impacto real:** nasceu de uma necessidade prática e familiar.
* **Zero dependências externas no frontend:** funciona em qualquer navegador.
* **Design responsivo e moderno:** tema claro/escuro com ícones SVG e tipografia limpa.
* **Usabilidade e acessibilidade:** pensado para ser usado até por quem não entende de HTML.

---

## Futuras Melhorias

* Suporte a múltiplos uploads simultâneos.
* Escolha de diferentes players
* Integração com APIs de transcrição automática.

---

© 2025 — Projeto pessoal de automação e acessibilidade digital.


