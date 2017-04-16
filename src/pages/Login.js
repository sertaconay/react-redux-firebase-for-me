import React from 'react';
import * as firebase from 'firebase';
import SiteHeader from 'components/Layout/SiteHeader';
import { browserHistory } from 'react-router';


class LoginPage extends React.Component {

  loginHandle = (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        const dbAdminRef = firebase.database().ref().child('admins');
        dbAdminRef.on('value', (admin) => {
          Object.entries(admin.val()).map((entry) => {
            if (user.uid === entry[0]) {
              browserHistory.push('/management');
              return true;
            }
            return false;
          });
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        <SiteHeader />
        <div className="container blog-content">
          <div className="row">
            <div className="col-xs-12 blog-main">
              <div className="row">
                <div className="col-xs-12">
                  <div className="blog-post">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <div className="blog-post-content">
                          <h2 className="blog-post-title">
                            Giriş Yap
                          </h2>
                          <form className="form-inline" role="form" onSubmit={this.loginHandle}>
                            <div className="form-group is-empty">
                              <label className="sr-only" htmlFor="email">Kullanıcı Adı</label>
                              <input type="email" className="form-control" id="email" placeholder="Kullanıcı Adı" />
                              <span className="material-input" />
                            </div>
                            <div className="form-group is-empty">
                              <label className="sr-only" htmlFor="password">Parola</label>
                              <input type="password" className="form-control" id="password" placeholder="Parola" />
                              <span className="material-input" />
                            </div>
                            <button type="submit" className="btn btn-theme">Sign in</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
