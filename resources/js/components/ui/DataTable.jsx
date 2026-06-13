import EmptyState from './EmptyState';

export default function DataTable({ columns, rows, keyField = 'id', emptyTitle = 'Aucune donnée' }) {
    if (!rows?.length) return <EmptyState title={emptyTitle} description="Les données apparaîtront ici dès qu’elles seront disponibles." />;
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                <thead className="bg-slate-50 dark:bg-slate-950/60">{<tr>{columns.map((column) => <th key={column.key} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{column.label}</th>)}</tr>}</thead>
                <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900">
                    {rows.map((row) => <tr key={keyField.split('.').reduce((value, key) => value?.[key], row)} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/70">{columns.map((column) => <td key={column.key} className="whitespace-nowrap px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{column.render ? column.render(row) : row[column.key]}</td>)}</tr>)}
                </tbody>
            </table>
        </div>
    );
}
