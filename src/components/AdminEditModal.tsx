import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, Image, Tag, DollarSign, List, AlignLeft } from 'lucide-react';
import { MenuItem } from '../types';

interface AdminEditModalProps {
  item?: MenuItem; // Optional for "Add" mode
  onClose: () => void;
  onSave: (id: string | null, updates: Partial<MenuItem>) => Promise<void>;
}

export default function AdminEditModal({ item, onClose, onSave }: AdminEditModalProps) {
  const isAddMode = !item;
  
  const [formData, setFormData] = useState({
    name: item?.name || '',
    price: item ? String(item.price) : '',
    ingredients: item?.ingredients || '',
    description: item?.description || '',
    image: item?.image || '',
    category: item?.category || 'burgers',
    isSpecialty: item?.isSpecialty || false
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Parse price if it's a number-like string
      const priceVal = isNaN(Number(formData.price)) ? formData.price : Number(formData.price);
      await onSave(item?.id || null, {
        ...formData,
        price: priceVal
      });
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const categories = ['burgers', 'bowls', 'black-coffee', 'milk-coffee', 'non-coffee', 'juices', 'specials'];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#FAF5EF] border border-[#8C6239]/40 rounded-2xl max-w-2xl w-full relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-[#E3D7C8] flex items-center justify-between bg-white">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2D241C]">
              {isAddMode ? 'Add New Menu Item' : 'Edit Menu Item'}
            </h2>
            <p className="text-[10px] text-[#8C6239] font-mono uppercase tracking-widest font-bold">Admin Workspace</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 text-gray-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#5C4E43] font-bold">
                <Tag className="w-3 h-3" />
                Item Name
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E3D7C8] rounded-xl text-sm focus:ring-2 focus:ring-[#8C6239]/20 outline-none"
              />
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#5C4E43] font-bold">
                <DollarSign className="w-3 h-3" />
                Price (ETB)
              </label>
              <input
                required
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E3D7C8] rounded-xl text-sm focus:ring-2 focus:ring-[#8C6239]/20 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#5C4E43] font-bold">
                <List className="w-3 h-3" />
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-white border border-[#E3D7C8] rounded-xl text-sm focus:ring-2 focus:ring-[#8C6239]/20 outline-none appearance-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.replace('-', ' ').toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* Specialty Toggle */}
            <div className="flex items-end pb-1.5">
              <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-xl border border-[#E3D7C8] bg-white w-full">
                <input
                  type="checkbox"
                  checked={formData.isSpecialty}
                  onChange={(e) => setFormData({ ...formData, isSpecialty: e.target.checked })}
                  className="w-4 h-4 accent-[#8C6239]"
                />
                <span className="text-xs font-semibold text-[#2D241C]">Mark as Specialty Item</span>
              </label>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#5C4E43] font-bold">
              <AlignLeft className="w-3 h-3" />
              Ingredients
            </label>
            <textarea
              rows={2}
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E3D7C8] rounded-xl text-sm focus:ring-2 focus:ring-[#8C6239]/20 outline-none resize-none"
              placeholder="List main ingredients..."
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#5C4E43] font-bold">
              <AlignLeft className="w-3 h-3" />
              Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E3D7C8] rounded-xl text-sm focus:ring-2 focus:ring-[#8C6239]/20 outline-none resize-none"
              placeholder="Item story or brewing notes..."
            />
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#5C4E43] font-bold">
              <Image className="w-3 h-3" />
              Photo URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E3D7C8] rounded-xl text-sm focus:ring-2 focus:ring-[#8C6239]/20 outline-none"
              placeholder="https://images.unsplash.com/..."
            />
            {formData.image && (
              <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden border border-[#E3D7C8]">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-[#E3D7C8] text-[#5C4E43] font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-black/5 transition-all"
            >
              Cancel
            </button>
            <button
              disabled={isSaving}
              type="submit"
              className="flex-1 py-3 px-4 bg-[#8C6239] hover:bg-[#704E2D] text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
