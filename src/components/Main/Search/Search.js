import Downshift from 'downshift';

const items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' },
];

const Search = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        marginBottom: '40px',
      }}
    >
      <Downshift
        onChange={(selection) =>
          alert(
            selection ? `You selected ${selection.value}` : 'Selection Cleared',
          )
        }
        itemToString={(item) => (item ? item.value : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          getRootProps,
        }) => (
          <div style={{ width: '40%' }}>
            <label {...getLabelProps()}>Enter a fruit</label>
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '100%',
              }}
              {...getRootProps({}, { suppressRefError: true })}
            >
              <input
                {...getInputProps({
                  placeholder: '검색어를 입력해주세요',
                  style: {
                    fontSize: '18px',
                    width: '100%',
                    height: '50px',
                    borderRadius: '10px',
                    paddingLeft: '20px',
                  },
                })}
              />
              <ul
                {...getMenuProps()}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  padding: '5px 0',
                  zIndex: 1000,
                }}
              >
                {isOpen &&
                  items
                    .filter(
                      (item) => !inputValue || item.value.includes(inputValue),
                    )
                    .map((item, index) => (
                      <li
                        key={index}
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index
                                ? 'lightgray'
                                : 'white',
                            fontWeight:
                              selectedItem === item ? 'bold' : 'normal',
                            cursor: 'pointer',
                            padding: '8px 10px',
                          },
                        })}
                      >
                        {item.value}
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        )}
      </Downshift>
    </div>
  );
};

export default Search;
