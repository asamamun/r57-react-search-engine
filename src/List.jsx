import * as React from 'react';
import { sortBy } from 'lodash';
const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, 'title'),
  AUTHOR: (list) => sortBy(list, 'author'),
  COMMENT: (list) => sortBy(list, 'num_comments').reverse(),
  POINT: (list) => sortBy(list, 'points').reverse(),
  };
const List = ({ list, onRemoveItem }) => {
  // const [sort, setSort] = React.useState('NONE');
  const [sort, setSort] = React.useState({
    sortKey: 'NONE',
    isReverse: false,
    });
    
const handleSort = (sortKey) => {
  const isReverse = sort.sortKey === sortKey && !sort.isReverse;
  // setSort(sortKey);
  // setSort({ sortKey: sortKey, isReverse: isReverse });
  setSort({ sortKey, isReverse });

};
// const sortFunction = SORTS[sort];
const sortFunction = SORTS[sort.sortKey];

// const sortedList = sortFunction(list);
const sortedList = sort.isReverse?sortFunction(list).reverse():sortFunction(list);


  return (
    <>
    <h3>{sort.sortKey} {sort.isReverse && '🔼'} {!sort.isReverse && '🔽'}</h3>
    <p>{console.log(sortFunction)}</p>
  <ul>
    <li style={{ display: 'flex', backgroundColor: 'teal', fontSize: '1.5em', color:'white', marginBottom: '10px' }}>
<span style={{ width: '40%' }} onClick={() => handleSort('TITLE')}>Title</span>
<span style={{ width: '30%' }} onClick={() => handleSort('AUTHOR')}>Author</span>
<span style={{ width: '10%' }} onClick={() => handleSort('COMMENT')}>Comments</span>
<span style={{ width: '10%' }} onClick={() => handleSort('POINT')}>Points</span>
<span style={{ width: '10%' }}>Actions</span>
</li>

    {sortedList.map((item) => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </ul>
  </>
)};

const Item = ({ item, onRemoveItem }) => (
  <li style={{ display: 'flex', marginBottom: '5px' }}>
    <span style={{ width: '40%' }}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{ width: '30%' }}>{item.author}</span>
    <span style={{ width: '10%' }}>{item.num_comments}</span>
    <span style={{ width: '10%' }}>{item.points}</span>
    <span style={{ width: '10%' }}>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
);

export { List };
