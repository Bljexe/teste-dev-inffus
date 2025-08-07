<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'name',
        'status',
        'species',
        'type',
        'gender',
        'origin_name',
        'origin_url',
        'location_name',
        'location_url',
        'image',
        'episode',
        'url',
        'created_at_external'
    ];

    protected $casts = [
        'episode' => 'array',
        'created_at_external' => 'datetime'
    ];

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['name'] ?? false, fn($query, $name) =>
            $query->where('name', 'like', '%' . $name . '%')
        );

        $query->when($filters['status'] ?? false, fn($query, $status) =>
            $query->where('status', $status)
        );

        $query->when($filters['species'] ?? false, fn($query, $species) =>
            $query->where('species', 'like', '%' . $species . '%')
        );

        $query->when($filters['gender'] ?? false, fn($query, $gender) =>
            $query->where('gender', $gender)
        );

        $query->when($filters['type'] ?? false, fn($query, $type) =>
            $query->where('type', 'like', '%' . $type . '%')
        );
    }
} 