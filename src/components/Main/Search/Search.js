import Downshift from 'downshift';
import { items } from 'src/utils/consts/searchConsts';
import { useState } from 'react';

const Search = () => {
  const [inputIsFocused, setInputIsFocused] = useState(false);

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
        isOpen={inputIsFocused} // 입력란이 포커스를 받으면 드롭다운이 열리도록 설정
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
                  onFocus: () => setInputIsFocused(true), // 입력란이 포커스를 받으면 상태 변경
                  onBlur: () => setInputIsFocused(false), // 입력란이 포커스를 잃으면 상태 변경
                })}
              />
              <ul
                {...getMenuProps()}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 5px)',
                  left: 0,
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  padding: '5px 0',
                  zIndex: 10,
                  width: inputIsFocused ? '100%' : '',
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
