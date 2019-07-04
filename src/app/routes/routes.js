module.exports = (app, passport, cors) => {
  app.get('/', (req, res) =>{
    res.render('index');
  })
  app.get('/login', (req, res) =>{
    res.render('login', {
      message: req.flash('loginMessage')
    });
  });


  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true

  }));


  app.get('/signup', (req, res) =>{
    res.render('signup', {
      message: req.flash('signupMessage')
    });
  });
  app.options('*', cors)
  app.get('/error', (req, res, cors) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.render('error', {
      user: req.user
    });
  });


  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/profile', (req, res) =>{
    res.render('profile', {
      user: req.user
    });
  });

  app.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/')
  })

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }
    return res.redirect('/');
  }

  app.get('/details', (req, res) =>{
    res.render('details', {
      message: req.flash('signupMessage')
    });
  });

}
