import React from 'react';
import { Link } from 'react-router';
import { Card, Image, Icon } from 'semantic-ui-react';
import ListingDeleteModal from './ListingDeleteModal';

const getIconString = str => (
  str === 'home improvement' ? 'home' : 'laptop'
);

const Listing = ({ userId, listingId, title, createdAt, body, type, handleDelete, pathname, cutBody }) =>
  <Card centered raised>
    <Link to={`/listings/${listingId}`} >
      <Card centered raised>
        <Card.Content>
          {
            pathname === '/dashboard' ?
              <ListingDeleteModal
                handleDelete={handleDelete}
                userId={userId}
                listingId={listingId}
              /> : null
          }
          <Image floated="right">
            <Icon name={getIconString(type)} size="big" />
          </Image>
          <Card.Header>
            { title }
          </Card.Header>
          <Card.Meta>
            { createdAt }
          </Card.Meta>
          <Card.Description>
            { cutBody(body) }
          </Card.Description>
        </Card.Content>
      </Card>
    </Link>
  </Card>;


Listing.propTypes = {
  title: React.PropTypes.string.isRequired,
  createdAt: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  userId: React.PropTypes.number,
  listingId: React.PropTypes.number.isRequired,
  handleDelete: React.PropTypes.func,
  pathname: React.PropTypes.string.isRequired,
};

export default Listing;
