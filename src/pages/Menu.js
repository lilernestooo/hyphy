import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import MenuCard from '../components/ordering/MenuCard';
import Cart from '../components/ordering/Cart';
import GraffitiImg from '../assets/images/grafity.jpg';

const Menu = () => {
const [cart, setCart] = useState([]);
const clearCart = () => setCart([]); // ← add this line
const [activeCategory, setActiveCategory] = useState('All');
const [menuItems, setMenuItems] = useState([]);
const [loadingItems, setLoadingItems] = useState(true);

useEffect(() => {
  api.get('/menu-items')
    .then(res => setMenuItems(res.data))
    .catch(err => console.error(err))
    .finally(() => setLoadingItems(false));
}, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // Filter logic for Categories
  const categories = ['All', 'Food', 'Drinks'];
  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Background Graffiti Tags
  const tags = [
    { text: "WE ABOUT TO GO WASTED", pos: "top-[12%] left-[5%]", rotate: "-rotate-12", color: "text-red-500" },
    { text: "WE GO DRINK ALL NIGHT", pos: "bottom-[25%] right-[8%]", rotate: "rotate-6", color: "text-orange-500" },
    { text: "F*CK IM GONNA DRINK ALL NIGHT", pos: "top-[20%] right-[5%]", rotate: "-rotate-3", color: "text-red-600" },
    { text: "HYPHY ENERGY", pos: "bottom-[18%] left-[10%]", rotate: "rotate-12", color: "text-white" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
      
      {/* 1. THE STABLE BACKGROUND LAYER */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <div 
          className="absolute inset-0 w-full h-full opacity-30 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${GraffitiImg})`,
            filter: 'contrast(130%) brightness(50%) grayscale(30%)'
          }}
        ></div>
        {/* Subtle red tint overlay */}
        <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply"></div>
      </div>

      {/* 2. THE "WASTED" TAGS - Background Layer (z-1) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-[1] overflow-hidden">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className={`absolute ${tag.pos} ${tag.rotate} ${tag.color} font-black italic text-3xl md:text-6xl tracking-tighter uppercase opacity-40 animate-pulse`}
            style={{ 
              animationDelay: `${index * 0.7}s`,
              textShadow: '2px 2px 0px rgba(0,0,0,1), 0 0 15px rgba(220,38,38,0.2)' 
            }}
          >
            {tag.text}
          </span>
        ))}
      </div>

      {/* 3. AMBIENT RED GLOW */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[120vw] h-[100vh] bg-red-600/10 blur-[160px] rounded-full z-0 pointer-events-none"></div>

      {/* 4. MAIN CONTENT LAYER (z-10) */}
      <div className="relative z-10 px-6 pt-32 pb-60 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex flex-col gap-2">
            <span className="text-red-600 font-black tracking-[0.5em] uppercase text-[10px] ml-1">
              Premium Selection
            </span>
            <h1 className="text-7xl md:text-9xl font-black italic text-white tracking-tighter uppercase leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              THE <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">LIST</span>
            </h1>
          </div>
          
          <div className="h-1.5 w-32 bg-red-600 mt-6 mb-10"></div>
          
          {/* Category Tabs */}
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-10 py-3 rounded-xl font-black uppercase italic tracking-widest text-[10px] transition-all border-2 ${
                  activeCategory === cat 
                  ? 'bg-red-600 border-red-500 text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] scale-105' 
                  : 'bg-zinc-900/80 border-white/5 text-zinc-500 hover:border-red-600/50 hover:text-white backdrop-blur-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>
        
        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="hover:scale-[1.02] transition-transform duration-300">
              <MenuCard 
                item={item} 
                onAdd={addToCart} 
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-zinc-600 font-black italic uppercase tracking-[0.3em] text-xl animate-pulse">
              Sold out for the night...
            </p>
          </div>
        )}
      </div>

      {/* Floating Cart Component (z-50) */}
      <div className="relative z-50">
        <Cart 
          items={cart} 
          onRemove={removeFromCart} 
          onClear={clearCart}
          total={totalPrice} 
        />
      </div>

      {/* Edge Blending Gradients */}
      <div className="fixed top-0 left-0 w-full h-40 bg-gradient-to-b from-black via-black/40 to-transparent z-20 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
    </div>
  );
};

export default Menu;