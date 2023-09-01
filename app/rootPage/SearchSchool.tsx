import { FC, useCallback, useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, useSearchBox, useHits } from 'react-instantsearch-hooks-web';
import SearchBox from './SearchBox';

interface Props {
  onSubmit: (affiliationCode: string) => void;
}


const searchClient = algoliasearch(
  'PMMWBPYRRV',
  '362d746fd5c64fa6e997392388673fae'
);

type Search = (value: string) => void;

const SearchSchoolBox: FC<Props> = ({ onSubmit }) => {
  const { hits } = useHits();
  const [value, setValue] = useState('')
  const [results, setResults] = useState([])
  const memoizedSearch = useCallback((query: string, search: Search) => {
    search(query);
  }, []);

  

  const { refine } = useSearchBox({
    queryHook: memoizedSearch,
  });


  useEffect(() => {
    refine(value);
  }, [value])


  // console.log('hits', hits)

  return (
    <SearchBox
      label="School"
      placeholder="Search School"
      value={value}
      setValue={setValue}
      onSubmit={(affiliationCode: string) => {
        onSubmit(affiliationCode)
      }}
      options={hits && hits.length > 0 ? hits.map((hit) => ({ 
        label: String(hit.name),
        value: Number(hit.objectID),
        })) : []}
    />
  )
}


const SearchSchool: FC<Props> = ({ onSubmit }) => {
  return (
    <InstantSearch
      indexName="dotstudio"
      searchClient={searchClient}
    >
      <SearchSchoolBox onSubmit={onSubmit} />
    </InstantSearch>
  )
}

export default SearchSchool;