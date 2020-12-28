const toPeopleReturn = (people) => {
  return {
    lastname: people.nom,
    firstname: people.prenom,
    email: people.email,
  };
};

module.exports = { toPeopleReturn };
