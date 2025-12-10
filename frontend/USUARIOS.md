# Sistema de Usuários - SEBRAE Questionários

## 📋 Visão Geral

O sistema possui dois tipos de usuários com permissões e interfaces distintas:

### 👤 **Cliente** (Usuário Padrão)
- **Tela inicial**: Página Home com propagandas e informações do SEBRAE
- **Funcionalidades**:
  - Navegar pela página inicial com anúncios de serviços
  - Responder questionários disponíveis
  - Ver histórico de suas próprias respostas

### 👔 **Manager** (Gerente)
- **Tela inicial**: Painel de Gerenciamento
- **Funcionalidades**:
  - Gerenciar usuários (criar, editar, remover, alterar tipo)
  - Criar novos questionários
  - Analisar todas as respostas de todos os usuários
  - Ver estatísticas gerais do sistema
  - Visualizar lista de respondentes

## 🚀 Como Usar

### Login

1. Acesse `/login`
2. Digite nome e senha
3. Selecione o tipo de usuário (Cliente ou Manager)
4. **Dica**: Para acesso automático como Manager, use "manager" ou "admin" no nome

**Credenciais de exemplo:**
- Manager: `manager@sebrae` / qualquer senha
- Cliente: `cliente` / qualquer senha

### Fluxo do Cliente

```
Login (como Cliente)
  ↓
Página Home (propagandas)
  ↓
Menu lateral:
  - 🏠 Início
  - 📝 Questionários (responder)
  - 📊 Minhas Respostas
```

### Fluxo do Manager

```
Login (como Manager)
  ↓
Painel de Gerenciamento
  ↓
Menu lateral:
  - 👔 Gerenciar (usuários + estatísticas)
  - ✏️ Criar (novos questionários)
  - 📊 Resultados (análise geral)
  - 👥 Respondentes (lista completa)
```

## 📂 Estrutura de Arquivos

```
src/
├── types/
│   └── user.ts              # Tipos TypeScript (User, UserRole)
├── pages/
│   ├── home/                # Página inicial (Cliente)
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── manager/             # Painel de gerenciamento (Manager)
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── login/               # Login com seleção de tipo
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── menu/                # Menu lateral (adapta por role)
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── questionario/        # Páginas de questionários
│   └── shared/
│       └── header/          # Header mostra tipo de usuário
└── App.tsx                  # Roteamento condicional por role
```

## 🔐 Persistência

- **localStorage**: `sr_user` - Dados do usuário logado (inclui role)
- **localStorage**: `sr_all_users` - Lista de todos os usuários cadastrados (gerenciados pelo Manager)
- **localStorage**: `sr_questionarios` - Questionários salvos
- **localStorage**: Respostas são mantidas no state do App (podem ser persistidas futuramente)

## 🎨 Funcionalidades por Página

### Página Home (Cliente)
- Hero section com boas-vindas
- Grade de anúncios/propagandas (6 cards com ícones, títulos, descrições)
- Call-to-action para acessar questionários
- Design responsivo com cores SEBRAE

### Painel de Gerenciamento (Manager)
- **Gerenciar Usuários**:
  - Tabela com lista de usuários
  - Adicionar novo usuário (nome, email, tipo)
  - Alternar tipo de usuário (Manager ↔ Cliente)
  - Remover usuários
- **Estatísticas**:
  - Total de usuários
  - Quantidade de Managers
  - Quantidade de Clientes

### Editor de Questionários (Manager)
- Criar perguntas (texto curto ou múltipla escolha)
- Drag & drop para reordenar
- Preview opcional em tempo real
- Salvar questionário com título

### Responder Questionários (Cliente)
- Visualização em cards lado a lado
- Seleção do questionário
- Formulário de respostas
- Envio e redirecionamento para resultados

### Resultados (ambos)
- Manager: Vê todas as respostas de todos os usuários
- Cliente: Vê apenas suas próprias respostas

## 🛠️ Desenvolvimento

### Testar localmente

```cmd
cd frontend-react
npm install
npm start
```

### Estrutura de tipos

```typescript
type UserRole = 'manager' | 'cliente';

interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  token?: string;
  createdAt?: string;
}
```

## 📱 Responsividade

- Desktop: Layout completo com menu lateral, conteúdo central
- Tablet: Menu colapsível, cards adaptáveis
- Mobile: Menu oculto por padrão, cards empilhados

## 🎯 Próximas Melhorias

- [ ] Integração com backend real
- [ ] Autenticação JWT
- [ ] Persistência de respostas por usuário
- [ ] Dashboard de analytics para Manager
- [ ] Notificações em tempo real
- [ ] Exportar resultados (CSV/PDF)
- [ ] Sistema de permissões granular
- [ ] Histórico de atividades
