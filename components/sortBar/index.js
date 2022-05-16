import * as React from "react";
import Image from "next/image";

import DisplayActiveIcon from '../../public/icons/switch-active.svg';
import DisplayDefaultIcon from '../../public/icons/switch-default.svg';
import TriangleDefault from '../../public/icons/sort-default.svg';
import TriangleActive from '../../public/icons/sort-active.svg';
import styles from '../../styles/sortBar/sortBar.module.scss';


const filters = [
  { text: "По цене", sortName: "price" },
  { text: "По алфавиту", sortName: "alphabet" },
  { text: "Новинки", sortName: "novelty" },
  { text: "Хит продаж", sortName: "bestsellers" },
];

const SortBar = ({
  sortState,
  setSortState,
  displayInline,
  setDisplayInline,
}) => {
  const [showSort, setShowSort] = React.useState(false);

  const changeSort = (e, sortName) => {
    e.stopPropagation();

    if (!sortState[sortName]) {
      setSortState({ [sortName]: 'asc' });
    } else if (sortState[sortName] === 'asc') {
      setSortState({ [sortName]: 'desc' });
    } else {
      setSortState({});
    }
  };

  const closeSort = () => setShowSort(false);

  return (
    <div className={styles.sortBar}>
      <div>
        <div
          className={styles.sortBarName}
          onClick={() => setShowSort(!showSort)}
        >
          <span>Сортировка:</span>
        </div>
        {
          showSort &&
        <FilterBlock
          sortState={sortState}
          changeSort={changeSort}
          filters={filters}
          closeSort={closeSort}
        />
        }
        <div className={styles.desktop}>
          <div className={styles.sortItemWrapper}>
            {filters.map((filter, index) => (
              <SortItem
                key={index}
                text={filter.text}
                sortName={filter.sortName}
                changeSort={changeSort}
                sortState={sortState}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.switchDisplay}>
        <span>Вид:</span>
        <div onClick={() => setDisplayInline(true)}>
          {!displayInline ? (
            <div className={styles.rotateImg}>
              <Image src={DisplayDefaultIcon} alt="display" />
            </div>
          ) : (
            <div>
              <Image src={DisplayActiveIcon} alt="display" />
            </div>
          )}
        </div>
        <div onClick={() => setDisplayInline(false)}>
          {!displayInline ? (
            <div className={styles.rotateImg}>
              <Image src={DisplayActiveIcon} alt="display" />
            </div>
          ) : (
            <div>
              <Image src={DisplayDefaultIcon} alt="display" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function FilterBlock ({ closeSort, filters, changeSort, sortState}) {
  React.useEffect(() => {
    document.addEventListener('click', closeSort, false);

    return () => {
      document.removeEventListener('click', closeSort, false);
    }
  }, [])

  return (
    <div className={styles.sortItemWrapper}>
      {filters.map((filter, index) => (
        <SortItem
          key={index}
          text={filter.text}
          sortName={filter.sortName}
          changeSort={changeSort}
          sortState={sortState}
        />
      ))}
    </div>
  );
};

function SortItem ({ text, sortName, changeSort, sortState }) {
  return (
    <div className={styles.sortItem} onClick={e => changeSort(e, sortName)}>
      <div className={styles.triangleWrapper}>
        <div className={styles.topTriangle}>
          {
            sortState[sortName] === 'asc' ?
              <Image src={TriangleActive} alt="arrow" />
              :
              <Image src={TriangleDefault} alt="arrow" />
          }
        </div>
        <div className={styles.bottomTriangle}>
          {sortState[sortName] === 'desc' ?
            <Image src={TriangleActive} alt="arrow" />
            :
            <Image src={TriangleDefault} alt="arrow" />
          }
        </div>
      </div>
      <span>{text}</span>
    </div>
  );
}

export default SortBar;
