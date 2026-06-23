import FormActions from '@/components/common/FormActions';
import Card from '@/components/ui/AppCard';
import Input from '@/components/ui/FormInput';
import Select from '@/components/ui/FormSelect';
import ImageUploader from '@/components/ui/ImageUploader';
import Textarea from '@/components/ui/Textarea';
import { useForm } from '@inertiajs/react';

export default function ProduitForm({ produit, categories }) {
    const editing = Boolean(produit);
    const { data, setData, post, processing, errors } = useForm({
        libelle: produit?.libelle || '',
        description: produit?.description || '',
        prix_initial: produit?.prix_initial || '',
        categorie_id: produit?.categorie_id || '',
        statut: produit?.statut || 'EN_COURS',
        image: null,
        _method: editing ? 'put' : 'post',
    });
    const submit = (event) => {
        event.preventDefault();
        post(editing ? route('produits.update', produit.id) : route('produits.store'), { forceFormData: true });
    };
    return (
        <form onSubmit={submit}>
            <Card
                title={editing ? 'Modifier le produit' : 'Informations du produit'}
                description="Les champs marqués d’un astérisque sont obligatoires."
            >
                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    <div className="space-y-5">
                        <Input
                            label="Libellé"
                            name="libelle"
                            value={data.libelle}
                            onChange={(e) => setData('libelle', e.target.value)}
                            error={errors.libelle}
                            required
                        />
                        <Textarea
                            label="Description détaillée"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            error={errors.description}
                            required
                            rows={7}
                        />
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Input
                                label="Prix initial (DH)"
                                name="prix_initial"
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={data.prix_initial}
                                onChange={(e) => setData('prix_initial', e.target.value)}
                                error={errors.prix_initial}
                                required
                            />
                            <Select
                                label="Catégorie"
                                name="categorie_id"
                                value={data.categorie_id}
                                onChange={(e) => setData('categorie_id', e.target.value)}
                                options={categories.map((item) => ({ value: item.id, label: item.nom }))}
                                placeholder="Choisir une catégorie"
                                error={errors.categorie_id}
                                required
                            />
                        </div>
                        {editing && (
                            <Select
                                label="Statut"
                                name="statut"
                                value={data.statut}
                                onChange={(e) => setData('statut', e.target.value)}
                                options={[
                                    { value: 'EN_COURS', label: 'En cours' },
                                    { value: 'TERMINE', label: 'Terminé' },
                                    { value: 'VENDU', label: 'Vendu' },
                                    { value: 'ANNULE', label: 'Annulé' },
                                ]}
                                error={errors.statut}
                                required
                            />
                        )}
                    </div>
                    <ImageUploader
                        value={data.image}
                        initialUrl={produit?.image_url}
                        onChange={(file) => setData('image', file)}
                        error={errors.image}
                        required={!editing}
                    />
                </div>
                <div className="mt-6">
                    <FormActions
                        cancelHref={route('produits.index')}
                        processing={processing}
                        submitLabel={editing ? 'Mettre à jour' : 'Publier le produit'}
                    />
                </div>
            </Card>
        </form>
    );
}
