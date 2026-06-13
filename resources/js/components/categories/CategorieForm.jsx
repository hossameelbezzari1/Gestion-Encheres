import { useForm } from '@inertiajs/react';
import FormActions from '@/components/common/FormActions';
import Card from '@/components/ui/AppCard';
import Input from '@/components/ui/FormInput';
import Textarea from '@/components/ui/Textarea';

export default function CategorieForm({ categorie }) {
    const editing = Boolean(categorie);
    const { data, setData, post, put, processing, errors } = useForm({ nom: categorie?.nom || '', description: categorie?.description || '' });
    const submit = (event) => { event.preventDefault(); editing ? put(route('categories.update', categorie.id)) : post(route('categories.store')); };
    return <form onSubmit={submit}><Card title={editing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}><div className="space-y-5"><Input label="Nom" name="nom" value={data.nom} onChange={(e) => setData('nom', e.target.value)} error={errors.nom} required /><Textarea label="Description" name="description" value={data.description} onChange={(e) => setData('description', e.target.value)} error={errors.description} /></div><div className="mt-6"><FormActions cancelHref={route('categories.index')} processing={processing} /></div></Card></form>;
}
