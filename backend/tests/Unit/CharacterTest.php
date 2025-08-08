<?php

namespace Tests\Unit;

use App\Models\Character;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class CharacterTest extends TestCase
{
    use DatabaseTransactions;

    public function test_character_can_be_created()
    {
        $character = Character::factory()->create([
            'name' => 'Rick Sanchez',
            'status' => 'Alive',
            'species' => 'Human',
            'gender' => 'Male'
        ]);

        $this->assertDatabaseHas('characters', [
            'name' => 'Rick Sanchez',
            'status' => 'Alive',
            'species' => 'Human',
            'gender' => 'Male'
        ]);

        $this->assertEquals('Rick Sanchez', $character->name);
        $this->assertEquals('Alive', $character->status);
        $this->assertEquals('Human', $character->species);
        $this->assertEquals('Male', $character->gender);
    }

    public function test_character_filter_scope()
    {
        $testCharacter1 = Character::factory()->create(['name' => 'Test Rick Unique', 'status' => 'Alive']);
        $testCharacter2 = Character::factory()->create(['name' => 'Test Morty Unique', 'status' => 'Alive']);
        $testCharacter3 = Character::factory()->create(['name' => 'Test Summer Unique', 'status' => 'Dead']);

        $characters = Character::filter(['name' => 'Test Rick Unique'])->get();
        $this->assertCount(1, $characters);
        $this->assertEquals('Test Rick Unique', $characters->first()->name);

        $characters = Character::filter(['status' => 'Alive'])->get();
        $aliveCharacters = $characters->whereIn('name', ['Test Rick Unique', 'Test Morty Unique']);
        $this->assertCount(2, $aliveCharacters);

        $characters = Character::filter(['name' => 'Test', 'status' => 'Alive'])->get();
        $testAliveCharacters = $characters->whereIn('name', ['Test Rick Unique', 'Test Morty Unique']);
        $this->assertCount(2, $testAliveCharacters);
    }

    public function test_character_episode_casting()
    {
        $episodes = [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2'
        ];

        $character = Character::factory()->create([
            'episode' => $episodes
        ]);

        $this->assertIsArray($character->episode);
        $this->assertEquals($episodes, $character->episode);
    }

    public function test_character_created_at_external_casting()
    {
        $character = Character::factory()->create([
            'created_at_external' => '2023-01-01 12:00:00'
        ]);

        $this->assertInstanceOf(\Carbon\Carbon::class, $character->created_at_external);
    }
}