import React from 'react';
import { Music } from 'lucide-react';

interface SpotifyPlayerProps {
  personalityType: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ personalityType }) => {
  // Map personality types to Spotify playlists that match their energy/style
  const playlistMap: { [key: string]: string } = {
    'INTJ': '37i9dQZF1DX7gIoKXt0gmx',  // Deep Focus
    'INTP': '37i9dQZF1DWWQRwui0ExPn',  // Lo-Fi Beats
    'ENTJ': '37i9dQZF1DX8dTWjpijlub',  // Power Workout
    'ENTP': '37i9dQZF1DX0BcQWzuB7ZO',  // Dance Hits
    'INFJ': '37i9dQZF1DWXe9gFZP0gtP',  // Ambient Relaxation
    'INFP': '37i9dQZF1DX4DyyvTvXn5M',  // Indie Folk
    'ENFJ': '37i9dQZF1DX9tPFwDMOaN1',  // Feel Good Piano
    'ENFP': '37i9dQZF1DX1g0iEXLFycr',  // Happy Vibes
    'ISTJ': '37i9dQZF1DX4sWSpwq3LiO',  // Classical Essentials
    'ISFJ': '37i9dQZF1DX6VdMW310YC7',  // Peaceful Piano
    'ESTJ': '37i9dQZF1DX76Wlfdnj7AP',  // Beast Mode
    'ESFJ': '37i9dQZF1DXdPec7aLTmlC',  // Happy Pop
    'ISTP': '37i9dQZF1DX1lVhptIYRda',  // Rock Classics
    'ISFP': '37i9dQZF1DX6YiXGF1DKzK',  // Acoustic Covers
    'ESTP': '37i9dQZF1DX4eRPd9frC1m',  // Hype
    'ESFP': '37i9dQZF1DXdVbxH0H5otr'   // Party Hits
  };

  const playlistId = playlistMap[personalityType] || '37i9dQZF1DX4sWSpwq3LiO';

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white p-4">
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-5 h-5 text-green-500" />
        <h3 className="font-semibold text-gray-900">Your Personality Playlist</h3>
      </div>
      <iframe
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-md"
      />
    </div>
  );
};

export default SpotifyPlayer;