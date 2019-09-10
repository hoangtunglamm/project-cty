const passport = require('passport')
const usermodel = require('./model/user')
const LocalStrategy = require('passport-local').Strategy;
const sql = require('mssql');
const config = require('./config')

module.exports = () => {
  passport.use(new LocalStrategy(
    function (username, password, done) {
      sql.connect(config).
        then(pool => {
          return pool.request()
            .input('UserName', sql.VarChar(50), username)
            .execute('spGetUserProfile')

        }).then(user => {
          console.log(user)
          console.log(user.recordset[0].Phone)
          if (user.rowsAffected[0] === 0) {
            console.log("incorrect username")
            sql.close()
            return done(null, false, { message: "incorrect username" });
          }
          if (user.recordset[0].Phone != password) {
            console.log('incorrect password')
            sql.close()
            return done(null, false, { message: "incorrect password" });
          }
          sql.close()
          return done(null, user);
        }).catch(err => {
          console.log(err)
          sql.close()
        })

    }

  ))

  passport.serializeUser(function (user, done) {
    console.log('serializing user:', user);
    done(null, user);
}); 
passport.deserializeUser(function (username, done) {
  console.log('deserializing user:', username);
  done(null,username);
});
}

  // passport.serializeUser(function (user, done) {
  //   done(null, user);
  // });

  // passport.deserializeUser(async function (UserProfileId, done) {
  //   try {
  //     let pool = await sql.connect(config)
  //     let recordset = await pool.request()
  //       .query(`select *  from UserProfiles where UserProfileId = 1`)
  //     sql.close()
  //     return done(null, recordset)
  //   } catch (error) {
  //     sql.close()
  //     return done(error)
  //   }
  // });

  //MONGO
  // module.exports = () =>{

//     passport.use(new LocalStrategy(
//         function(username, password, done) {
//             usermodel.findOne({
//               username: username
//             }, function(err, user) {
//               if (err) {
//                 return done(err);
//               }

//               if (!user) {
//                 console.log("no user found")
//                 return done(null, false);
//               }

//               if (user.password != password) {
//                 return done(null, false);
//               }
//               return done(null, user);
//             });
//         }
//       ));
//     passport.serializeUser(function(user, cb) {
//         cb(null, user.id);
//       });

//       passport.deserializeUser(function(id, cb) {
//         usermodel.findById(id, function(err, user) {
//           cb(err, user);
//         });
//       });
// }
