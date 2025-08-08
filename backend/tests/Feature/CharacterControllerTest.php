<?php

namespace Tests\Feature;

use App\Models\Character;
use App\Services\RickAndMortyService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery;
use Tests\TestCase;

class CharacterControllerTest extends TestCase
{
    use DatabaseTransactions, WithFaker;

    public function test_index_returns_characters_with_pagination()
    {
        // Criar alguns personagens de teste
        Character::factory()->count(5)->create();

        $response = $this->getJson('/api/characters');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'external_id',
                        'name',
                        'status',
                        'species',
                        'type',
                        'gender',
                        'origin_name',
                        'location_name',
                        'image',
                        'episode',
                        'url',
                        'created_at',
                        'updated_at'
                    ]
                ],
                'pagination' => [
                    'current_page',
                    'last_page',
                    'per_page',
                    'total',
                    'from',
                    'to'
                ]
            ])
            ->assertJson(['success' => true]);
    }

    public function test_index_with_filters()
    {
        $testCharacter1 = Character::factory()->create(['status' => 'Alive', 'name' => 'Test Rick Unique']);
        $testCharacter2 = Character::factory()->create(['status' => 'Dead', 'name' => 'Test Morty Unique']);
        $testCharacter3 = Character::factory()->create(['status' => 'Alive', 'name' => 'Test Summer Unique']);

        $response = $this->getJson('/api/characters?status=Alive&name=Test Rick Unique');

        $response->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonCount(1, 'data');
    }

    public function test_show_returns_character()
    {
        $character = Character::factory()->create();

        $response = $this->getJson("/api/characters/{$character->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id',
                    'external_id',
                    'name',
                    'status',
                    'species',
                    'type',
                    'gender',
                    'origin_name',
                    'location_name',
                    'image',
                    'episode',
                    'url',
                    'created_at',
                    'updated_at'
                ]
            ])
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $character->id,
                    'name' => $character->name
                ]
            ]);
    }

    public function test_show_returns_404_for_non_existent_character()
    {
        $response = $this->getJson('/api/characters/999999');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Personagem não encontrado'
            ]);
    }

    public function test_import_characters()
    {
        $mockService = Mockery::mock(RickAndMortyService::class);
        $mockService->shouldReceive('fetchAndStoreCharacters')
            ->once()
            ->andReturn([
                'success' => true,
                'message' => 'Personagens importados com sucesso',
                'total' => 5
            ]);

        $this->app->instance(RickAndMortyService::class, $mockService);

        $response = $this->postJson('/api/sync/characters');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Personagens importados com sucesso',
                'total' => 5
            ]);
    }

    public function test_import_characters_failure()
    {
        $mockService = Mockery::mock(RickAndMortyService::class);
        $mockService->shouldReceive('fetchAndStoreCharacters')
            ->once()
            ->andReturn([
                'success' => false,
                'message' => 'Erro ao importar personagens'
            ]);

        $this->app->instance(RickAndMortyService::class, $mockService);

        $response = $this->postJson('/api/sync/characters');

        $response->assertStatus(500)
            ->assertJson([
                'success' => false,
                'message' => 'Erro ao importar personagens'
            ]);
    }

    public function test_sync_characters()
    {
        $mockService = Mockery::mock(RickAndMortyService::class);
        $mockService->shouldReceive('fetchAndStoreCharacters')
            ->once()
            ->andReturn([
                'success' => true,
                'message' => 'Personagens importados com sucesso',
                'total' => 10
            ]);

        $this->app->instance(RickAndMortyService::class, $mockService);

        $response = $this->postJson('/api/sync/characters/update');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Dados sincronizados com sucesso',
                'total' => 10
            ]);
    }

    public function test_stats_returns_character_statistics()
    {
        Character::factory()->count(3)->create(['status' => 'Alive', 'name' => 'Test Alive 1']);
        Character::factory()->count(2)->create(['status' => 'Dead', 'name' => 'Test Dead 1']);
        Character::factory()->count(1)->create(['status' => 'unknown', 'name' => 'Test Unknown 1']);

        $response = $this->getJson('/api/characters/stats/overview');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'total_characters',
                    'by_status',
                    'by_species',
                    'by_gender'
                ]
            ])
            ->assertJson([
                'success' => true
            ]);

        $responseData = $response->json('data');
        $this->assertGreaterThanOrEqual(6, $responseData['total_characters']);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
