
'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const usageData = [
  { category: 'Smart Home', usage: 89, color: '#10b981' },
  { category: 'Eco Phone', usage: 92, color: '#059669' },
  { category: 'Green Computing', usage: 84, color: '#047857' },
  { category: 'Audio', usage: 81, color: '#065f46' },
  { category: 'Solar Tech', usage: 76, color: '#064e3b' },
  { category: 'Power Solutions', usage: 68, color: '#022c22' }
];

const chartData = usageData.map((item, index) => ({
  name: item.category,
  usage: item.usage,
  month: `Month ${index + 1}`
}));

export default function UsageChart() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Category Usage Analytics</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our sustainable tech categories are making an impact among environmentally conscious consumers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Category Performance</h3>
            {usageData.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{item.category}</span>
                  <span className="text-green-600 font-bold">{item.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${item.usage}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h4 className="text-xl font-bold text-gray-900 mb-6">Usage Trend Over Time</h4>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorUsage)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-trending-up-line w-6 h-6 flex items-center justify-center text-green-600"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Highest Usage</h4>
            <p className="text-green-600 font-bold text-xl">Eco Phone Accessories</p>
            <p className="text-gray-600 text-sm">92% user satisfaction</p>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-bar-chart-line w-6 h-6 flex items-center justify-center text-blue-600"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Average Usage</h4>
            <p className="text-blue-600 font-bold text-xl">82%</p>
            <p className="text-gray-600 text-sm">Across all categories</p>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-rocket-line w-6 h-6 flex items-center justify-center text-purple-600"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Growth Potential</h4>
            <p className="text-purple-600 font-bold text-xl">Power Solutions</p>
            <p className="text-gray-600 text-sm">Emerging category</p>
          </div>
        </div>
      </div>
    </section>
  );
}
