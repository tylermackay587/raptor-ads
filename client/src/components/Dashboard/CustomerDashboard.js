import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Container, Header, Card, Button, Divider, Loader } from 'semantic-ui-react';
import Listing from '../shared/Listing';
import { fetchUserListings, removeListing } from '../../actions';

class CustomerDashboard extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(listingId) {
    this.props.dispatch(removeListing(this.props.id, listingId));
  }

  convertTime(time) {
    return moment(time).fromNow();
  }

  render() {
    const { first_name, userListings, id, isFetching } = this.props;
    console.log('props', this.props)
    if (isFetching) {
      return <Loader active inline='centered' />;
    } else {
      return (
        <Container textAlign="center">
          <Header as="h1" className="center">Dashboard</Header>
          <h3>Recent Listings</h3>
          <Divider />
          <Card.Group itemsPerRow={4} stackable>
            {userListings && userListings.map(listing =>
              <Listing
                key={listing.id}
                id={listing.id}
                title={listing.title}
                createdAt={this.convertTime(listing.createdAt)}
                body={listing.body}
                type={listing.type}
                onClick={this.onClick}
                handleDelete={this.handleDelete}
              />
            )}
          </Card.Group>
        </Container>
      );
    }
  }
}

CustomerDashboard.propTypes = {
  first_name: React.PropTypes.string.isRequired,
  userListings: React.PropTypes.array.isRequired,
  id: React.PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { first_name, id } = state.auth.loggedInUser;
  const { userListings, isFetching } = state.listing;
  console.log('id', id);

  return { first_name, id, userListings, isFetching };
};

export default connect(mapStateToProps)(CustomerDashboard);
