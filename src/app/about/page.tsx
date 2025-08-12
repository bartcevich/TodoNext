import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          О нашем приложении
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Дизайн сайта
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="inline-block w-6 h-6 border border-gray-300 rounded mr-2"></span>
              Мысли о предмете
            </li>
            <li className="flex items-center">
              <span className="inline-block w-6 h-6 border border-gray-300 rounded mr-2"></span>
              Выходит Проект
            </li>
            <li className="flex items-center">
              <span className="inline-block w-6 h-6 border border-gray-300 rounded mr-2"></span>
              Повторите Мастерка
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Кеста заявки
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="inline-block w-6 h-6 border border-gray-300 rounded mr-2"></span>
              Именно сделает в карьере
            </li>
            <li className="flex items-center">
              <span className="inline-block w-6 h-6 border border-gray-300 rounded mr-2"></span>
              Входит 20–значение
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
        >
          Назад
        </Link>
      </div>
    </div>
  );
}
