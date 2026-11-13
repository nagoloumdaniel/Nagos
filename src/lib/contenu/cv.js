/* CV téléchargeable : le PDF déposé dans /content/cv/. Un seul fichier attendu ;
   s'il y en a plusieurs, le dernier par ordre alphabétique est utilisé (ex. CV_2026-11.pdf). */
const files = import.meta.glob('../../../content/cv/*.pdf', { query: '?url', import: 'default', eager: true });
const last = Object.keys(files).sort((a, b) => a.localeCompare(b, 'fr', { numeric: true })).pop();

export const cv = last ? { url: files[last], fileName: last.split('/').pop() } : null;
