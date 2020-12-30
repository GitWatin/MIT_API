// Retourne l'utilisateur pour l'utiliser ulterieurement
// Securise car on ne voit pas le champs de la DB

const toPeopleReturn = (people) => {
  return {
    lastname: people.nom,
    firstname: people.prenom,
    email: people.email,
  };
};

module.exports = { toPeopleReturn };
