'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function MediaPackDialog() {
  return (
    <div className="w-full my-6 flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="font-display tracking-wide bg-blue-600 hover:bg-blue-500 text-white border border-blue-300/30 rounded-full px-6">
            Open Print/PDF Media Pack
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-5xl h-[85vh] p-0 overflow-hidden">
          <DialogHeader className="p-5 pb-3 border-b border-white/10">
            <DialogTitle className="font-display text-2xl text-white tracking-wide">Media Pack Preview</DialogTitle>
            <DialogDescription>
              Review the print-friendly pack, then use your browser print command to save as PDF.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 h-full bg-white">
            <iframe
              title="Young Astronomers UK Media Pack"
              src="/media-pack-print"
              className="w-full h-[calc(85vh-150px)] border-0"
            />
          </div>

          <DialogFooter className="p-4 border-t border-white/10 bg-black/60">
            
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
