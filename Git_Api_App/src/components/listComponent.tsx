import React from 'react';
import WithComponentList from '../components/withComponentList';
import UserCard from '../components/userCard';

const ListView = WithComponentList(UserCard);

const ListComponent = ({
  source,
  searchOnlyList,
}: {
  source: string;
  searchOnlyList: boolean;
}) => {
  return <ListView apiURL={source} searchOnlyList={searchOnlyList} />;
};

export default ListComponent;
