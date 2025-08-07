import { Character } from '@/types/api';
import { Card } from '@/components/ui/Card';
import { getStatusColor, getGenderColor } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/characters/${character.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-105">
        <div className="relative h-48 w-full">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {character.name}
          </h3>
          <div className="space-y-2">
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(character.status)}`}>
              {character.status}
            </span>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getGenderColor(character.gender)} ml-2`}>
              {character.gender}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">{character.species}</p>
        </div>
      </Card>
    </Link>
  );
} 