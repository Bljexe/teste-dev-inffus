<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CharacterResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'external_id' => $this->external_id,
            'name' => $this->name,
            'status' => $this->status,
            'species' => $this->species,
            'type' => $this->type,
            'gender' => $this->gender,
            'origin' => [
                'name' => $this->origin_name,
                'url' => $this->origin_url
            ],
            'location' => [
                'name' => $this->location_name,
                'url' => $this->location_url
            ],
            'image' => $this->image,
            'episode' => $this->episode,
            'url' => $this->url,
            'created_at_external' => $this->created_at_external,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
} 