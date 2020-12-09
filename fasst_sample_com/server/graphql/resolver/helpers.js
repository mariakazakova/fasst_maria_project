const OK = (additionnalFieds = {}) => ({
  ok: true,
  ...additionnalFieds
});

const KO = (error, additionnalFieds = {}) => ({
  ok: false,
  error,
  ...additionnalFieds
});

module.exports = {
  OK,
  KO
};