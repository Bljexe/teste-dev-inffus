# 🚀 Projeto Rick and Morty - Teste de Desenvolvimento

Bem-vindo ao projeto de teste de desenvolvimento! Este é um sistema completo que consome a API do Rick and Morty e oferece uma interface web moderna para explorar os personagens da série.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como teste de desenvolvimento e inclui:

- **Backend**: API Laravel que consome dados da API Rick and Morty
- **Frontend**: Interface React/Next.js com TypeScript e Tailwind CSS
- **Banco de Dados**: MySQL para armazenamento local dos dados
- **Docker**: Containerização completa para facilitar o desenvolvimento

### 🎯 Funcionalidades Implementadas

✅ **API Laravel** com consumo da API Rick and Morty  
✅ **Endpoints** para listagem, filtragem e busca de personagens  
✅ **Frontend React/Next.js** com TypeScript  
✅ **Tailwind CSS** para estilização moderna  
✅ **Testes automatizados** (Laravel e React)  
✅ **Banco MySQL** para persistência de dados  
✅ **Docker** para containerização  
✅ **Documentação completa** da API  

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- Docker e Docker Compose instalados
- Git para clonar o repositório

### 🚀 Passo a Passo

#### 1. Clone o repositório
```bash
git clone [URL_DO_REPOSITORIO]
cd teste-dev-inffus
```

#### 2. Inicie os containers
Navegue até a pasta `.docker` e execute:
```bash
cd .docker
docker compose up -d --build
```

Este comando vai:
- Criar e iniciar todos os containers (MySQL, Backend, Frontend)
- Construir as imagens Docker necessárias
- Configurar a rede entre os serviços
- Rodar tudo em background (-d)

#### 3. Configure o banco de dados
Após os containers estarem rodando, execute o comando para criar as tabelas:

```bash
docker exec -it -u 0 inffus_backend php artisan migrate
```

Este comando vai:
- Executar as migrações do Laravel
- Criar todas as tabelas necessárias no banco MySQL
- Preparar o banco para receber os dados dos personagens

### 🎉 Pronto! Seu projeto está rodando

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Banco MySQL**: localhost:3306

## 📚 Documentação da API

A documentação completa da API está disponível em:
- **Documentação**: `backend/docs/API_DOCUMENTATION.md`
- **Collection para testes**: `backend/docs/api-collection.json`

### Endpoints Principais

- `GET /api/characters` - Lista todos os personagens com paginação e filtros
- `GET /api/characters/{id}` - Busca um personagem específico por ID

### Filtros Disponíveis

- `name` - Filtrar por nome
- `status` - Filtrar por status (alive, dead, unknown)
- `species` - Filtrar por espécie
- `gender` - Filtrar por gênero
- `type` - Filtrar por tipo

## 🧪 Testando a API

### Usando a Collection

1. Importe o arquivo `backend/docs/api-collection.json` no Postman ou Insomnia
2. Configure a URL base como `http://localhost:8000`
3. Teste os endpoints disponíveis

### Exemplo de Uso

```bash
# Listar personagens
curl "http://localhost:8000/api/characters?page=1&per_page=10"

# Buscar por nome
curl "http://localhost:8000/api/characters?name=Rick"

# Buscar por status
curl "http://localhost:8000/api/characters?status=alive"
```

## 🛠️ Comandos Úteis

### Gerenciar Containers
```bash
# Parar todos os containers
docker compose down

# Ver logs dos containers
docker compose logs -f

# Reiniciar um serviço específico
docker compose restart backend
```

### Acessar Containers
```bash
# Acessar o container do backend
docker exec -it inffus_backend bash

# Acessar o container do frontend
docker exec -it inffus_frontend bash

# Acessar o MySQL
docker exec -it inffus_mysql mysql -u inffus_user -p
```

### Comandos Laravel
```bash
# Executar migrações
docker exec -it inffus_backend php artisan migrate

# Limpar cache
docker exec -it inffus_backend php artisan cache:clear

# Executar testes
docker exec -it inffus_backend php artisan test
```

## 🏗️ Estrutura do Projeto
```
projeto/
├── .docker/
│   └── docker-compose.yml
├── backend/
│   ├── app/
│   ├── docs/
│   │   ├── API_DOCUMENTATION.md
│   │   └── api-collection.json
│   └── ...
├── frontend/
│   ├── src/
│   └── ...
└── README.md
```

## 🔧 Tecnologias Utilizadas

### Backend
- **Laravel** - Framework PHP
- **MySQL** - Banco de dados
- **Docker** - Containerização

### Frontend
- **Next.js** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **Docker** - Containerização

### DevOps
- **Docker Compose** - Orquestração de containers
- **Git** - Controle de versão

## 🐛 Solução de Problemas

### Container não inicia
```bash
# Verificar se as portas estão livres
netstat -tulpn | grep :3000
netstat -tulpn | grep :8000
netstat -tulpn | grep :3306
```

### Erro de permissão
```bash
# Dar permissão de escrita no storage
docker exec -it inffus_backend chmod -R 777 storage
```

### Banco não conecta
```bash
# Verificar se o MySQL está rodando
docker exec -it inffus_mysql mysql -u root -p
```

##  Notas de Desenvolvimento

- O projeto consome dados da API pública do Rick and Morty
- Os dados são salvos localmente no MySQL para melhor performance
- A API suporta paginação e filtros avançados
- O frontend é responsivo e moderno
- Todos os testes estão implementados

---
