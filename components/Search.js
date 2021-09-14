import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

//  for the autocomplete and select accesbiles box we gonna use third party pkg Downshift ==> https://github.com/downshift-js/downshift

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    # if you want to rename the method from keystone API, just create a key.

    searchTerms: allProducts(
      where: {
        # or is to combine query in multiple fields (==> pass an array)
        OR: [
          # _i for case insensitive
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  // needed to change page on item click
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    // this option will bypass Apollo cache, we don't want results from cache
    {
      fetchPolicy: 'no-cache',
    }
  );
  // console.log(data);
  // below we fall back to empty arrays in case items are undefined ==> nothing in input box
  const items = data?.searchTerms || [];
  // console.log(items);
  const findItemsButChill = debounce(findItems, 350);
  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      // this will fire off at every input changes. Issue is it will produce a lot of network request. We need to DEBOUNCE the function, to not fire request too much.
      //  We gonna use Debounce function from lodash library.
      // https://docs-lodash.com/v4/debounce/
      // console.log('input changed!');
      findItemsButChill({
        variables: { searchTerm: inputValue },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      // console.log(selectedItem);
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    // itemToString: (item) => (item === null ? '' : item.name),
    // same than :
    itemToString: (item) => item?.name || '',
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search an item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              {...getItemProps({ item, index })}
              key={item.id}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="70"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry no item found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
