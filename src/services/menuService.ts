import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

const MENU_COLLECTION = 'menu';

export const menuService = {
  async getAllItems(): Promise<MenuItem[]> {
    try {
      const q = query(collection(db, MENU_COLLECTION), orderBy('name'));
      const querySnapshot = await getDocs(q);
      const items: MenuItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MenuItem);
      });
      return items;
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return [];
    }
  },

  async updateItem(id: string, data: Partial<MenuItem>): Promise<void> {
    try {
      const docRef = doc(db, MENU_COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating menu item:', error);
      throw error;
    }
  },

  async seedData(): Promise<void> {
    try {
      const snapshot = await getDocs(collection(db, MENU_COLLECTION));
      if (snapshot.empty) {
        const batch = writeBatch(db);
        MENU_ITEMS.forEach((item) => {
          const docRef = doc(collection(db, MENU_COLLECTION), item.id);
          batch.set(docRef, {
            ...item,
            updatedAt: serverTimestamp()
          });
        });
        await batch.commit();
        console.log('Menu items seeded successfully');
      }
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }
};
