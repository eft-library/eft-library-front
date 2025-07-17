"use client";

export default function MarketItems() {
  return (
    <Card
      className={`${
        theme === "dark"
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-gray-200"
      }`}
    >
      <CardHeader>
        <CardTitle
          className={`flex items-center gap-2 text-lg sm:text-xl ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          아이템 목록 및 최신 시세
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        {/* Mobile Card Layout */}
        <div className="block sm:hidden">
          {marketItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 border-b ${
                theme === "dark" ? "border-slate-700/50" : "border-gray-200/50"
              } last:border-b-0`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className={`w-12 h-12 rounded ${
                    theme === "dark" ? "bg-slate-700" : "bg-gray-200"
                  } flex-shrink-0`}
                />
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    } text-sm leading-tight`}
                  >
                    {item.name}
                  </div>
                  <div
                    className={`text-xs ${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    } mt-1`}
                  >
                    {item.seller}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-orange-400 font-medium">
                        {item.traderPrice.toLocaleString()} ₽
                      </div>
                      <div className="text-xs text-green-500 font-medium">
                        {item.fleaPrice.toLocaleString()} ₽
                      </div>
                    </div>
                    <Badge
                      variant={item.change > 0 ? "default" : "destructive"}
                      className={`text-xs ${
                        item.change > 0
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : ""
                      }`}
                    >
                      {item.change > 0 ? "+" : ""}
                      {item.change}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop Table Layout */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className={`border-b ${
                  theme === "dark" ? "border-slate-700" : "border-gray-200"
                }`}
              >
                <th
                  className={`text-left py-3 px-2 ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  사진
                </th>
                <th
                  className={`text-left py-3 px-2 ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  아이템
                </th>
                <th
                  className={`text-left py-3 px-2 ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  상인에게 판매
                </th>
                <th
                  className={`text-left py-3 px-2 ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  플리마켓 가격
                </th>
                <th
                  className={`text-left py-3 px-2 ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  변동률
                </th>
              </tr>
            </thead>
            <tbody>
              {marketItems.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b ${
                    theme === "dark"
                      ? "border-slate-700/50 hover:bg-slate-700/30"
                      : "border-gray-200/50 hover:bg-gray-50"
                  }`}
                >
                  <td className="py-4 px-2">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className={`w-16 h-16 rounded ${
                        theme === "dark" ? "bg-slate-700" : "bg-gray-200"
                      }`}
                    />
                  </td>
                  <td className="py-4 px-2">
                    <div
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </div>
                    <div
                      className={`text-sm ${
                        theme === "dark" ? "text-slate-400" : "text-gray-600"
                      }`}
                    >
                      {item.seller}
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className="font-semibold text-orange-400">
                      {item.traderPrice.toLocaleString()} ₽
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-green-500 font-semibold">
                      {item.fleaPrice.toLocaleString()} ₽
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <Badge
                      variant={item.change > 0 ? "default" : "destructive"}
                      className={
                        item.change > 0
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : ""
                      }
                    >
                      {item.change > 0 ? "+" : ""}
                      {item.change}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
