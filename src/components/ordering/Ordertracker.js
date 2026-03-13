import React, { useState, useEffect, useRef } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const STATUS_COLORS = {
  pending:   { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500/40', glow: 'shadow-yellow-500/20' },
  preparing: { bg: 'bg-blue-500',   text: 'text-blue-400',   border: 'border-blue-500/40',   glow: 'shadow-blue-500/20'   },
  ready:     { bg: 'bg-green-500',  text: 'text-green-400',  border: 'border-green-500/40',  glow: 'shadow-green-500/20'  },
  completed: { bg: 'bg-zinc-500',   text: 'text-zinc-400',   border: 'border-zinc-500/40',   glow: 'shadow-zinc-500/20'   },
};

const STATUS_LABELS = {
  pending:   'Pending',
  preparing: 'Being Prepared',
  ready:     'Ready!',
  completed: 'Completed',
};

const playReadySound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.15 + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.15 + 0.3);
      osc.start(ctx.currentTime + i * 0.15);
      osc.stop(ctx.currentTime + i * 0.15 + 0.35);
    });
  } catch (e) {
    console.log('Audio not supported');
  }
};

const CounterIcon = ({ size = 48, color = '#22c55e' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
    <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/>
    <path d="M12 12v5"/>
    <path d="M8 12v2"/>
    <path d="M16 12v2"/>
  </svg>
);

const DeliveryIcon = ({ size = 48, color = '#60a5fa' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const PickupIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
    <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/>
  </svg>
);

const TableIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7h18"/>
    <path d="M3 7v13"/>
    <path d="M21 7v13"/>
    <path d="M6 20v-5"/>
    <path d="M18 20v-5"/>
    <path d="M6 15h12"/>
  </svg>
);

const OrderTracker = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [readyOrder, setReadyOrder] = useState(null);
  const prevStatusRef = useRef({});
  const pollingRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    fetchOrders();
    pollingRef.current = setInterval(fetchOrders, 5000);
    return () => clearInterval(pollingRef.current);
  }, [user]);

 const fetchOrders = async () => {
  try {
    const res = await api.get('/orders/mine');
    const incoming = res.data;

    const isFirstLoad = Object.keys(prevStatusRef.current).length === 0;

    if (!isFirstLoad) {
      incoming.forEach(order => {
        const prev = prevStatusRef.current[order.id];
        // Trigger popup: status changed TO ready
        if (prev && prev !== 'ready' && order.status === 'ready') {
          setReadyOrder(order);
          playReadySound();
        }
        // Also trigger for brand new orders that come in already ready
        if (!prev && order.status === 'ready') {
          setReadyOrder(order);
          playReadySound();
        }
      });
    }

    const newStatuses = {};
    incoming.forEach(o => { newStatuses[o.id] = o.status; });
    prevStatusRef.current = newStatuses;
    setOrders(incoming);
  } catch (err) {
    console.error('Order polling failed');
  }
};

  if (!user) return null;

  const activeOrders = orders.filter(o => o.status !== 'completed');
  const hasActive = activeOrders.length > 0;
  const hasReady = activeOrders.some(o => o.status === 'ready');
  const isPickup = readyOrder?.delivery_type === 'counter';

  return (
    <>
      {/* ─── FLOATING BADGE ─── */}
      {hasActive && (
        <button
          onClick={() => setShowPanel(true)}
          className={`fixed bottom-28 right-8 z-40 flex items-center gap-3 px-5 py-3 rounded-2xl border-2 shadow-xl transition-all hover:scale-105 active:scale-95 ${
            hasReady
              ? 'bg-green-950 border-green-500/60 shadow-green-500/30'
              : 'bg-zinc-950 border-white/10 shadow-black/40'
          }`}
        >
          <div className={`w-2 h-2 rounded-full animate-pulse ${hasReady ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
          <div className="text-left">
            <p className={`font-black uppercase text-[10px] tracking-widest ${hasReady ? 'text-green-400' : 'text-yellow-400'}`}>
              {hasReady ? 'Order Ready!' : 'Order in Progress'}
            </p>
            <p className="text-zinc-500 font-bold text-[9px] uppercase tracking-widest">
              {activeOrders.length} active order{activeOrders.length > 1 ? 's' : ''}
            </p>
          </div>
          <ChevronRight />
        </button>
      )}

      {/* ─── ORDER STATUS PANEL ─── */}
      {showPanel && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={() => setShowPanel(false)}></div>
          <div className="fixed bottom-0 left-0 right-0 z-[70] bg-zinc-950 border-t border-white/10 rounded-t-[2.5rem] p-6 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">Your Orders</p>
                <h2 className="text-2xl font-black italic uppercase text-white">Order Status</h2>
              </div>
              <button onClick={() => setShowPanel(false)} className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <CloseIcon />
              </button>
            </div>

            <div className="space-y-4">
              {orders.length === 0 && (
                <p className="text-zinc-500 font-black italic uppercase tracking-widest text-center py-8">No orders yet!</p>
              )}
              {orders.map(order => {
                const col = STATUS_COLORS[order.status];
                return (
                  <div key={order.id} className={`bg-zinc-900 border rounded-2xl p-5 shadow-lg ${col.border} ${order.status === 'ready' ? `shadow-xl ${col.glow}` : ''}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-black italic uppercase text-white">{order.order_number}</h3>
                        <div className="flex items-center gap-1 mt-1 text-zinc-500">
                          {order.delivery_type === 'counter' ? <PickupIcon /> : <TableIcon />}
                          <p className="font-bold uppercase text-[10px] tracking-widest">
                            {order.delivery_type === 'counter' ? 'Counter Pickup' : `Table ${order.table_number}`}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${col.text} ${col.border} bg-zinc-800`}>
                        {STATUS_LABELS[order.status]}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex gap-1 mb-4">
                      {['pending', 'preparing', 'ready', 'completed'].map((s, i) => {
                        const currentIdx = ['pending', 'preparing', 'ready', 'completed'].indexOf(order.status);
                        return (
                          <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${i <= currentIdx ? col.bg : 'bg-zinc-700'}`}></div>
                        );
                      })}
                    </div>

                    {/* Items */}
                    <div className="space-y-1 mb-3">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-zinc-300 font-bold uppercase">{item.quantity}x {item.item_name}</span>
                          <span className="text-red-400 font-mono">₱{parseFloat(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">
                        {new Date(order.created_at).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-white font-black font-mono text-sm">₱{parseFloat(order.total).toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* ─── READY NOTIFICATION POPUP ─── */}
      {readyOrder && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
          <div className={`relative z-10 w-full max-w-sm bg-zinc-950 border-2 rounded-[2.5rem] p-10 shadow-2xl text-center overflow-hidden ${
            isPickup ? 'border-green-500/50' : 'border-blue-500/50'
          }`}>
            <div className={`absolute inset-0 pointer-events-none ${isPickup ? 'bg-green-500/5' : 'bg-blue-500/5'}`}></div>
            <div className={`absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 blur-[80px] rounded-full pointer-events-none ${isPickup ? 'bg-green-500/20' : 'bg-blue-500/20'}`}></div>

            {/* Animated Icon */}
            <div className={`relative z-10 w-28 h-28 rounded-full border-2 flex items-center justify-center mx-auto mb-6 animate-bounce ${
              isPickup ? 'bg-green-500/20 border-green-500' : 'bg-blue-500/20 border-blue-500'
            }`}>
              {isPickup ? <CounterIcon size={48} color="#22c55e" /> : <DeliveryIcon size={48} color="#60a5fa" />}
            </div>

            {/* Title */}
            <p className={`relative z-10 font-black uppercase tracking-[0.4em] text-[10px] mb-2 ${isPickup ? 'text-green-400' : 'text-blue-400'}`}>
              {isPickup ? 'Ready for Pickup!' : 'On Its Way!'}
            </p>
            <h2 className="relative z-10 text-4xl font-black italic uppercase text-white tracking-tighter mb-2">
              {readyOrder.order_number}
            </h2>
            <p className="relative z-10 text-zinc-400 font-bold uppercase tracking-widest text-xs mb-6">
              Hey {readyOrder.customer_name}!
            </p>

            {/* Message Card */}
            <div className={`relative z-10 rounded-2xl p-4 mb-8 border flex items-center gap-4 text-left ${
              isPickup ? 'bg-green-950/50 border-green-500/30' : 'bg-blue-950/50 border-blue-500/30'
            }`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isPickup ? 'bg-green-500/20' : 'bg-blue-500/20'}`}>
                {isPickup
                  ? <CounterIcon size={24} color="#22c55e" />
                  : <DeliveryIcon size={24} color="#60a5fa" />
                }
              </div>
              <div>
                <p className={`font-black uppercase text-xs tracking-widest ${isPickup ? 'text-green-400' : 'text-blue-400'}`}>
                  {isPickup ? 'Order Ready to Pickup' : 'Order is On Your Way'}
                </p>
                <p className="text-zinc-300 font-bold text-xs mt-1 leading-relaxed">
                  {isPickup
                    ? 'Please proceed to the counter to collect your order.'
                    : `Your order is being delivered to Table ${readyOrder.table_number}.`
                  }
                </p>
              </div>
            </div>

            <button
              onClick={() => setReadyOrder(null)}
              className={`relative z-10 w-full py-5 rounded-2xl font-black text-white italic uppercase tracking-widest text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-xl ${
                isPickup
                  ? 'bg-green-600 hover:bg-green-500 shadow-green-900/30'
                  : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/30'
              }`}
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderTracker;