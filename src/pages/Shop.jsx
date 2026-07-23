// src/pages/Shop.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { buyShopItem } from '../firebase/firestore';
import MainLayout from '../components/layout/MainLayout';
import { 
  Heart, 
  Shield, 
  Coins, 
  Sparkles, 
  Check, 
  AlertCircle, 
  ShoppingBag,
  ArrowLeft,
  Flame
} from 'lucide-react';

export default function Shop() {
  const { user, userData, refreshUserData } = useAuth();
  const navigate = useNavigate();
  const [loadingItem, setLoadingItem] = useState(null);
  const [toast, setToast] = useState(null);

  const coins = userData?.coins || 0;
  const hearts = userData?.hearts || 0;
  const maxHearts = userData?.maxHearts || 5;
  const shields = userData?.streakShields || 0;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePurchase = async (itemType) => {
    if (!user) return;
    setLoadingItem(itemType);
    try {
      const res = await buyShopItem(user.uid, itemType);
      if (res.success) {
        await refreshUserData();
        showToast(
          itemType === 'heart_refill' 
            ? '¡Vidas recargadas con éxito!' 
            : '¡Escudo de Racha equipado con éxito!', 
          'success'
        );
      }
    } catch (error) {
      showToast(error.message || 'Error al procesar la compra', 'error');
    } finally {
      setLoadingItem(null);
    }
  };

  const items = [
    {
      id: 'heart_refill',
      title: 'Recarga de Corazones',
      description: 'Rellena tu barra de vidas al instante para seguir aprendiendo sin límites ni esperas.',
      cost: 100,
      icon: Heart,
      iconColor: '#ef4444',
      bgGradient: 'from-red-500/10 via-pink-500/5 to-transparent',
      borderColor: 'border-red-100 hover:border-red-300',
      shadowColor: 'shadow-red-500/5',
      badge: hearts === maxHearts ? 'Lleno' : null,
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      actionText: hearts >= maxHearts ? 'Tus vidas están llenas' : 'Comprar',
      disabled: hearts >= maxHearts,
      iconAnimation: 'animate-pulse-slow'
    },
    {
      id: 'streak_shield',
      title: 'Escudo de Racha',
      description: 'Protege tu racha de fuego. Si olvidas completar una lección por un día, el escudo se consumirá automáticamente para salvar tu racha.',
      cost: 300,
      icon: Shield,
      iconColor: '#06b6d4',
      bgGradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
      borderColor: 'border-cyan-100 hover:border-cyan-300',
      shadowColor: 'shadow-cyan-500/5',
      badge: shields >= 1 ? 'Equipado' : 'Máx. 1',
      badgeColor: shields >= 1 
        ? 'bg-blue-100 text-blue-700 border-blue-200' 
        : 'bg-amber-100 text-amber-700 border-amber-200',
      actionText: shields >= 1 ? 'Ya tienes un escudo equipado' : 'Comprar',
      disabled: shields >= 1,
      iconAnimation: shields >= 1 ? 'animate-bounce-slow' : ''
    }
  ];

  return (
    <MainLayout>
      <main className="flex-1 overflow-y-auto w-full relative">
        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-card-lg border animate-toast-in max-w-sm w-full bg-white/95 backdrop-blur-md border-border">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              toast.type === 'success' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'
            }`}>
              {toast.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
            </div>
            <p className="text-text-primary text-sm font-bold">{toast.message}</p>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-6 pb-28 lg:pb-12">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
            <button 
              onClick={() => navigate('/learn')}
              className="p-2 rounded-xl hover:bg-bg-tertiary border border-transparent hover:border-border transition-all text-text-muted hover:text-text-primary"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight flex items-center gap-2">
                <ShoppingBag size={28} className="text-accent" />
                Tienda de Cody
              </h1>
              <p className="text-text-muted text-sm md:text-base mt-0.5">Invierte tus monedas para potenciar tu aprendizaje.</p>
            </div>
          </div>

          {/* User Coins Stat Panel */}
          <div className="card p-6 md:p-8 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border-amber-200/50 shadow-amber-500/5 flex flex-col md:flex-row justify-between items-center gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center border border-yellow-200 shadow-sm animate-spin-slow shrink-0">
                <Coins size={30} className="text-accent-gold" />
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-widest font-extrabold">Tu Balance de Monedas</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary flex items-center justify-center md:justify-start gap-2 mt-0.5">
                  {coins} <span className="text-accent-gold text-lg md:text-xl font-bold font-mono">CodyCoins</span>
                </h2>
              </div>
            </div>

            <div className="flex gap-4 shrink-0 text-sm font-semibold">
              <div className="bg-white border border-border px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-sm">
                <Heart size={16} className="fill-accent-red text-accent-red" />
                <span className="text-text-secondary">Vidas: <strong className="text-text-primary font-extrabold">{hearts}/{maxHearts}</strong></span>
              </div>
              <div className="bg-white border border-border px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-sm">
                <Shield size={16} className="text-cyan-500 fill-cyan-500/10" />
                <span className="text-text-secondary">Escudos: <strong className="text-text-primary font-extrabold">{shields}/1</strong></span>
              </div>
            </div>
          </div>

          {/* Shop Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.id}
                  className={`card p-6 md:p-8 border flex flex-col justify-between hover:shadow-card-lg transition-all duration-300 bg-gradient-to-b ${item.bgGradient} ${item.borderColor} ${item.shadowColor}`}
                >
                  <div>
                    {/* Header Item */}
                    <div className="flex justify-between items-start mb-5">
                      <div className={`w-14 h-14 rounded-2xl bg-white border border-border/80 flex items-center justify-center shadow-sm shrink-0 ${item.iconAnimation}`}>
                        <Icon size={28} className={item.id === 'heart_refill' && hearts > 0 ? 'fill-accent-red text-accent-red' : ''} color={item.iconColor} />
                      </div>
                      
                      {item.badge && (
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg md:text-xl font-extrabold text-text-primary tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-text-muted text-xs md:text-sm leading-relaxed mt-2 mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Buy Button */}
                  <button
                    disabled={item.disabled || loadingItem === item.id}
                    onClick={() => handlePurchase(item.id)}
                    className={`w-full py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 border.5 transition-all duration-200 active:scale-[0.98] ${
                      item.disabled
                        ? 'bg-bg-tertiary border-border text-text-muted cursor-not-allowed'
                        : coins < item.cost
                          ? 'bg-bg-secondary border-border text-text-muted cursor-not-allowed hover:bg-bg-tertiary'
                          : 'bg-white border-accent/20 hover:border-accent/40 text-text-primary shadow-sm hover:shadow-md hover:bg-accent/5'
                    }`}
                  >
                    {loadingItem === item.id ? (
                      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    ) : item.disabled ? (
                      <>
                        <Check size={18} className="text-text-muted" />
                        <span>{item.actionText}</span>
                      </>
                    ) : (
                      <>
                        <span>{item.actionText} por</span>
                        <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 rounded-lg px-2 py-0.5 text-xs text-yellow-600 font-extrabold">
                          <Coins size={12} className="text-accent-gold" />
                          <span>{item.cost}</span>
                        </div>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer Notice */}
          <div className="mt-12 text-center max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-accent mx-auto mb-3">
              <Sparkles size={16} />
            </div>
            <h4 className="text-text-primary font-bold text-sm">¿Cómo ganar más monedas?</h4>
            <p className="text-text-muted text-xs leading-relaxed mt-1">
              Completa lecciones en el árbol de aprendizaje de Cody, mantén rachas de actividad diaria y obtén medallas perfectas en tus rondas de práctica. ¡Cada esfuerzo cuenta en el mundo de Cody!
            </p>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
