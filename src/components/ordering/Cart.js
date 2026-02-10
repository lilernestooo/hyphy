import React from 'react';

const Cart = ({ items, onRemove, total }) => {
  return (
    <div className="fixed bottom-8 right-8 z-50 w-80 bg-black border-2 border-red-600 rounded-3xl shadow-[0_0_40px_rgba(220,38,38,0.3)] overflow-hidden">
      <div className="bg-red-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2 font-black italic uppercase text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          Your Order
        </div>
        <span className="bg-black/20 px-2 py-1 rounded text-[10px] font-bold">{items.length} Items</span>
      </div>
      
      <div className="max-h-60 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-zinc-500 text-center text-sm py-4 italic uppercase font-bold tracking-tighter">Stay Hyphy, add a drink!</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <span className="text-white text-xs font-bold uppercase tracking-tight">{item.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-red-500 font-mono text-sm font-bold">${item.price}</span>
                <button onClick={() => onRemove(index)} className="text-zinc-600 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 bg-zinc-900 border-t border-red-900/50">
        <div className="flex justify-between mb-4 font-black text-xl uppercase italic">
          <span className="text-zinc-400">Total:</span>
          <span className="text-red-500">${total}</span>
        </div>
        <button className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-sm shadow-xl shadow-red-900/20">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;