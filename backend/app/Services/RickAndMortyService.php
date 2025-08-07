<?php

namespace App\Services;

use App\Models\Character;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RickAndMortyService
{
    private const API_BASE_URL = 'https://rickandmortyapi.com/api';

    public function fetchAndStoreCharacters(): array
    {
        $characters = [];
        $page = 1;
        $totalPages = 1;

        try {
            do {
                $response = Http::get(self::API_BASE_URL . '/character', [
                    'page' => $page
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    $totalPages = $data['info']['pages'];
                    $characters = array_merge($characters, $data['results']);
                    $page++;
                } else {
                    Log::error('Erro ao buscar personagens da API', [
                        'page' => $page,
                        'status' => $response->status(),
                        'response' => $response->body()
                    ]);
                    break;
                }
            } while ($page <= $totalPages);

            $this->storeCharacters($characters);

            return [
                'success' => true,
                'message' => 'Personagens importados com sucesso',
                'total' => count($characters)
            ];
        } catch (\Exception $e) {
            Log::error('Erro ao importar personagens', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return [
                'success' => false,
                'message' => 'Erro ao importar personagens: ' . $e->getMessage()
            ];
        }
    }

    private function storeCharacters(array $characters): void
    {
        foreach ($characters as $characterData) {
            Character::updateOrCreate(
                ['external_id' => $characterData['id']],
                [
                    'name' => $characterData['name'],
                    'status' => $characterData['status'],
                    'species' => $characterData['species'],
                    'type' => $characterData['type'],
                    'gender' => $characterData['gender'],
                    'origin_name' => $characterData['origin']['name'],
                    'origin_url' => $characterData['origin']['url'],
                    'location_name' => $characterData['location']['name'],
                    'location_url' => $characterData['location']['url'],
                    'image' => $characterData['image'],
                    'episode' => $characterData['episode'],
                    'url' => $characterData['url'],
                    'created_at_external' => $characterData['created']
                ]
            );
        }
    }

    public function fetchCharacterById(int $id): ?array
    {
        try {
            $response = Http::get(self::API_BASE_URL . "/character/{$id}");

            if ($response->successful()) {
                return $response->json();
            }

            return null;
        } catch (\Exception $e) {
            Log::error('Erro ao buscar personagem por ID', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);

            return null;
        }
    }
} 