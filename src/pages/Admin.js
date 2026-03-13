import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const TABS = ['Menu Items', 'Cafe Items', 'Events', 'Orders'];
const IMAGE_BASE = 'http://127.0.0.1:8000/storage/';

const emptyMenu  = { name: '', category: 'Food',   price: '', desc: '', image: null, is_available: true };
const emptyCafe  = { name: '', category: 'Coffee',  price: '', desc: '', image: null, is_available: true };
const emptyEvent = { title: '', type: 'DJ SET', sub: '', date: '', time: '', host: '', desc: '', color: 'from-red-600 to-black', image: null, is_active: true };

const STATUS_FLOW   = ['pending', 'preparing', 'ready', 'completed'];
const STATUS_CONFIG = {
  pending:   { label: 'Pending',   color: '#eab308', bg: 'bg-yellow-500', dim: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400', header: 'border-yellow-500/40' },
  preparing: { label: 'Preparing', color: '#3b82f6', bg: 'bg-blue-500',   dim: 'bg-blue-500/10 border-blue-500/30 text-blue-400',       header: 'border-blue-500/40'   },
  ready:     { label: 'Ready',     color: '#22c55e', bg: 'bg-green-500',  dim: 'bg-green-500/10 border-green-500/30 text-green-400',     header: 'border-green-500/40'  },
  completed: { label: 'Completed', color: '#71717a', bg: 'bg-zinc-500',   dim: 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400',        header: 'border-zinc-500/40'   },
};

const menuCategories = ['Food', 'Drinks'];
const cafeCategories = ['Coffee', 'Pastries', 'Food'];
const eventTypes     = ['DJ SET', 'PARTY', 'PREMIUM', 'FOOD'];
const eventColors    = [
  { label: 'Red',    value: 'from-red-600 to-black'      },
  { label: 'Orange', value: 'from-orange-500 to-red-900' },
  { label: 'Purple', value: 'from-purple-900 to-black'   },
  { label: 'White',  value: 'from-zinc-100 to-red-600'   },
];

const PlusIcon    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const CloseIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const EditIcon    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const TrashIcon   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
const UploadIcon  = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const CounterIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/></svg>;
const TableIcon   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7h18"/><path d="M3 7v13"/><path d="M21 7v13"/><path d="M6 20v-5"/><path d="M18 20v-5"/><path d="M6 15h12"/></svg>;
const DragIcon    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="9" cy="5" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="19" r="1" fill="currentColor"/><circle cx="15" cy="5" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="19" r="1" fill="currentColor"/></svg>;

// ── Lazy Image with fade-in ──
const LazyImage = ({ src, alt, className, style }) => {
  const [loaded, setLoaded] = useState(false);
  const [error,  setError]  = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
    setError(false);
    if (!src) return;

    // Use IntersectionObserver for true lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current) {
          imgRef.current.src = src;
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#1c1c20', ...style }}>
      {!loaded && !error && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #1c1c20 25%, #27272a 50%, #1c1c20 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.4s infinite',
        }} />
      )}
      <img
        ref={imgRef}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {error && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#27272a', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>No Image</span>
        </div>
      )}
    </div>
  );
};

