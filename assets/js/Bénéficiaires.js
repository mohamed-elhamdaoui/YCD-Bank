const btnOpenModal = document.getElementById('openModal');
const btnCloseModal = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const form = document.getElementById('formBeneficiaire');
const listeBeneficiaires = document.getElementById('listeBeneficiaires');
const searchBeneficiaire = document.getElementById('searchBeneficiaire');
const filtreStatut = document.getElementById('filtreStatut');

document.addEventListener('DOMContentLoaded', afficherBeneficiaires);

btnOpenModal.addEventListener('click', () => modal.classList.remove('hidden'));
btnCloseModal.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nom = form.querySelector('input[name="nom"]').value.trim();
  const iban = form.querySelector('input[name="iban"]').value.trim();
  const banque = form.querySelector('input[name="banque"]').value.trim();

  if (!nom || !iban || !banque) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  const beneficiaire = { nom, iban, banque, bloque: false };

  let beneficiaires = JSON.parse(localStorage.getItem('beneficiaires')) || [];
  beneficiaires.push(beneficiaire);
  localStorage.setItem('beneficiaires', JSON.stringify(beneficiaires));

  afficherBeneficiaires();
  form.reset();
  modal.classList.add('hidden');
});

function afficherBeneficiaires() {
  const beneficiaires = JSON.parse(localStorage.getItem('beneficiaires')) || [];
  const recherche = searchBeneficiaire?.value?.toLowerCase() || "";
  const filtre = filtreStatut?.value || "tous";

  listeBeneficiaires.innerHTML = '';

  const filtresAppliques = beneficiaires.filter(b => {
    const correspondNom = b.nom.toLowerCase().includes(recherche);
    const correspondStatut =
      filtre === 'tous' ||
      (filtre === 'bloque' && b.bloque) ||
      (filtre === 'debloque' && !b.bloque);
    return correspondNom && correspondStatut;
  });

  if (filtresAppliques.length === 0) {
    listeBeneficiaires.innerHTML = '<p class="text-gray-500">Aucun bénéficiaire trouvé...</p>';
    return;
  }

  filtresAppliques.forEach((b, index) => {
    const item = document.createElement('div');
    item.className =
      'flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 mb-2';
    item.innerHTML = `
      <div>
        <p class="font-medium">${b.nom}</p>
        <p class="text-sm text-gray-500">${b.iban}</p>
        <p class="text-sm text-gray-500">${b.banque}</p>
        <p class="text-sm ${b.bloque ? 'text-red-600' : 'text-green-600'} font-semibold">
          ${b.bloque ? 'Bloqué' : 'Débloqué'}
        </p>
      </div>
      <div class="flex gap-3">
        <button class="toggle-bloque text-blue-500 hover:text-blue-700 font-semibold" data-index="${index}">
          ${b.bloque ? 'Débloquer' : 'Bloquer'}
        </button>
        <button class="text-red-500 hover:text-red-700 font-semibold" data-delete="${index}">
          Supprimer
        </button>
      </div>
    `;
    listeBeneficiaires.appendChild(item);
  });

  document.querySelectorAll('.toggle-bloque').forEach((btn) => {
    btn.addEventListener('click', () => toggleBloque(btn.dataset.index));
  });

  document.querySelectorAll('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', () => supprimerBeneficiaire(btn.dataset.delete));
  });
}

function supprimerBeneficiaire(index) {
  let beneficiaires = JSON.parse(localStorage.getItem('beneficiaires')) || [];
  beneficiaires.splice(index, 1);
  localStorage.setItem('beneficiaires', JSON.stringify(beneficiaires));
  afficherBeneficiaires();
}

function toggleBloque(index) {
  let beneficiaires = JSON.parse(localStorage.getItem('beneficiaires')) || [];
  beneficiaires[index].bloque = !beneficiaires[index].bloque;
  localStorage.setItem('beneficiaires', JSON.stringify(beneficiaires));
  afficherBeneficiaires();
}

if (searchBeneficiaire) searchBeneficiaire.addEventListener('input', afficherBeneficiaires);
if (filtreStatut) filtreStatut.addEventListener('change', afficherBeneficiaires);