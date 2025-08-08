<?php

namespace Database\Factories;

use App\Models\Character;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Character>
 */
class CharacterFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Character::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $maxExternalId = Character::max('external_id') ?? 0;
        $externalId = $maxExternalId + $this->faker->numberBetween(1, 10000);
        
        return [
            'external_id' => $externalId,
            'name' => $this->faker->name(),
            'status' => $this->faker->randomElement(['Alive', 'Dead', 'unknown']),
            'species' => $this->faker->randomElement(['Human', 'Alien', 'Humanoid', 'Robot', 'Animal']),
            'type' => $this->faker->optional()->word(),
            'gender' => $this->faker->randomElement(['Female', 'Male', 'Genderless', 'unknown']),
            'origin_name' => $this->faker->city(),
            'origin_url' => $this->faker->url(),
            'location_name' => $this->faker->city(),
            'location_url' => $this->faker->url(),
            'image' => $this->faker->imageUrl(300, 300, 'people'),
            'episode' => $this->faker->randomElements([
                'https://rickandmortyapi.com/api/episode/1',
                'https://rickandmortyapi.com/api/episode/2',
                'https://rickandmortyapi.com/api/episode/3'
            ], $this->faker->numberBetween(1, 3)),
            'url' => $this->faker->url(),
            'created_at_external' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }

    /**
     * Indicate that the character is alive.
     */
    public function alive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Alive',
        ]);
    }

    /**
     * Indicate that the character is dead.
     */
    public function dead(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Dead',
        ]);
    }

    /**
     * Indicate that the character is human.
     */
    public function human(): static
    {
        return $this->state(fn (array $attributes) => [
            'species' => 'Human',
        ]);
    }

    /**
     * Indicate that the character is alien.
     */
    public function alien(): static
    {
        return $this->state(fn (array $attributes) => [
            'species' => 'Alien',
        ]);
    }
}
