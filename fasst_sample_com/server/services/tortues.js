import service from '@fasstech/service';

const tortueService = (command, args) =>
  service(
    'tortue',
    process.env.TORTUES_SERVICE_URL,
    {
      getTortues: {
        route: '/api/tortues',
        method: 'GET'
      },
      getOneTortue: {
        route: '/api/tortues/:id',
        method: 'GET'
      },
      createTortue: {
        route: '/api/tortues',
        method: 'POST',
        body: [
          'name',
          'age',
          'taille',
          'terrestre',
          ['species', 'o']
        ]
      },
      updateTortue: {
        route: '/api/tortues/:id',
        method: 'PUT',
        body: [
          'name',
          'age',
          'taille',
          'terrestre',
          ['species', 'o']
        ]
      },
      deleteTortue: {
        route: '/api/tortues/:id',
        method: 'DELETE'
      }
    }
  )(command, args);

module.exports = tortueService;
