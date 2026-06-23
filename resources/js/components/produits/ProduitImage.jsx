import { ImageOff } from 'lucide-react';

export default function ProduitImage({ src, alt, className = 'h-48 w-full' }) {
    return src ? (
        <img src={src} alt={alt} className={`${className} object-cover`} />
    ) : (
        <div className={`${className} flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400`}>
            <ImageOff className="h-10 w-10" />
        </div>
    );
}
