const supertest = require('supertest')

const server = require('../server');

const finish_test = (done) => {
  return (err) => {
    if (err) {
      done.fail(err)
    }
    else {
      done()
    }
  }
}


describe('Hello World Server', () => {
  describe('Get / ', () => {
    let originalTimeout;
    beforeEach(() => {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    });
    it('deberia devolver statusCode 200', (done) => {
      supertest(server)
        .get('/')
        .expect(200)
        .end(finish_test(done))
    })


    describe("Añade  que existe la entrada", () => {

      it("Deberia añadir un post", () => {
        /*  const hasProperty = (res) => {
            
          }*/
        setTimeout(() => {
          supertest(server)
            .post('/api/newtweet')
            .set('Accept', 'application/json')
            .send({
              usuario: 'testuser',
              nota: 'testnota',
              id: "testid-8096bdd9-71ae"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            //.expect(hasProperty)
            .then((res) => {
              const posts = res.body
              const postUserTest = posts.find(post => post.usuario === 'testuser')
              if (!(postUserTest.usuario === 'testuser')) throw new Error("No esta el post añadido");
            });
        }, 1)
      })

      describe('/api/tweets', () => {
        it('Deberia devolver un json', (done) => {
          setTimeout(() => {
            supertest(server)
              .get('/api/tweets')
              .expect('Content-Type', /json/)
              .expect(200)
              .end(finish_test(done))
          }, 1)
        })

        describe('Marcamos y obtenemos los favoritos', () => {
          it('Muestra los favoritos', (done) => {
            setTimeout(() => {
              const hasFavorito = (res) => {
                const posts = res.body
                const postUserTest = posts.filter(post => post.favorito === true)
                if (!postUserTest) throw new Error("No muestro favoritos");
              }
              supertest(server)
                .get('/api/verfavorito')
                .expect('Content-Type', /json/)
                .expect(hasFavorito)
                .expect(200)
                .end(finish_test(done))
            }, 7000)
          })
        })

        describe('Elimina el Tweets creado', () => {
          it('Deberia eliminar el tweets creado', (done) => {
            setTimeout(() => {
              supertest(server)
                .put('/api/eliminartweets/testid-8096bdd9-71ae')
                .expect(200)
                .end(finish_test(done))
            }, 10000)
          })
          afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
          });
        })
      })
    })
  })
});