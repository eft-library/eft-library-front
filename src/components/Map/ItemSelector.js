import hooks from 'src/hooks/hooks';
import { ITEM_LIST } from 'src/utils/itemConstants';

const ItemSelector = (props) => {
  return (
    <div
      style={{
        width: '20%',
        display: 'block',
        alignItems: 'center',
        alignContent: 'center',
      }}
    >
      <div>
        <div>
          <button onClick={() => hooks.useOrbitReset(props.orbitControls)}>
            Reset Camera
          </button>
        </div>
        {ITEM_LIST.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => props.onClickItem(item.value)}
              style={
                props.viewItemList.includes(item.value)
                  ? { color: 'hotpink' }
                  : { color: 'green' }
              }
            >
              {item.kr}
            </button>
            <div>
              {item.child.map((childItem, childIndex) => (
                <button
                  onClick={() => props.onClickItem(childItem.value)}
                  key={childIndex} // 각각의 자식 요소에 key 할당
                  style={
                    props.viewItemList.includes(childItem.value)
                      ? { color: 'hotpink' }
                      : { color: 'green' }
                  }
                >
                  {childItem.kr}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemSelector;
