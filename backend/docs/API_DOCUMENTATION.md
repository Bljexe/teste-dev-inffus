# API Rick and Morty - Documentação

## Visão Geral

Esta API consome dados da [API do Rick and Morty](https://rickandmortyapi.com/) e os armazena em um banco de dados local, fornecendo endpoints para listagem, filtragem e busca de personagens.

## Endpoints

### 1. Listar Personagens

**GET** `/api/characters`

Lista todos os personagens com paginação e filtros.

**Parâmetros de Query:**
- `page` (opcional): Número da página (padrão: 1)
- `per_page` (opcional): Itens por página (padrão: 20)
- `name` (opcional): Filtrar por nome
- `status` (opcional): Filtrar por status (alive, dead, unknown)
- `species` (opcional): Filtrar por espécie
- `gender` (opcional): Filtrar por gênero (female, male, genderless, unknown)
- `type` (opcional): Filtrar por tipo

**Exemplo de Resposta:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "external_id": 1,
            "name": "Rick Sanchez",
            "status": "Alive",
            "species": "Human",
            "type": "",
            "gender": "Male",
            "origin": {
                "name": "Earth (C-137)",
                "url": "https://rickandmortyapi.com/api/location/1"
            },
            "location": {
                "name": "Citadel of Ricks",
                "url": "https://rickandmortyapi.com/api/location/3"
            },
            "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            "episode": [
                "https://rickandmortyapi.com/api/episode/1",
                "https://rickandmortyapi.com/api/episode/2"
            ],
            "url": "https://rickandmortyapi.com/api/character/1",
            "created_at_external": "2017-11-04T18:48:46.250Z",
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-01T00:00:00.000000Z"
        }
    ],
    "pagination": {
        "current_page": 1,
        "last_page": 42,
        "per_page": 20,
        "total": 826,
        "from": 1,
        "to": 20
    }
}
```

### 2. Buscar Personagem por ID

**GET** `/api/characters/{id}`

Retorna detalhes de um personagem específico.

**Parâmetros:**
- `id` (obrigatório): ID do personagem

**Exemplo de Resposta:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "external_id": 1,
        "name": "Rick Sanchez",
        "status": "Alive",
        "species": "Human",
        "type": "",
        "gender": "Male",
        "origin": {
            "name": "Earth (C-137)",
            "url": "https://rickandmortyapi.com/api/location/1"
        },
        "location": {
            "name": "Citadel of Ricks",
            "url": "https://rickandmortyapi.com/api/location/3"
        },
        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        "episode": [
            "https://rickandmortyapi.com/api/episode/1",
            "https://rickandmortyapi.com/api/episode/2"
        ],
        "url": "https://rickandmortyapi.com/api/character/1",
        "created_at_external": "2017-11-04T18:48:46.250Z",
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-01T00:00:00.000000Z"
    }
}
```

### 3. Estatísticas

**GET** `/api/characters/stats/overview`

Retorna estatísticas dos personagens.

**Exemplo de Resposta:**
```json
{
    "success": true,
    "data": {
        "total_characters": 826,
        "by_status": [
            {
                "status": "Alive",
                "count": 400
            },
            {
                "status": "Dead",
                "count": 300
            },
            {
                "status": "Unknown",
                "count": 126
            }
        ],
        "by_species": [
            {
                "species": "Human",
                "count": 200
            },
            {
                "species": "Alien",
                "count": 150
            }
        ],
        "by_gender": [
            {
                "gender": "Male",
                "count": 400
            },
            {
                "gender": "Female",
                "count": 300
            },
            {
                "gender": "Genderless",
                "count": 100
            },
            {
                "gender": "Unknown",
                "count": 26
            }
        ]
    }
}
```

### 4. Importar Personagens

**POST** `/api/sync/characters`

Importa todos os personagens da API do Rick and Morty.

**Exemplo de Resposta:**
```json
{
    "success": true,
    "message": "Personagens importados com sucesso",
    "total": 826
}
```

### 5. Sincronizar Dados

**POST** `/api/sync/characters/update`

Sincroniza os dados com a API externa.

**Exemplo de Resposta:**
```json
{
    "success": true,
    "message": "Dados sincronizados com sucesso",
    "total": 826
}
```

## Comandos Artisan

### Importar Personagens

```bash
php artisan rickandmorty:import-characters
```

## Configuração

### Variáveis de Ambiente

```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=inffus_db
DB_USERNAME=inffus_user
DB_PASSWORD=inffus_password
```

## Códigos de Status HTTP

- `200` - Sucesso
- `404` - Personagem não encontrado
- `500` - Erro interno do servidor

## Limitações

- A API externa do Rick and Morty tem rate limiting
- Importação inicial pode levar alguns minutos
- Dados são atualizados manualmente via endpoint ou comando 