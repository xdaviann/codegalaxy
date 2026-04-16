// src/pages/Leaderboard.jsx
import { useAuth } from '../hooks/useAuth';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import CodyMascot from '../components/ui/CodyMascot';
import { Trophy, Medal, Flame, User } from 'lucide-react';

// Static mock leaderboard for MVP
const mockLeaderboard = [
  { name: 'AlexCoder', xp: 520, streak: 12 },
  { name: 'SaraJS', xp: 410, streak: 8 },
  { name: 'DevMaster', xp: 380, streak: 6 },
  { name: 'CssWizard', xp: 310, streak: 5 },
  { name: 'ByteNinja', xp: 280, streak: 4 },
  { name: 'HtmlHero', xp: 210, streak: 3 },
  { name: 'CodeNewbie', xp: 150, streak: 2 },
];

// Colored initial avatar
function AvatarCircle({ name, isUser, size = 40 }) {
  const colors = [
    'bg-accent-cyan text-bg-primary',
    'bg-accent-purple text-white',
    'bg-accent-green text-white',
    'bg-accent-orange text-white',
    'bg-accent-red text-white',
  ];
  const colorIdx = name.charCodeAt(0) % colors.length;
  const colorClass = isUser ? 'bg-accent-cyan text-bg-primary' : colors[colorIdx];
  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold flex-shrink-0 ${colorClass}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {isUser ? <CodyMascot size={size * 0.7} /> : name[0].toUpperCase()}
    </div>
  );
}

const MedalIcon = ({ rank }) => {
  if (rank === 0) return <Trophy size={28} className="text-accent-gold fill-accent-gold/30" />;
  if (rank === 1) return <Medal size={26} className="text-text-secondary" />;
  if (rank === 2) return <Medal size={24} className="text-accent-orange" />;
  return null;
};

export default function Leaderboard() {
  const { userData } = useAuth();

  const userXp = userData?.xp || 0;
  const userName = userData?.displayName || 'Tú';
  const allEntries = [
    ...mockLeaderboard,
    { name: userName, xp: userXp, streak: userData?.streak || 0, isUser: true },
  ].sort((a, b) => b.xp - a.xp);

  const userRank = allEntries.findIndex((e) => e.isUser) + 1;

  const podiumOrder = [allEntries[1], allEntries[0], allEntries[2]]; // 2nd, 1st, 3rd
  const podiumHeights = ['h-20', 'h-28', 'h-14'];
  const podiumHighlight = [false, true, false];

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col">
      <TopBar />
      <main className="flex-1 overflow-y-auto pb-24 max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="px-4 pt-6 pb-4 flex items-center gap-3">
          <Trophy size={28} className="text-accent-gold fill-accent-gold/20" />
          <div>
            <h2 className="text-text-primary text-2xl font-bold leading-none">Ranking</h2>
            <p className="text-text-muted text-sm font-mono">Compite con la comunidad</p>
          </div>
        </div>

        {/* Top 3 podium */}
        <div className="px-4 mb-6">
          <div className="flex items-end justify-center gap-2 h-44">
            {podiumOrder.map((entry, podiumIdx) => entry && (
              <div key={entry.name} className="flex flex-col items-center gap-1 flex-1">
                <AvatarCircle name={entry.name} isUser={!!entry.isUser} size={36} />
                <p className="text-text-secondary text-xs font-semibold text-center truncate w-full px-1">
                  {entry.name}
                </p>
                <div
                  className={`w-full ${podiumHeights[podiumIdx]} rounded-t-xl flex flex-col items-center justify-center gap-1 border
                    ${podiumHighlight[podiumIdx]
                      ? 'bg-accent-gold/10 border-accent-gold/30'
                      : 'bg-bg-secondary border-border-subtle'
                    }`}
                >
                  <MedalIcon rank={podiumIdx === 0 ? 1 : podiumIdx === 1 ? 0 : 2} />
                  <span className="text-text-muted text-xs font-mono font-bold">{entry.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full list */}
        <div className="px-4 flex flex-col gap-2">
          {allEntries.map((entry, idx) => (
            <div
              key={idx}
              className={`card p-4 flex items-center gap-3 transition-all
                ${entry.isUser ? 'border-accent-cyan bg-accent-cyan/5' : ''}`}
            >
              {/* Rank number */}
              <div className="w-8 flex justify-center flex-shrink-0">
                {idx < 3 ? (
                  <MedalIcon rank={idx} />
                ) : (
                  <span className="text-text-muted font-bold text-sm">{idx + 1}</span>
                )}
              </div>

              {/* Avatar */}
              <AvatarCircle name={entry.name} isUser={!!entry.isUser} size={38} />

              {/* Name + streak */}
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm truncate ${entry.isUser ? 'text-accent-cyan' : 'text-text-primary'}`}>
                  {entry.name}
                  {entry.isUser && <span className="text-text-muted text-xs font-mono ml-1">(tú)</span>}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Flame size={11} className="text-accent-orange" />
                  <span className="text-text-muted text-xs font-mono">{entry.streak} días</span>
                </div>
              </div>

              {/* XP */}
              <div className="text-right flex-shrink-0">
                <p className="text-text-primary font-bold text-sm">{entry.xp}</p>
                <p className="text-text-muted text-xs font-mono">XP</p>
              </div>
            </div>
          ))}
        </div>

        {userRank > 3 && (
          <div className="px-4 mt-4 pb-4">
            <p className="text-text-muted text-center text-sm font-mono">
              Estás en el puesto{' '}
              <span className="text-accent-cyan font-bold">#{userRank}</span> del ranking
            </p>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
