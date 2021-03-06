import React from 'react';
import { Dropdown, Header, Divider, Item, Form, Icon, Input } from 'semantic-ui-react';

const AllListingsSearch = ({ onChange, onSubmit }) => {
  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Field>
        <Input
          icon={<Icon onClick={(e) => onSubmit(e)} name="search" inverted circular link />}
          placeholder="Enter search address here"
          name="image"
          onChange={e => onChange(e)}
          size="large"
        />
      </Form.Field>
    </Form>
  );
};

export default AllListingsSearch;


// return (
//     <Dropdown text='Filter' floating labeled button className='icon'>
//       {/* <i class="filter icon"></i> */}
//       <Dropdown.Menu>
//         <Dropdown.Header icon='tags' content='Filter by tag' />
//         <Dropdown.Divider />
//         <Dropdown.Item onClick={(e) => onClick(e)} icon='attention' text='Important'>HELLO</Dropdown.Item>
//         <Dropdown.Item icon='comment' text='Announcement' />
//         <Dropdown.Item icon='conversation' text='Discussion' />
//       </Dropdown.Menu>
//     </Dropdown>
//   );