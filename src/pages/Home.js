import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from 'actions/home';
import SiteHeader from 'components/Layout/SiteHeader';
// import HomePost from 'components/HomePost';


class HomePage extends React.Component {
  static propTypes = {
    homeItems: React.PropTypes.object,
    homeActionsProp: React.PropTypes.object,
  }

  componentDidMount() {
    this.props.homeActionsProp.getAllHomePosts();
    console.log(this.props.homeItems);
  }

  render() {
    // const { homeItems } = this.props;
    return (
      <div>
        <SiteHeader />
        <div className="container blog-content">
          <div className="row">
            <div className="col-sm-8 blog-main">
              {/*<HomePost data={homeItems} />*/}
              <h1>Mat</h1>
            </div>
            {/*<SiteSidebar />*/}
          </div>
        </div>
        {/*<SiteFooter />*/}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  homeItems: state.home.items,
});

const mapDispatchToProps = dispatch => ({
  homeActionsProp: bindActionCreators(homeActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
