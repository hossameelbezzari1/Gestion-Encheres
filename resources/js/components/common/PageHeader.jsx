export default function PageHeader({ title, description, actions }) {
    return <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h1>{description && <p className="mt-1 text-sm text-slate-500">{description}</p>}</div>{actions && <div className="flex gap-2">{actions}</div>}</div>;
}
