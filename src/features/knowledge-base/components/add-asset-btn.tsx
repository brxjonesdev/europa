import { motion } from 'motion/react';
import React from 'react';

export default function AddAssetButton({type} : {type: 'objectives' | 'resources' | 'notes'}) {
  
  return (
    <div
  key="add"
  className="border-2 border-dashed border-muted-foreground/40 rounded-2xl bg-muted/10 h-full flex flex-col items-center justify-center p-6 text-center transition-colors hover:border-muted-foreground/60 hover:bg-muted/20 cursor-pointer"
>
  <motion.div
    className="border border-muted-foreground/30 bg-card shadow-sm p-3 rounded-lg flex items-center justify-center w-full h-full"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-lg font-bold">+ Add a new {type.slice(0, -1)}</span>
  </motion.div>
</div>

  );
}
