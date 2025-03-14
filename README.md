# CoinFlow

**Conversor de Moedas com Gráfico de Linha Integrado**

CoinFlow é uma aplicação web moderna que permite converter moedas e visualizar, por meio de um gráfico de linha interativo, a cotação atual e a variação de diferentes moedas. O projeto utiliza tecnologias modernas como React, TypeScript e Vite, além dos componentes estilizados do [Radix UI Themes](https://www.radix-ui.com/themes) e gráficos dinâmicos com [Recharts](https://recharts.org/en-US).

Disponível em: https://coin-flow-kappa.vercel.app

---

## Funcionalidades

- **Conversão de Moedas:** Converta valores entre diversas moedas com base na cotação atual.
- **Gráfico de Linha:** Visualize a variação das cotações em um gráfico de linha integrado.
- **Interface Moderna e Responsiva:** Desenvolvido com Radix UI, garantindo uma UI limpa e responsiva.
- **Tema Claro e Escuro:** Alternância entre modos claro e escuro com transições suaves e alta legibilidade.
- **Hooks Customizados:** Gerenciamento de estados e lógica de negócio modularizados em hooks (ex.: `useCurrencies`, `useChart`, `useThemeController`).

---

## Tecnologias Utilizadas

- **[React](https://reactjs.org/):** Biblioteca para construção de interfaces.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para JavaScript.
- **[Vite](https://vitejs.dev/):** Ferramenta de build rápida e moderna.
- **[Radix UI Themes](https://www.radix-ui.com/themes):** Componentes de UI com temas integrados.
- **[Recharts](https://recharts.org/en-US):** Biblioteca para criação de gráficos interativos.

---

## Instalação

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/Dionisio-DM/coin-flow.git
   cd coin-flow
   ```

2. Instale as Dependências:

```bash
npm install
```

3. Inicie o Servidor de Desenvolvimento:

```bash
npm run dev
```

Acesse a aplicação em: http://localhost:5173

## Uso

- Conversão: Insira o valor no campo de entrada e selecione a moeda de origem e destino.
- Gráfico: Visualize a variação da cotação no gráfico integrado.
- Tema: Utilize o botão de alternância (ícone de Sol/Lua) para trocar entre o modo claro e escuro.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
