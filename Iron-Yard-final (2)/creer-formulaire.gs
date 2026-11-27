/**
 * À exécuter une seule fois avec le compte qui doit posséder le formulaire.
 * Le formulaire reste à publier avec accès public depuis l’interface Forms.
 */
function creerIronYard() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('IRON_YARD_FORM_ID')) {
    throw new Error('Un formulaire a déjà été créé par ce projet. Ouvrez « Iron Yard » dans Google Drive.');
  }

  const form = FormApp.create('Iron Yard — Essai ou préparation compétition');
  props.setProperty('IRON_YARD_FORM_ID', form.getId());
  form.setDescription('Questionnaire de démonstration pour un devoir de M2 STAPS. Prévois deux minutes et utilise uniquement un profil et une adresse e-mail fictifs. Les réponses sont réservées à l’autrice et supprimées dans les 30 jours suivant l’évaluation. Contact pour tes droits via le portfolio : https://annabellecharrier.wixsite.com/portfolio');
  form.setConfirmationMessage('Merci. Ta demande de démonstration a été enregistrée. Dans le scénario de lancement, la box répond sous 48 h ouvrées.');
  form.setCollectEmail(false).setLimitOneResponsePerUser(false).setPublishingSummary(false);

  const email = FormApp.createTextValidation().requireTextIsEmail().setHelpText('Pour un test, utilise par exemple essai@example.com.').build();

  form.addMultipleChoiceItem().setTitle('Quelle offre t’intéresse ?').setChoiceValues([
    'Séance d’essai', 'Prépa HYROX solo', 'Prépa HYROX duo',
    'Prépa compétition de CrossFit', 'Prépa ATHX Games', 'Adhésion Club', 'Adhésion Signature', 'Je souhaite un renseignement'
  ]).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Quel club t’intéresse ?').setChoiceValues(["Paris", "Montreuil", "Lille", "Strasbourg", "Reims", "Dijon", "Nantes", "Rennes", "Angers", "Le Havre", "Brest", "Bordeaux", "Toulouse", "Lyon", "Marseille", "Nice", "Montpellier", "Grenoble", "Toulon", "Saint-Étienne", "À définir"]).setRequired(true);
  form.addTextItem().setTitle('Quel prénom souhaites-tu utiliser ?').setRequired(true);
  form.addTextItem().setTitle('Quelle adresse e-mail fictive souhaites-tu indiquer ?').setValidation(email).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Dans quelle zone t’entraînes-tu ou travailles-tu ?').setChoiceValues([
    'Montreuil', 'Vincennes', 'Bagnolet', 'Est de Paris', 'Autre'
  ]).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Quel est ton niveau de pratique ?').setChoiceValues([
    'Découverte ou reprise', 'Amateur régulier', 'Compétiteur confirmé ou pro'
  ]).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Quand souhaites-tu commencer ?').setChoiceValues([
    'Dans le mois', 'Dans 1 à 3 mois', 'Dans plus de 3 mois', 'À définir'
  ]).setRequired(true);
  form.addTextItem().setTitle('Si tu vises une compétition, laquelle et à quelle date ?').setRequired(false);
  form.addCheckboxItem().setTitle('Quels créneaux te conviennent ?').setChoiceValues([
    'En semaine le matin', 'En semaine le midi', 'En semaine le soir', 'Le samedi matin', 'À définir'
  ]).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Comment as-tu découvert Iron Yard ?').setChoiceValues([
    'Instagram', 'Recherche Google', 'Club ou partenaire local', 'Recommandation', 'Accès direct ou autre'
  ]).setRequired(true);
  form.addCheckboxItem().setTitle('Utilisation de la réponse')
    .setChoiceValues(['J’accepte que cette réponse fictive soit utilisée pour tester le parcours de contact dans le cadre du devoir.']).setRequired(true);

  const sheet = SpreadsheetApp.create('Iron Yard — Réponses de démonstration');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  const tracking = sheet.insertSheet('Pilotage');
  const columns = [
    'ID lead', 'Date de réception', 'Source', 'Club', 'Objectif', 'Statut',
    'Date de réponse', 'Opportunité confirmée', 'Inscription payante',
    'Premier achat', 'Renouvellement ou second achat', 'Suite prévue'
  ];
  tracking.getRange(1, 1, 1, columns.length).setValues([columns]);
  tracking.setFrozenRows(1);
  console.log('Ouvrir le formulaire : ' + form.getEditUrl());
  console.log('Feuille de réponses : ' + sheet.getUrl());
}
