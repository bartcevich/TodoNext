import Link from "next/link";

export default function WelcomePage() {
  console.log('new version');
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-2xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Добро пожаловать в ваше приложение для задач!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Эффективно организуйте свои задачи с помощью нашего простого и мощного
          приложения todo. Начните прямо сейчас, чтобы повысить свою
          производительность!
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Авторизация
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Познакомиться с приложением
          </Link>
        </div>
      </div>
    </div>
  );
}
