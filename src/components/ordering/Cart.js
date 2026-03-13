import React, { useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const Cart = ({ items, onRemove, onClear, total }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_name: user?.name || '',
    delivery_type: 'counter',
    table_number: '',
  });

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const orderItems = items.map(item => ({
        name: item.name,
        price: parseFloat(item.price),
        quantity: item.quantity || 1,
        type: item.category === 'Coffee' || item.category === 'Pastries' ? 'cafe' : 'menu',
      }));

      const res = await api.post('/orders', {
        customer_name: form.customer_name,
        delivery_type: form.delivery_type,
        table_number: form.delivery_type === 'table' ? form.table_number : null,
        items: orderItems,
      });

      setPlacedOrder(res.data.order);
      setShowCheckout(false);
      setShowConfirmation(true);
      onClear();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <>
      {/* ─── FLOATING CART BUTTON ─── */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-red-600 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.5)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
          <path d="M3 6h18"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-red-600 rounded-full text-[10px] font-black flex items-center justify-center shadow-lg">
            {itemCount}
          </span>
        )}
      </button>

      {/* ─── OVERLAY ─── */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={() => setIsOpen(false)}></div>
      )}

      {/* ─── SLIDE-OUT CART DRAWER ─── */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 z-[70] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="bg-red-600 p-6 flex justify-between items-center">
          <div>
            <p className="text-white/70 font-black uppercase text-[10px] tracking-widest">Your Order</p>
            <h2 className="text-white font-black italic uppercase text-2xl tracking-tighter">{itemCount} Items</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p className="text-zinc-500 font-black italic uppercase tracking-widest text-sm">Your order is empty!</p>
              <p className="text-zinc-700 font-bold uppercase tracking-widest text-[10px] mt-2">Add items from the menu</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-zinc-900 rounded-2xl p-4 border border-white/5">
                <div className="flex-1">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{item.category}</p>
                  <p className="text-white font-black uppercase text-sm tracking-tight">{item.name}</p>
                  <p className="text-red-400 font-mono font-bold text-sm mt-1">₱{parseFloat(item.price).toFixed(2)}</p>
                </div>
                <button onClick={() => onRemove(index)} className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-red-600/20 border border-white/5 hover:border-red-600/40 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-zinc-950">
            <div className="flex justify-between items-center mb-6">
              <span className="text-zinc-400 font-black uppercase tracking-widest text-xs">Total</span>
              <span className="text-white font-black italic text-2xl">₱{parseFloat(total).toFixed(2)}</span>
            </div>
            <button
              onClick={() => { setIsOpen(false); setShowCheckout(true); }}
              className="w-full py-5 bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-sm shadow-xl shadow-red-900/20 hover:scale-[1.02] active:scale-95"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* ─── CHECKOUT MODAL ─── */}
      {showCheckout && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowCheckout(false)}></div>
          <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-red-600/10 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">Almost Done</p>
                <h2 className="text-2xl font-black italic uppercase text-white">Confirm Order</h2>
              </div>
              <button onClick={() => setShowCheckout(false)} className="text-zinc-500 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-zinc-900 rounded-2xl p-4 mb-6 space-y-2 max-h-40 overflow-y-auto">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-zinc-300 font-bold uppercase">{item.name}</span>
                  <span className="text-red-400 font-mono font-bold">₱{parseFloat(item.price).toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-white/10 flex justify-between">
                <span className="text-white font-black uppercase text-xs">Total</span>
                <span className="text-red-400 font-black font-mono">₱{parseFloat(total).toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-5 relative z-10">
              {/* Name */}
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-3">Your Name</label>
                <input
                  type="text"
                  value={form.customer_name}
                  onChange={e => setForm({ ...form, customer_name: e.target.value })}
                  placeholder="FULL NAME"
                  className="w-full bg-black/60 border border-white/10 p-4 rounded-2xl text-white focus:border-red-600 outline-none text-xs font-bold uppercase placeholder:text-zinc-800"
                />
              </div>

              {/* Delivery Type */}
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-3">Receive Order Via</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, delivery_type: 'counter' })}
                    className={`py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all border-2 ${
                      form.delivery_type === 'counter'
                        ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                        : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-red-600/40'
                    }`}
                  >
                    🏪 Counter Pickup
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, delivery_type: 'table' })}
                    className={`py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all border-2 ${
                      form.delivery_type === 'table'
                        ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                        : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-red-600/40'
                    }`}
                  >
                    🪑 Table Delivery
                  </button>
                </div>
              </div>

              {/* Table Number */}
              {form.delivery_type === 'table' && (
                <div>
                  <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-3">Table Number</label>
                  <input
                    type="text"
                    value={form.table_number}
                    onChange={e => setForm({ ...form, table_number: e.target.value })}
                    placeholder="E.G. TABLE 3 / C2"
                    className="w-full bg-black/60 border border-white/10 p-4 rounded-2xl text-white focus:border-red-600 outline-none text-xs font-bold uppercase placeholder:text-zinc-800"
                  />
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading || !form.customer_name || (form.delivery_type === 'table' && !form.table_number)}
                className="w-full py-5 bg-red-600 rounded-2xl font-black text-white italic tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm"
              >
                {loading ? 'Placing Order...' : 'Place Order 🔥'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── ORDER CONFIRMATION POPUP ─── */}
      {showConfirmation && placedOrder && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
          <div className="relative z-10 w-full max-w-sm bg-zinc-950 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl text-center overflow-hidden">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none"></div>

            {/* Icon */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-6">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <p className="text-green-400 font-black uppercase tracking-[0.4em] text-[10px] mb-2 relative z-10">Order Confirmed!</p>
            <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter mb-2 relative z-10">
              {placedOrder.order_number}
            </h2>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-6 relative z-10 leading-relaxed">
              Hey {placedOrder.customer_name}, your order is being prepared!
            </p>

            {/* Delivery Info */}
            <div className="relative z-10 bg-zinc-900 rounded-2xl p-4 mb-8 text-left">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{placedOrder.delivery_type === 'counter' ? '🏪' : '🪑'}</span>
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Receive via</p>
                  <p className="text-white font-black uppercase text-sm">
                    {placedOrder.delivery_type === 'counter' ? 'Counter Pickup' : `Table ${placedOrder.table_number}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">₱</span>
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total</p>
                  <p className="text-white font-black text-sm">₱{parseFloat(placedOrder.total).toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="relative z-10 flex items-center justify-center gap-2 mb-8">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <p className="text-yellow-500 font-black uppercase tracking-widest text-[10px]">Staff is preparing your order...</p>
            </div>

            <button
              onClick={() => setShowConfirmation(false)}
              className="relative z-10 w-full py-4 bg-red-600 rounded-2xl font-black text-white italic uppercase tracking-widest text-sm hover:bg-red-500 transition-all"
            >
              Got It! 🔥
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;