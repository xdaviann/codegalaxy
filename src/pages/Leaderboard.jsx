// src/pages/Leaderboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import TopBar from '../components/layout/TopBar';
import MainLayout from '../components/layout/MainLayout';
import CodyMascot from '../components/ui/CodyMascot';
import { Trophy, Medal, Flame } from 'lucide-react';
import { getTopUsers } from '../firebase/firestore';

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
  const { user, userData } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadLeaderboard = async () => {
      if (!user) return;
      try {
        const allUsers = await getTopUsers(); // now returns all sorted users
        if (active) {
          const mappedUsers = allUsers.map((u) => ({
            ...u,
            isUser: u.id === user.uid,
          }));
          
          // Find logged in user rank in the full sorted list
          const rank = mappedUsers.findIndex((u) => u.isUser) + 1 || 1;
          
          // Keep top 10 for display
          const top10 = mappedUsers.slice(0, 10);
          
          setLeaderboard(top10);
          setUserRank(rank);
        }
      } catch (err) {
        console.error('Error loading leaderboard:', err);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadLeaderboard();
    return () => {
      active = false;
    };
  }, [user, userData?.xp]);

  if (loading) {
    return (
      <MainLayout>
        <TopBar />
        <main className="flex-1 overflow-y-auto w-full">
          <div className="max-w-4xl mx-auto px-4 md:px-8 pb-28 lg:pb-12 pt-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8 animate-pulse">
              <div className="w-12 h-12 rounded-2xl bg-bg-tertiary" />
              <div className="flex flex-col gap-2">
                <div className="h-6 w-32 bg-bg-tertiary rounded-lg" />
                <div className="h-4 w-48 bg-bg-tertiary rounded-lg" />
              </div>
            </div>
            {/* Loading Grid */}
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="card p-5 flex items-center gap-4 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-bg-tertiary" />
                  <div className="w-11 h-11 rounded-full bg-bg-tertiary" />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-4 w-28 bg-bg-tertiary rounded-lg" />
                    <div className="h-3 w-20 bg-bg-tertiary rounded-lg" />
                  </div>
                  <div className="w-12 h-8 bg-bg-tertiary rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </MainLayout>
    );
  }

  const podiumOrder = [leaderboard[1], leaderboard[0], leaderboard[2]]; // 2nd, 1st, 3rd
  const podiumHeights = ['h-20', 'h-28', 'h-14'];
  const podiumHighlight = [false, true, false];
  const podiumLabels = ['2º', '1º', '3º'];

  return (
    <MainLayout>
      <TopBar />
      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-4xl mx-auto px-4 md:px-8 pb-28 lg:pb-12 pt-6">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center">
                <Trophy size={28} className="text-accent-gold fill-accent-gold/20" />
              </div>
              <div>
                <h2 className="text-text-primary text-2xl font-extrabold leading-tight">Ranking</h2>
                <p className="text-text-muted text-sm font-semibold">Compite con la comunidad</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Top 3 podium */}
            <div className="w-full lg:w-[400px] lg:sticky lg:top-24 shrink-0 px-2 mb-2 lg:mb-0">
              <div className="flex items-end justify-center gap-3 h-52">
                {podiumOrder.map((entry, podiumIdx) => {
                  const label = podiumLabels[podiumIdx];
                  const height = podiumHeights[podiumIdx];
                  const highlight = podiumHighlight[podiumIdx];
                  if (!entry) {
                    return (
                      <div key={`empty-${podiumIdx}`} className="flex flex-col items-center gap-2 flex-1 opacity-40">
                        <div className="w-12 h-12 rounded-full border border-dashed border-border flex items-center justify-center text-text-muted font-bold text-sm">
                          {label}
                        </div>
                        <p className="text-text-muted text-xs font-semibold text-center truncate w-full animate-pulse">Vacío</p>
                        <div className={`w-full ${height} rounded-t-2xl bg-bg-tertiary border border-dashed border-border`} />
                      </div>
                    );
                  }
                  return (
                    <div key={entry.id} className="flex flex-col items-center gap-2 flex-1 animate-fade-in-up" style={{ animationDelay: `${podiumIdx * 100}ms` }}>
                      <AvatarCircle name={entry.name} isUser={!!entry.isUser} size={48} />
                      <p className="text-text-secondary text-sm font-bold text-center truncate w-full px-1">
                        {entry.name}
                      </p>
                      <div
                        className={`w-full ${height} rounded-t-2xl flex flex-col items-center justify-center gap-1 border-t border-x shadow-sm
                          ${highlight
                            ? 'bg-gradient-to-t from-yellow-50 to-white border-yellow-200'
                            : 'bg-white border-border'
                          }`}
                      >
                        <MedalIcon rank={podiumIdx === 0 ? 1 : podiumIdx === 1 ? 0 : 2} />
                        <span className="text-text-primary text-xs font-extrabold">{entry.xp} XP</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Full list */}
            <div className="flex-1 w-full flex flex-col gap-3">
              {leaderboard.map((entry, idx) => (
                <div
                  key={entry.id}
                  className={`card p-4 md:p-5 flex items-center gap-4 transition-all hover:-translate-y-0.5
                    ${entry.isUser ? 'border-accent shadow-[0_0_0_1px_rgba(99,102,241,0.2)] bg-indigo-50/30' : 'hover:shadow-card-md'}`}
                >
                  {/* Rank number */}
                  <div className="w-8 flex justify-center flex-shrink-0">
                    {idx < 3 ? (
                      <MedalIcon rank={idx} />
                    ) : (
                      <span className="text-text-muted font-bold text-base">{idx + 1}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <AvatarCircle name={entry.name} isUser={!!entry.isUser} size={44} />

                  {/* Name + streak */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-extrabold text-base truncate ${entry.isUser ? 'text-accent' : 'text-text-primary'}`}>
                      {entry.name}
                      {entry.isUser && <span className="text-text-muted text-xs font-semibold ml-2 uppercase tracking-wide">Tú</span>}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Flame size={14} className="text-accent-orange" />
                      <span className="text-text-muted text-xs font-semibold">{entry.streak} días de racha</span>
                    </div>
                  </div>

                  {/* XP */}
                  <div className="text-right flex-shrink-0 flex flex-col items-end">
                    <p className="text-text-primary font-extrabold text-lg md:text-xl">{entry.xp}</p>
                    <p className="text-accent text-xs font-bold uppercase tracking-widest">XP</p>
                  </div>
                </div>
              ))}
              
              {userRank > 10 && (
                <div className="mt-4 p-4 rounded-2xl bg-bg-tertiary border border-border text-center">
                  <p className="text-text-secondary text-sm font-semibold">
                    Estás en el puesto{' '}
                    <span className="text-accent font-extrabold text-base">#{userRank}</span> del ranking. ¡Sigue aprendiendo para subir!
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>
    </MainLayout>
  );
}
