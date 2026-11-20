# Holyrics Live - Projeção de Letras e Transmissão Eclesiástica

## 1. Objetivo e Finalidade
Sistema web para controle de projeção de letras de louvor, versículos bíblicos e cronômetro em cultos ao vivo.

## 2. Tecnologias Utilizadas
- React, TypeScript, Vite, Tailwind CSS, Zustand, Framer Motion, Lucide React, React Router

## 3. Arquitetura e Estrutura de Diretórios
Single Page Application com gerenciamento de estado global via Zustand para sincronização rápida entre tela de controle e tela de projeção.

## 4. Principais Arquivos e Responsabilidades
- `src/App.tsx`: Roteamento e tela do operador.
- `package.json`: Definição de dependências de interface e store Zustand.

## 5. Funcionalidades Identificadas
- Seleção e busca instantânea de hinos e músicas
- Tela secundária de projeção limpa (modo telão/OBS Studio)
- Gerenciamento reativo de temas e cores de fundo

## 6. Como Compilar ou Executar
```bash
npm install
npm run dev
```

## 7. Estado Atual do Projeto
**Completo**

## 8. Pendências e Limitações Identificadas
Suporte a protocolo NDI para envio direto para mesas de corte de vídeo.
