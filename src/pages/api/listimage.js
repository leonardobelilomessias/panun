// pages/api/images.js

import { storage } from '@/lib/firebase';
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query;
console.log(id)
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    try {
      const listRef = ref(storage, id.trim());
      const list = await listAll(listRef);
      const urls = await Promise.all(
        list.items.map(item => getDownloadURL(item))
      );
      res.status(200).json({ urls });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    const { imageName } = req.body;
    try {
      const imageRef = ref(storage, `${imageName}`);
      await deleteObject(imageRef);
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
