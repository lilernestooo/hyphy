import React from 'react';

const IMAGE_BASE = 'http://127.0.0.1:8000/storage/';

const MenuCard = ({ item, onAdd }) => {
  return (
    <div className="relative group bg-zinc-900/40 backdrop-blur-md border border-red-900/20 rounded-2xl hover:border-red-500 transition-all duration-300 overflow-hidden">
      
      {/* Image */}
      <div className="w-full h-48 bg-zinc-900 relative overflow-hidden">
        {item.image ? (
          <img 
            src={`${IMAGE_BASE}${item.image}`}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-zinc-700 font-black italic uppercase text-xs tracking-widest">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase">{item.category}</span>
            <h3 className="text-xl font-black text-white uppercase italic group-hover:text-red-500 transition-colors">
              {item.name}
            </h3>
          </div>
          <span className="text-xl font-mono font-bold text-white">${item.price}</span>
        </div>
        
        <p className="text-zinc-500 text-sm mt-2 mb-6 leading-relaxed">
          {item.desc}
        </p>

        <button 
          onClick={() => onAdd(item)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-black uppercase text-xs rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default MenuCard;