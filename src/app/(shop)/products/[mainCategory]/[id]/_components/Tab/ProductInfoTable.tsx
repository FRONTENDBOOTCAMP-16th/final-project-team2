const ProductInfoTable = () => {
  return (
    <table className="max-w-7xl m-auto w-full border-t border-b border-t-gray-200 border-b-gray-200">
      <tbody>
        <tr className="border-b border-b-gray-200">
          <th className="w-32 px-4 py-3 text-left bg-gray-50 text-gray-500">재질</th>
          <td className="px-4 py-3">천연 원목 커버, 무표백 용지</td>
        </tr>

        <tr className="border-b border-b-gray-200">
          <th className="w-32 px-4 py-3 text-left bg-gray-50 text-gray-500">페이지</th>
          <td className="px-4 py-3">120페이지 (60매)</td>
        </tr>

        <tr className="border-b border-b-gray-200">
          <th className="w-32 px-4 py-3 text-left bg-gray-50 text-gray-500">용지</th>
          <td className="px-4 py-3">80g/m² 무선 노트 용지</td>
        </tr>

        <tr className="border-b border-b-gray-200">
          <th className="w-32 px-4 py-3 text-left bg-gray-50 text-gray-500">제본</th>
          <td className="px-4 py-3">스프링 제본 (180도 펼침 가능)</td>
        </tr>

        <tr>
          <th className="w-32 px-4 py-3 text-left bg-gray-50 text-gray-500">원산지</th>
          <td className="px-4 py-3">대한민국</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductInfoTable;
