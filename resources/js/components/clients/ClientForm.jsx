import { useForm } from '@inertiajs/react';
import FormActions from '@/components/common/FormActions';
import Card from '@/components/ui/AppCard';
import Input from '@/components/ui/FormInput';
import Select from '@/components/ui/FormSelect';

export default function ClientForm({ client }) {
    const editing = Boolean(client);
    const { data, setData, post, put, processing, errors } = useForm({ name: client?.name || '', email: client?.email || '', telephone: client?.telephone || '', type: client?.type || 'CLIENT', password: '', password_confirmation: '' });
    const submit = (event) => { event.preventDefault(); editing ? put(route('clients.update', client.id)) : post(route('clients.store')); };
    return <form onSubmit={submit}><Card title={editing ? 'Modifier le client' : 'Nouveau client'}><div className="grid gap-5 sm:grid-cols-2"><Input label="Nom complet" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} required /><Input label="Adresse e-mail" name="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email} required /><Input label="Téléphone" name="telephone" value={data.telephone} onChange={(e) => setData('telephone', e.target.value)} error={errors.telephone} /><Select label="Type" name="type" value={data.type} onChange={(e) => setData('type', e.target.value)} options={[{ value: 'CLIENT', label: 'Client' }, { value: 'ADMIN', label: 'Administrateur' }]} error={errors.type} required /><Input label={editing ? 'Nouveau mot de passe' : 'Mot de passe'} name="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} error={errors.password} required={!editing} /><Input label="Confirmation" name="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} required={!editing} /></div><div className="mt-6"><FormActions cancelHref={route('clients.index')} processing={processing} /></div></Card></form>;
}
