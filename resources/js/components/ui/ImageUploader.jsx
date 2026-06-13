import { ImagePlus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ImageUploader({ value, initialUrl, onChange, error, required }) {
    const [preview, setPreview] = useState(initialUrl || null);
    useEffect(() => {
        if (!value) return;
        const url = URL.createObjectURL(value);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [value]);
    return (
        <div>
            <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Image {required && <span className="text-red-500">*</span>}</span>
            {preview ? <div className="relative overflow-hidden rounded-xl border dark:border-slate-700"><img src={preview} alt="Aperçu" className="h-52 w-full object-cover" /><button type="button" onClick={() => { setPreview(null); onChange(null); }} className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-700 shadow dark:bg-slate-900/90 dark:text-slate-200"><X className="h-4 w-4" /></button></div> : <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 hover:border-amber-400 hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-amber-500 dark:hover:bg-amber-950/30"><ImagePlus className="mb-2 h-7 w-7" /><span className="text-sm font-medium">Choisir une image</span><input type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" onChange={(event) => onChange(event.target.files?.[0] || null)} /></label>}
            {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
        </div>
    );
}
