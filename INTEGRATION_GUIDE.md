# 🔗 Integração Frontend-Backend - Projeto SEBRAE

## 📋 **Visão Geral**

O frontend React agora está conectado ao backend Spring Boot através de uma API REST. Os dados são persistidos no banco MySQL ao invés de localStorage.

---

## 🚀 **Como Iniciar**

### **1. Iniciar o Backend (Spring Boot)**

```bash
cd backend

# Certifique-se de que o MySQL está rodando em localhost:3306
# Database: proj3
# User: root
# Password: root

# Iniciar a aplicação
mvnw spring-boot:run

# Ou no Windows
mvnw.cmd spring-boot:run
```

O backend estará rodando em: **http://localhost:8080**

### **2. Iniciar o Frontend (React)**

```bash
cd frontend

# Instalar dependências (se ainda não instalou)
npm install

# Iniciar aplicação
npm start
```

O frontend estará rodando em: **http://localhost:3000**

---

## 📡 **Endpoints Disponíveis**

### **Questionários** (`/api/questionarios`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/find/all` | Listar todos os questionários |
| GET | `/find/{id}` | Buscar questionário por ID |
| GET | `/find/active` | Buscar questionários ativos |
| POST | `/submit` | Criar novo questionário |
| PUT | `/update/{id}` | Atualizar questionário existente |
| DELETE | `/delete/{id}` | Deletar questionário |
| PATCH | `/activate/{id}` | Ativar/desativar questionário |

**Exemplo de corpo (POST/PUT):**
```json
{
  "titulo": "Pesquisa de Satisfação",
  "coverImage": "https://example.com/image.jpg",
  "status": "ATIVO",
  "perguntas": [
    {
      "conteudo": "Como você avalia nosso atendimento?",
      "perguntaTipo": "SATISFACTION",
      "required": true
    }
  ]
}
```

### **Usuários** (`/api/usuarios`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/find/all` | Listar todos os usuários |
| GET | `/find/{id}` | Buscar usuário por ID |
| POST | `/create` | Criar novo usuário |
| POST | `/login` | Login (email + senha) |
| PATCH | `/update/{id}` | Atualizar dados do usuário |
| DELETE | `/delete/{id}` | Deletar usuário |

**Exemplo de login:**
```json
{
  "email": "usuario@example.com",
  "senha": "senha123"
}
```

### **Respostas** (`/api/respostas`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/find/all` | Listar todas as respostas |
| GET | `/find/usuario/{userId}` | Respostas de um usuário |
| GET | `/find/all/{questionarioId}` | Respostas de um questionário |
| POST | `/submit` | Enviar resposta |
| PUT | `/update/{id}` | Atualizar resposta |
| DELETE | `/delete/{id}` | Deletar resposta |

**Exemplo de submissão:**
```json
{
  "userId": 1,
  "questionarioId": 5,
  "respostas": [
    {
      "perguntaId": 10,
      "resposta": "Ótimo"
    }
  ]
}
```

### **Feedbacks** (`/api/feedback`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/submit` | Criar feedback |
| GET | `/find/user/{userId}` | Feedbacks de um usuário |

**Exemplo de feedback:**
```json
{
  "userId": 1,
  "respostaId": 25,
  "feedback": "Excelente trabalho! Continue assim."
}
```

### **Notificações** (`/api/notificacoes`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/create` | Criar notificação |
| GET | `/find/user/{userId}` | Notificações de um usuário |
| GET | `/find/unread/{userId}` | Notificações não lidas |
| PATCH | `/mark-read/{id}` | Marcar como lida |
| DELETE | `/delete/{id}` | Deletar notificação |
| DELETE | `/cleanup/user/{userId}/hours/{hours}` | Limpar antigas |

---

## 🗄️ **Estrutura do Banco de Dados**

### **Tabelas Principais**

- `questionario` - Questionários criados
- `pergunta` - Perguntas de cada questionário
- `usuario` - Usuários do sistema
- `questionario_respondido` - Respostas submetidas
- `resposta_usuario` - Respostas individuais por pergunta
- `feedback` - Feedbacks do manager para clientes
- `notificacao` - Notificações do sistema

### **Tipos de Pergunta (PerguntaTipo)**

- `TEXT` - Resposta curta (texto livre)
- `MULTIPLA_ESCOLHA` - Múltipla escolha (radio buttons)
- `SATISFACTION` - Escala de satisfação com emojis

### **Tipos de Usuário (UsuarioTipo)**

- `CLIENTE` - Usuário cliente (responde questionários)
- `MANAGER` - Gerente (cria questionários e envia feedbacks)

---

## 🔄 **Migração de Dados**

### **Dados Existentes no localStorage**

Se você já tinha dados no localStorage, eles ainda funcionam como fallback caso a API esteja offline. Para migrar definitivamente:

1. Exporte os dados do localStorage via DevTools
2. Importe para o banco MySQL usando os endpoints POST
3. Remova os dados do localStorage

### **Exemplo: Migrar Questionários**

```javascript
// No console do navegador:
const questionnaires = JSON.parse(localStorage.getItem('sr_questionarios'));

questionnaires.forEach(async (q) => {
  await fetch('http://localhost:8080/api/questionarios/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(q)
  });
});
```

---

## ⚙️ **Configurações**

### **CORS**

O backend está configurado para aceitar requisições de:
- `http://localhost:3000` (frontend React)

Para adicionar outras origens, edite: `backend/src/main/java/com/example/PROJ3/config/WebConfig.java`

### **Banco de Dados**

Configurações em: `backend/src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/proj3
spring.datasource.username=root
spring.datasource.password=root
```

---

## 🐛 **Troubleshooting**

### **Erro: Connection refused**
- Verifique se o backend está rodando em localhost:8080
- Confirme que o MySQL está ativo

### **Erro: 401 Unauthorized**
- Faça login novamente
- Verifique se o token/sessão não expirou

### **Erro: CORS policy**
- Certifique-se de que o frontend está em localhost:3000
- Verifique a configuração CORS no backend

### **Dados não aparecem**
- Verifique o console do navegador para erros de API
- Confirme que o banco de dados tem dados
- Verifique se os endpoints retornam 200 OK

---

## 📝 **Notas Importantes**

1. **Formato de Dados**: O backend usa IDs numéricos (int), enquanto o frontend usava strings. A API faz a conversão automaticamente.

2. **Perguntas com Opções**: O campo `options` no backend é uma string JSON. Exemplo: `"[\"Sim\",\"Não\",\"Talvez\"]"`

3. **Fallback**: Se a API falhar, o sistema usa localStorage como backup temporário.

4. **Autenticação**: Atualmente usa autenticação simples (email/senha). Para produção, implemente JWT ou OAuth2.

---

## 🎯 **Próximos Passos**

- [ ] Implementar autenticação com JWT
- [ ] Adicionar paginação nos endpoints
- [ ] Criar testes automatizados (backend + frontend)
- [ ] Adicionar cache Redis para performance
- [ ] Deploy em ambiente de produção

---

## 📞 **Suporte**

Para dúvidas ou problemas, verifique:
- Logs do Spring Boot no terminal do backend
- Console do navegador (F12) no frontend
- Documentação da API REST
