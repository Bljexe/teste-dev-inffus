<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Services\RickAndMortyService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CharacterController extends Controller
{
    private RickAndMortyService $rickAndMortyService;

    public function __construct(RickAndMortyService $rickAndMortyService)
    {
        $this->rickAndMortyService = $rickAndMortyService;
    }

    public function index(Request $request): JsonResponse
    {
        $query = Character::query();

        $filters = $request->only(['name', 'status', 'species', 'gender', 'type']);
        $query->filter($filters);

        $perPage = $request->get('per_page', 20);
        $characters = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $characters->items(),
            'pagination' => [
                'current_page' => $characters->currentPage(),
                'last_page' => $characters->lastPage(),
                'per_page' => $characters->perPage(),
                'total' => $characters->total(),
                'from' => $characters->firstItem(),
                'to' => $characters->lastItem()
            ]
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $character = Character::where('id', $id)->first();

        if (!$character) {
            return response()->json([
                'success' => false,
                'message' => 'Personagem não encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $character
        ]);
    }

    public function import(): JsonResponse
    {
        $result = $this->rickAndMortyService->fetchAndStoreCharacters();

        if ($result['success']) {
            return response()->json($result, 200);
        }

        return response()->json($result, 500);
    }

    public function sync(): JsonResponse
    {
        $result = $this->rickAndMortyService->fetchAndStoreCharacters();

        if ($result['success']) {
            return response()->json([
                'success' => true,
                'message' => 'Dados sincronizados com sucesso',
                'total' => $result['total']
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Erro ao sincronizar dados'
        ], 500);
    }

    public function stats(): JsonResponse
    {
        $stats = [
            'total_characters' => Character::count(),
            'by_status' => Character::selectRaw('status, COUNT(*) as count')
                ->groupBy('status')
                ->get(),
            'by_species' => Character::selectRaw('species, COUNT(*) as count')
                ->groupBy('species')
                ->orderBy('count', 'desc')
                ->limit(10)
                ->get(),
            'by_gender' => Character::selectRaw('gender, COUNT(*) as count')
                ->groupBy('gender')
                ->get()
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
} 