const Sort = () => {
  return (
    <div>
      <label htmlFor="sort" className="sr-only">
        정렬
      </label>
      <select name="sort" id="sort" className="border w-50 h-9 px-3">
        <option value="lastProduct">최신순</option>
        <option value="popularProduct">인기순</option>
        <option value="highPriceProduct">가격 높은 순</option>
        <option value="lowPriceProduct">가격 낮은 순</option>
      </select>
    </div>
  );
};

export default Sort;
