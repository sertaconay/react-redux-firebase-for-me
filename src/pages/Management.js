import React from 'react';
import { browserHistory } from 'react-router';
import * as firebase from 'firebase';
import SiteHeader from 'components/Layout/SiteHeader';
import AdminSidebar from 'components/Layout/AdminSidebar';
import AdminNewsPage from 'pages/Admin/News';
import AdminHomePage from 'pages/Admin/Home';
import AdminCommitteesPage from 'pages/Admin/Committees';


class ManagementPage extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const dbAdminRef = firebase.database().ref().child('admins');
        dbAdminRef.on('value', (admin) => {
          if (user.uid === Object.entries(admin.val())[0][0]) {
            return true;
          }
          browserHistory.push('/login');
          return false;
        });
      } else {
        browserHistory.push('/login');
      }
    });
  }

  render() {
    const { params } = this.props;

    return (
      <div>
        <SiteHeader />
        <div className="container blog-content">
          <div className="row">
            <div className="col-sm-9 blog-main">
              <section className="blog-post">
                <div className="panel panel-default">
                  <div className="panel-body">
                    {params.content === 'home' && <AdminHomePage params={params} />}
                  </div>
                </div>
              </section>
            </div>
            <AdminSidebar />
          </div>
        </div>
      </div>
    );
  }
}

export default ManagementPage;