export default function Admin() {
  const { user }  = useAuth();
  const navigate  = useNavigate();

  const [activeTab,    setActiveTab]    = useState('Menu Items');
  const [menuItems,    setMenuItems]    = useState([]);
  const [cafeItems,    setCafeItems]    = useState([]);
  const [events,       setEvents]       = useState([]);
  const [orders,       setOrders]       = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [showForm,     setShowForm]     = useState(false);
  const [editItem,     setEditItem]     = useState(null);
  const [form,         setForm]         = useState(emptyMenu);
  const [imagePreview, setImagePreview] = useState(null);
  const [toast,        setToast]        = useState(null);
  const [newOrderIds,  setNewOrderIds]  = useState([]);
  const [dragOverCol,  setDragOverCol]  = useState(null);
  const [draggingId,   setDraggingId]   = useState(null);

  // FIX: track drag counter per column to avoid child element flickering
  const dragCounters = useRef({});

  const prevOrderIdsRef = useRef([]);
  const pollingRef      = useRef(null);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 2000);
  };

  useEffect(() => {
    if (user && user.role !== 'admin') navigate('/');
    if (!user) navigate('/auth');
  }, [user, navigate]);

  useEffect(() => { fetchAll(); }, []);

  useEffect(() => {
    fetchOrders();
    pollingRef.current = setInterval(fetchOrders, 1500);
    return () => clearInterval(pollingRef.current);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/admin/orders');
      const incoming = res.data;
      const incomingIds = incoming.map(o => o.id);
      const prevIds = prevOrderIdsRef.current;
      const brandNew = incomingIds.filter(id => prevIds.length > 0 && !prevIds.includes(id));
      if (brandNew.length > 0) {
        setNewOrderIds(prev => [...prev, ...brandNew]);
        setTimeout(() => setNewOrderIds(prev => prev.filter(id => !brandNew.includes(id))), 2000);
      }
      prevOrderIdsRef.current = incomingIds;
      setOrders(incoming);
    } catch { console.error('Failed to fetch orders'); }
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [m, c, e] = await Promise.all([api.get('/menu-items'), api.get('/cafe-items'), api.get('/events')]);
      setMenuItems(m.data); setCafeItems(c.data); setEvents(e.data);
    } catch { showToast('error', 'Failed to fetch data.'); }
    finally { setLoading(false); }
  };

  const updateOrderStatus = async (order, newStatus) => {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
    try {
      await api.patch(`/admin/orders/${order.id}`, { status: newStatus });
      showToast('success', `${order.order_number} → ${STATUS_CONFIG[newStatus].label}`);
    } catch {
      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: order.status } : o));
      showToast('error', 'Failed to update status.');
    }
  };

  // ── DRAG AND DROP (fixed with counter approach) ──
  const handleDragStart = (e, order) => {
    setDraggingId(order.id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('orderId', String(order.id));
    e.dataTransfer.setData('currentStatus', order.status);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverCol(null);
    dragCounters.current = {};
  };

  // Use dragEnter/dragLeave with a counter so child elements don't trigger false leaves
  const handleDragEnter = (e, status) => {
    e.preventDefault();
    dragCounters.current[status] = (dragCounters.current[status] || 0) + 1;
    setDragOverCol(status);
  };

  const handleDragLeave = (e, status) => {
    dragCounters.current[status] = (dragCounters.current[status] || 1) - 1;
    if (dragCounters.current[status] <= 0) {
      dragCounters.current[status] = 0;
      setDragOverCol(prev => prev === status ? null : prev);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const orderId     = parseInt(e.dataTransfer.getData('orderId'));
    const currentStatus = e.dataTransfer.getData('currentStatus');
    // Reset all counters for this column
    dragCounters.current[newStatus] = 0;
    setDragOverCol(null);
    setDraggingId(null);
    if (currentStatus === newStatus) return;
    const order = orders.find(o => o.id === orderId);
    if (order) updateOrderStatus(order, newStatus);
  };

  const getEndpoint  = () => activeTab === 'Menu Items' ? 'menu-items' : activeTab === 'Cafe Items' ? 'cafe-items' : 'events';
  const getItems     = () => activeTab === 'Menu Items' ? menuItems : activeTab === 'Cafe Items' ? cafeItems : events;
  const getEmptyForm = () => activeTab === 'Menu Items' ? emptyMenu : activeTab === 'Cafe Items' ? emptyCafe : emptyEvent;

  const openCreate = () => { setEditItem(null); setForm(getEmptyForm()); setImagePreview(null); setShowForm(true); };
  const openEdit   = (item) => { setEditItem(item); setForm({ ...item, image: null }); setImagePreview(item.image ? IMAGE_BASE + item.image : null); setShowForm(true); };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setForm({ ...form, image: file }); setImagePreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    Object.keys(form).forEach(key => {
      if (key === 'image' && form.image instanceof File) fd.append('image', form.image);
      else if (key !== 'image') fd.append(key, typeof form[key] === 'boolean' ? (form[key] ? 1 : 0) : form[key]);
    });
    try {
      if (editItem) {
        fd.append('_method', 'PUT');
        await api.post(`/admin/${getEndpoint()}/${editItem.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        showToast('success', 'Item updated!');
      } else {
        await api.post(`/admin/${getEndpoint()}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        showToast('success', 'Item created!');
      }
      setShowForm(false); fetchAll();
    } catch (err) { showToast('error', err.response?.data?.message || 'Something went wrong.'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try { await api.delete(`/admin/${getEndpoint()}/${id}`); showToast('success', 'Deleted.'); fetchAll(); }
    catch { showToast('error', 'Failed to delete.'); }
  };

  const pendingCount = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="min-h-screen text-white" style={{ background: '#111113', fontFamily: "'Arial Black', Arial, sans-serif" }}>

      <style>{`
        .inp {
          width: 100%;
          background: #09090b;
          border: 1px solid #27272a;
          padding: 11px 13px;
          color: white;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          outline: none;
          transition: border-color 0.1s;
        }
        .inp:focus { border-color: #dc2626; }
        .inp::placeholder { color: #3f3f46; }
        option { background: #09090b; }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* ── TOAST ── */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[500] px-5 py-3 text-xs font-black uppercase tracking-widest border-l-4 shadow-2xl ${
          toast.type === 'success' ? 'bg-zinc-800 border-green-500 text-green-400' : 'bg-zinc-800 border-red-500 text-red-400'
        }`}>
          {toast.type === 'success' ? '✓' : '✗'} {toast.msg}
        </div>
      )}

      {/* ── SLIDE-IN FORM ── */}
      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-start justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowForm(false)}></div>
          <div className="relative z-10 w-full max-w-md h-full flex flex-col overflow-y-auto" style={{ background: '#18181b', borderLeft: '1px solid #27272a' }}>
            <div className="sticky top-0 z-10 px-8 py-6 flex justify-between items-center" style={{ background: '#18181b', borderBottom: '1px solid #27272a' }}>
              <div>
                <p className="text-red-500 text-[9px] font-black uppercase tracking-[0.4em]">{editItem ? 'Editing' : 'New'}</p>
                <h2 className="text-xl font-black uppercase text-white">{activeTab === 'Events' ? 'Event' : 'Item'}</h2>
              </div>
              <button onClick={() => setShowForm(false)} className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white transition-colors" style={{ border: '1px solid #27272a' }}>
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 p-8 gap-6">
              <div>
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-3">Image</label>
                <div className="relative h-44 overflow-hidden cursor-pointer" style={{ border: '2px dashed #3f3f46', background: '#09090b' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#dc2626'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#3f3f46'}>
                  {imagePreview
                    ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex flex-col items-center justify-center gap-3"><UploadIcon /><p className="text-zinc-600 font-black uppercase text-[10px] tracking-widest">Upload Image</p></div>
                  }
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                {imagePreview && <button type="button" onClick={() => { setImagePreview(null); setForm({ ...form, image: null }); }} className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-400">Remove</button>}
              </div>

              {activeTab !== 'Events' && (<>
                <Field label="Name"><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="inp" /></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Category">
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="inp appearance-none">
                      {(activeTab === 'Menu Items' ? menuCategories : cafeCategories).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Price (₱)"><input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required className="inp" /></Field>
                </div>
                <Field label="Description"><textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} rows={3} className="inp resize-none" /></Field>
                <label className="flex items-center gap-3 cursor-pointer" onClick={() => setForm({ ...form, is_available: !form.is_available })}>
                  <div className={`w-10 h-5 relative transition-colors ${form.is_available ? 'bg-red-600' : 'bg-zinc-700'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white transition-all ${form.is_available ? 'left-5' : 'left-0.5'}`}></div>
                  </div>
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Available</span>
                </label>
              </>)}

              {activeTab === 'Events' && (<>
                <Field label="Title"><input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="inp" /></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Type">
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="inp appearance-none">
                      {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Subtitle"><input type="text" value={form.sub} onChange={e => setForm({ ...form, sub: e.target.value })} className="inp" /></Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Date"><input type="text" placeholder="MAR 14, 2026" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required className="inp" /></Field>
                  <Field label="Time"><input type="text" placeholder="9PM–5AM" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="inp" /></Field>
                </div>
                <Field label="Host"><input type="text" value={form.host} onChange={e => setForm({ ...form, host: e.target.value })} className="inp" /></Field>
                <Field label="Description"><textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} rows={3} className="inp resize-none" /></Field>
                <Field label="Card Color">
                  <select value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className="inp appearance-none">
                    {eventColors.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </Field>
              </>)}

              <button type="submit" disabled={loading} className="mt-auto w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-xs disabled:opacity-40 transition-colors">
                {loading ? 'Saving...' : editItem ? 'Update' : 'Create'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div className="px-8 pt-28 pb-6" style={{ borderBottom: '1px solid #27272a' }}>
        <div className="max-w-screen-2xl mx-auto flex items-end justify-between">
          <div>
            <p className="text-red-600 text-[9px] font-black uppercase tracking-[0.5em] mb-1">Admin Panel</p>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white leading-none">
              BODEGA <span className="text-red-600">CONTROL</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Menu',    val: menuItems.length,  color: '#fff'    },
              { label: 'Cafe',    val: cafeItems.length,  color: '#fff'    },
              { label: 'Events',  val: events.length,     color: '#fff'    },
              { label: 'Pending', val: pendingCount,      color: '#eab308' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black" style={{ color: s.color }}>{s.val}</p>
                <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#52525b' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="px-8" style={{ borderBottom: '1px solid #27272a' }}>
        <div className="max-w-screen-2xl mx-auto flex">
          {TABS.map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setShowForm(false); }}
              className="relative px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-colors"
              style={{ color: activeTab === tab ? '#fff' : '#52525b', borderBottom: activeTab === tab ? '2px solid #dc2626' : '2px solid transparent' }}>
              {tab}
              {tab === 'Orders' && pendingCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-yellow-500 text-black text-[9px] font-black">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-screen-2xl mx-auto px-8 py-8">

        {/* ── KANBAN ── */}
        {activeTab === 'Orders' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-500 text-[10px] font-black uppercase tracking-widest">Live · drag cards between columns to update status</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {STATUS_FLOW.map(status => {
                const cfg = STATUS_CONFIG[status];
                const colOrders = orders.filter(o => o.status === status);
                const isOver = dragOverCol === status;

                return (
                  <div key={status}
                    onDragEnter={e => handleDragEnter(e, status)}
                    onDragLeave={e => handleDragLeave(e, status)}
                    onDragOver={handleDragOver}
                    onDrop={e => handleDrop(e, status)}
                    className="flex flex-col min-h-[72vh] transition-all"
                    style={{
                      background: isOver ? 'rgba(255,255,255,0.03)' : '#16161a',
                      border: isOver ? `2px solid ${cfg.color}` : '1px solid #27272a',
                      borderRadius: 0,
                    }}>

                    {/* Column Header */}
                    <div className="px-4 py-3 flex items-center justify-between sticky top-0 z-10" style={{ background: '#16161a', borderBottom: `2px solid ${cfg.color}33` }}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 ${cfg.bg}`}></div>
                        <span className="text-xs font-black uppercase tracking-widest text-white">{cfg.label}</span>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-black border ${cfg.dim}`}>{colOrders.length}</span>
                    </div>

                    {/* Drop hint */}
                    {isOver && (
                      <div className="mx-3 mt-3 py-4 text-center" style={{ border: `2px dashed ${cfg.color}60` }}>
                        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: cfg.color }}>Drop here</p>
                      </div>
                    )}

                    {/* Cards */}
                    <div className="flex-1 p-3 space-y-3">
                      {colOrders.length === 0 && !isOver && (
                        <div className="py-16 text-center">
                          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#3f3f46' }}>Empty</p>
                          <p className="text-[9px] font-bold uppercase tracking-widest mt-1" style={{ color: '#27272a' }}>Drag orders here</p>
                        </div>
                      )}

                      {colOrders.map(order => (
                        <div key={order.id}
                          draggable
                          onDragStart={e => handleDragStart(e, order)}
                          onDragEnd={handleDragEnd}
                          className="transition-all select-none"
                          style={{
                            background: newOrderIds.includes(order.id) ? '#1c1a0a' : '#1c1c20',
                            border: newOrderIds.includes(order.id) ? '1px solid #eab308' : '1px solid #2e2e33',
                            opacity: draggingId === order.id ? 0.4 : 1,
                            cursor: 'grab',
                          }}>

                          {newOrderIds.includes(order.id) && (
                            <div className="px-3 py-1" style={{ background: '#eab30820', borderBottom: '1px solid #eab30840' }}>
                              <span className="text-yellow-400 text-[9px] font-black uppercase tracking-widest">New Order</span>
                            </div>
                          )}

                          <div className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-zinc-600 cursor-grab"><DragIcon /></span>
                                <span className="text-white font-black text-sm">{order.order_number}</span>
                              </div>
                              <span className="text-[10px] font-bold" style={{ color: '#52525b' }}>
                                {new Date(order.created_at).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <p className="text-[11px] font-black uppercase tracking-wide mb-2" style={{ color: '#a1a1aa' }}>{order.customer_name}</p>

                            <div className={`flex items-center gap-1.5 mb-3 text-[10px] font-black uppercase tracking-widest ${
                              order.delivery_type === 'counter' ? 'text-orange-400' : 'text-blue-400'
                            }`}>
                              {order.delivery_type === 'counter' ? <CounterIcon /> : <TableIcon />}
                              {order.delivery_type === 'counter' ? 'Counter Pickup' : `Table ${order.table_number}`}
                            </div>

                            <div className="pt-3 mb-3 space-y-1" style={{ borderTop: '1px solid #2e2e33' }}>
                              {order.items?.map((item, i) => (
                                <div key={i} className="flex justify-between text-[11px]">
                                  <span className="font-bold" style={{ color: '#71717a' }}>{item.quantity}× {item.item_name}</span>
                                  <span className="font-mono" style={{ color: '#52525b' }}>₱{parseFloat(item.price * item.quantity).toFixed(0)}</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-between items-center mb-3" style={{ borderTop: '1px solid #2e2e33', paddingTop: 8 }}>
                              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#52525b' }}>Total</span>
                              <span className="text-white font-black font-mono text-sm">₱{parseFloat(order.total).toFixed(2)}</span>
                            </div>

                            {status !== 'completed' && (
                              <div className="space-y-1.5">
                                {STATUS_FLOW.filter(s => STATUS_FLOW.indexOf(s) === STATUS_FLOW.indexOf(status) + 1).map(next => (
                                  <button key={next} onClick={() => updateOrderStatus(order, next)}
                                    className="w-full py-2 text-[10px] font-black uppercase tracking-widest transition-all"
                                    style={{
                                      border: `1px solid ${STATUS_CONFIG[next].color}50`,
                                      color: STATUS_CONFIG[next].color,
                                      background: 'transparent',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = STATUS_CONFIG[next].color; e.currentTarget.style.color = '#000'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = STATUS_CONFIG[next].color; }}>
                                    → Mark {STATUS_CONFIG[next].label}
                                  </button>
                                ))}
                                {status !== 'ready' && (
                                  <button onClick={() => updateOrderStatus(order, 'completed')}
                                    className="w-full py-1.5 text-[10px] font-black uppercase tracking-widest transition-all"
                                    style={{ border: '1px solid #27272a', color: '#3f3f46', background: 'transparent' }}
                                    onMouseEnter={e => { e.currentTarget.style.color = '#71717a'; e.currentTarget.style.borderColor = '#3f3f46'; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = '#3f3f46'; e.currentTarget.style.borderColor = '#27272a'; }}>
                                    Complete ✓
                                  </button>
                                )}
                              </div>
                            )}
                            {status === 'completed' && (
                              <p className="text-center text-[10px] font-black uppercase tracking-widest" style={{ color: '#3f3f46' }}>Done ✓</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ITEMS GRID ── */}
        {activeTab !== 'Orders' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#52525b' }}>{getItems().length} items</p>
              <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 text-white font-black uppercase text-[11px] tracking-widest transition-colors" style={{ background: '#dc2626' }}
                onMouseEnter={e => e.currentTarget.style.background = '#ef4444'}
                onMouseLeave={e => e.currentTarget.style.background = '#dc2626'}>
                <PlusIcon /> Add {activeTab === 'Events' ? 'Event' : 'Item'}
              </button>
            </div>

            {loading ? (
              <div className="py-20 text-center">
                <p className="font-black uppercase tracking-widest animate-pulse text-sm" style={{ color: '#3f3f46' }}>Loading...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4" style={{ border: '1px solid #27272a' }}>
                {getItems().map(item => (
                  <div key={item.id} className="group transition-colors" style={{ borderRight: '1px solid #27272a', borderBottom: '1px solid #27272a' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1c1c20'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                    {/* ── Lazy loaded image ── */}
                    <div className="w-full h-44 overflow-hidden relative" style={{ background: '#1c1c20' }}>
                      {item.image ? (
                        <LazyImage
                          src={IMAGE_BASE + item.image}
                          alt={item.name || item.title}
                          className="group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-black uppercase text-[10px] tracking-widest" style={{ color: '#27272a' }}>No Image</span>
                        </div>
                      )}
                      <div className={`absolute top-3 left-3 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${
                        item.is_available || item.is_active ? 'bg-green-600 text-white' : 'text-zinc-500'
                      }`} style={!(item.is_available || item.is_active) ? { background: '#27272a' } : {}}>
                        {item.is_available || item.is_active ? 'Active' : 'Inactive'}
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-red-600 text-[9px] font-black uppercase tracking-widest mb-1">{item.category || item.type}</p>
                      <h3 className="text-white font-black uppercase text-sm tracking-tight leading-tight mb-1">{item.name || item.title}</h3>
                      <p className="text-[11px] font-bold leading-relaxed mb-4 line-clamp-2" style={{ color: '#52525b' }}>{item.desc}</p>
                      <div className="flex items-center justify-between">
                        {item.price
                          ? <span className="text-white font-black font-mono text-sm">₱{parseFloat(item.price).toFixed(2)}</span>
                          : item.date ? <span className="font-bold text-xs" style={{ color: '#71717a' }}>{item.date}</span>
                          : <span></span>
                        }
                        <div className="flex gap-1">
                          <button onClick={() => openEdit(item)} className="w-8 h-8 flex items-center justify-center transition-colors" style={{ border: '1px solid #27272a', color: '#52525b' }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#52525b'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = '#52525b'; e.currentTarget.style.borderColor = '#27272a'; }}>
                            <EditIcon />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="w-8 h-8 flex items-center justify-center transition-colors" style={{ border: '1px solid #27272a', color: '#52525b' }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = '#7f1d1d'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = '#52525b'; e.currentTarget.style.borderColor = '#27272a'; }}>
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {getItems().length === 0 && (
                  <div className="col-span-4 py-24 text-center" style={{ borderBottom: '1px solid #27272a', borderRight: '1px solid #27272a' }}>
                    <p className="font-black uppercase tracking-widest text-sm" style={{ color: '#27272a' }}>No items yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[9px] font-black uppercase tracking-[0.4em] mb-2" style={{ color: '#52525b' }}>{label}</label>
      {children}
    </div>
  );
}