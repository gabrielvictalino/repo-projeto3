# Changelog - Sistema de Questionários SEBRAE

## Últimas Atualizações

### Design Modernizado (Dezembro 2025)

#### 🎨 Design Mais Limpo e Retangular
- **Border-radius reduzido**: Todos os componentes agora usam `border-radius: 4px` para um visual mais moderno e profissional
- **Sombras suavizadas**: Redução na intensidade das sombras para um design mais limpo e menos "carregado"
- **Cores mais suaves**: Ajustes nas opacidades e intensidades das cores para melhor legibilidade
- **Transições suaves**: Adicionadas animações em todos os botões e elementos interativos

#### 🍔 Menu Hamburguer no Header
- **Localização**: Movido do canto flutuante para o header à esquerda
- **3 Estados**: 
  - **Expanded** (expandido): Menu completo com labels
  - **Collapsed** (recolhido): Apenas ícones
  - **Hidden** (oculto): Menu completamente escondido
- **Sempre acessível**: Botão hamburguer sempre visível no header, mesmo quando menu está oculto

#### 🔍 Busca e Informações no Header
- **Campo de busca**: Busca expansível para questionários (clique no ícone 🔍)
- **Notificações**: Sino de notificações com contador de badges
- **Perfil do usuário**: Exibe nome e role (Manager/Cliente) com opção de logout ao clicar
- **Botão de login**: Para visitantes não autenticados

#### 👤 Modo Guest (Visitante)
- **Acesso sem login**: Usuários podem acessar a home page e responder questionários sem fazer login
- **Identificação**: Respostas de visitantes são salvas com `userId: 'guest'` e `userName: 'Visitante'`
- **Badge visual**: Respostas guest exibem ícone 👤 e tag "Visitante" na lista de respondentes
- **Timestamp**: Todas as respostas agora incluem data/hora de envio

### Arquivos Modificados

#### Componentes
- `src/pages/shared/header/index.tsx` - Adicionado toggle de menu, busca e perfil
- `src/pages/shared/header/styles.ts` - Estilos do hamburger e busca
- `src/pages/menu/index.tsx` - Removido controle interno, agora controlado pelo App
- `src/pages/menu/styles.ts` - Simplificado para 2 estados (expanded/collapsed)
- `src/pages/questionario/index.tsx` - Suporte a usuário guest e currentUser prop
- `src/App.tsx` - Gerenciamento de estado do menu e rotas públicas

#### Estilos
- `src/pages/home/styles.ts` - Border-radius 4px, sombras suaves
- `src/pages/login/styles.ts` - Border-radius 4px em cards e inputs
- `src/pages/questionario/styles.ts` - Border-radius 4px, transições adicionadas
- `src/pages/main/styles.ts` - Border-radius 4px, sombra suave
- `src/pages/manager/styles.ts` - Border-radius 4px em todos os elementos

### Credenciais de Teste

**Managers:**
- admin / admin123
- manager / manager123

**Clientes:**
- cliente1 / cliente123
- joao / joao123
- maria / maria123

**Guest:**
- Acesse direto pela URL `/` ou `/home` sem fazer login

### Rotas Públicas (Acesso sem Login)
- `/` - Home page com propagandas
- `/home` - Mesma home page
- `/responder` - Responder questionários (salvo como guest)

### Rotas Protegidas (Requer Login)
**Manager:**
- `/gerenciar` - Painel de gerenciamento de usuários
- `/criar` - Criar novos questionários
- `/resultados` - Visualizar resultados consolidados
- `/respondentes` - Lista de todos os respondentes

**Cliente:**
- `/home` - Página inicial com propagandas
- `/responder` - Responder questionários
- `/meus-resultados` - Ver próprias respostas

## Tecnologias

- **React 19.2.0** com TypeScript
- **React Router DOM v6** para roteamento
- **@hello-pangea/dnd** para drag & drop
- **LocalStorage** para persistência de dados
- **CSS-in-JS** via style tags injetados

## Como Testar

1. **Modo Guest**: Abra o navegador e acesse `http://localhost:3001` sem fazer login
2. **Menu Toggle**: Clique nas 3 barrinhas no header para alternar entre expanded/collapsed/hidden
3. **Busca**: Clique no ícone de lupa no header para expandir campo de busca
4. **Logout**: Clique no seu nome/avatar no header
5. **Responder como Guest**: Vá em "Questionários" e responda sem login - será salvo como "Visitante"
