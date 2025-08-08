'use client';

import { useCharacter } from '@/hooks/useCharacter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getStatusColor, getGenderColor, formatDate } from '@/lib/utils';
import { ArrowLeftIcon, MapPinIcon, CalendarIcon, UsersIcon } from '@/components/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function CharacterPage() {
  const params = useParams();
  const characterId = parseInt(params.id as string);
  const { data, loading, error } = useCharacter(characterId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Carregando personagem...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Personagem não encontrado
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/">
            <Button>Voltar para lista</Button>
          </Link>
        </div>
      </div>
    );
  }

  const character = data.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeftIcon />
              <span className="ml-2">Voltar para lista</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Character Image */}
          <div>
            <Card className="overflow-hidden">
              <div className="relative h-96 w-full">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill={true}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Card>
          </div>

          {/* Character Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {character.name}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(character.status)}`}>
                  {character.status}
                </span>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGenderColor(character.gender)}`}>
                  {character.gender}
                </span>
              </div>
            </div>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Informações
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Espécie
                  </label>
                  <p className="text-gray-900">{character.species}</p>
                </div>

                {character.type && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tipo
                    </label>
                    <p className="text-gray-900">{character.type}</p>
                  </div>
                )}

                {character.origin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <MapPinIcon />
                      <span className="ml-2">Origem</span>
                    </label>
                    <p className="text-gray-900">{character.origin.name || 'Desconhecida'}</p>
                  </div>
                )}

                {character.location && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <MapPinIcon />
                      <span className="ml-2">Localização Atual</span>
                    </label>
                    <p className="text-gray-900">{character.location.name || 'Desconhecida'}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <CalendarIcon />
                    <span className="ml-2">Criado em</span>
                  </label>
                  <p className="text-gray-900">
                    {formatDate(character.created_at_external)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Episodes */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <UsersIcon />
                <span className="ml-2">Episódios ({character.episode.length})</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {character.episode.map((episodeUrl, index) => {
                  const episodeNumber = episodeUrl.split('/').pop();
                  return (
                    <div
                      key={index}
                      className="bg-gray-50 px-3 py-2 rounded text-sm text-gray-700"
                    >
                      Episódio {episodeNumber}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 