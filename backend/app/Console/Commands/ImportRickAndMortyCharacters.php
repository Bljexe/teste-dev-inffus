<?php

namespace App\Console\Commands;

use App\Services\RickAndMortyService;
use Illuminate\Console\Command;

class ImportRickAndMortyCharacters extends Command
{
    protected $signature = 'rickandmorty:import-characters';
    protected $description = 'Importa personagens da API do Rick and Morty';

    private RickAndMortyService $rickAndMortyService;

    public function __construct(RickAndMortyService $rickAndMortyService)
    {
        parent::__construct();
        $this->rickAndMortyService = $rickAndMortyService;
    }

    public function handle(): int
    {
        $this->info('Iniciando importação de personagens...');

        $result = $this->rickAndMortyService->fetchAndStoreCharacters();

        if ($result['success']) {
            $this->info("✅ {$result['message']}");
            $this->info("Total de personagens importados: {$result['total']}");
            return 0;
        }

        $this->error("❌ {$result['message']}");
        return 1;
    }
} 