require('intl/locale-data/jsonp/fr.js');

const phrases = {
  ok: 'OK',
  my_accounts: 'Mes comptes',
  owes_you: 'vous doit',
  you_owe: 'vous devez',
  settled_up: `à l'équilibre`,
  save: 'Enregistrer',
  delete: 'Supprimer',
  cancel: 'Annuler',
  me: 'Moi',
  description: 'Description',
  paid_by: 'Payé par',
  paid_by_name: 'Payé par %{name}',
  add_a_new_person: 'Ajouter une nouvelle personne',
  add_a_new_account: 'Ajouter un nouveau compte',
  split_equaly: 'Partager équitablement',
  split_unequaly: 'Partager inéquitablement',
  split_shares: 'Partager par part',
  paid_for: 'Payé pour',
  expense_new: 'Nouvelle dépense',
  expense_edit: 'Modifier',
  expense_description_hint: 'Ex : Hamburgers',
  expense_related_account: 'Rattaché au compte',
  expense_confirm_delete: 'Supprimer cette dépense ?',
  expense_confirm_delete_edit: 'Supprimer les modifications apportées à cette dépense ?',
  expense_deleted: 'Dépense supprimé',
  expense_add_error: {
    amount_empty: 'Ajoutez un montant.',
    paid_for_empty: 'Ajoutez la personne qui a payée.',
    unequaly_amount: 'Les montants payés ne correspondent pas avec le montant de la dépense.',
  },
  expense_saved: 'Dépense enregistré',
  expense_latest: 'Dernière dépense : %{date}',
  expense_no: 'Aucune dépense',
  expense_list_empty: 'Les dépenses que vous créez apparaissent ici.',
  account_list_empty: 'Les comptes que vous créez apparaissent ici.',
  account_edit: 'Modifier le compte',
  account_name_hint: `Ex : vacances d'été`,
  account_add_new: 'Nouveau compte',
  account_add_confirm_delete: 'Supprimer ce compte ?',
  account_add_confirm_delete_edit: 'Supprimer les modifications apportées à ce compte ?',
  account_add_shared: 'Compte partagé',
  account_add_saved: 'Compte enregistré',
  account_delete_title: 'Supprimer ce compte',
  account_delete_description: 'Si vous le supprimez, vous perdrez les dépenses liées à ce compte.',
  account_deleted: 'Compte supprimé',
  account_debts_empty: 'La balance est équilibré. Profitez de la journée.',
  shares: 'part(s)',
  settings: 'Paramètres',
  settings_feedback: `Des idées d'amélioration?`,
  expenses: 'Dépenses',
  balance: 'Equilibre',
  debts: 'Dettes',
  in_currency: 'En %{currency}',
  name: 'Nom',
  contact_add_error: {
    already: 'Ce contact est déjà présent.',
    no_name: `Ce contact ne peut être ajouté, il n'a pas de nom.`,
  },
  members: 'Membres',
  version: 'Version',
  facebook_login: 'Se connecter avec Facebook',
  facebook_you_are_logged: 'Vous êtes connecté avec facebook',
  export: 'Exporter',
  import: 'Importer',
  data: 'Données',
  product: {
    title: 'SplitMe - Dépenses entre amis',
    description: 'Partagez les dépenses avec vos amis',
    web: 'Version Web',
    try: 'Essayer SplitMe',
    argument1: {
      title: `Gardez un oeil sur l'état de la balance`,
      description: `Que ce soit pour partager les factures entre colocataires,
        ou suivre le détail des dépenses lors de vos voyages entre amis,
        SplitMe vous simplifie la vie.`,
    },
    argument2: {
      title: 'Remboursez facilement vos amis',
      description: `Notre algorithme détermine le nombre minimum de transations pour rembourser
        efficacement chaque personne.`,
    },
    argument3: {
      title: 'Utilisez plusieurs devises',
      description: `Très utile lorque vous voyagez dans plusieurs pays.`,
    },
  },
};

export default phrases;
