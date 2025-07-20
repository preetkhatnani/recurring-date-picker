import FrequencySelector from './components/FrequencySelector';
import CalendarView from './components/CalendarView';

export default function PageLayout() {
  return (
    <div className="min-h-screen bg-blue-950 text-blue-950 flex flex-col">
      {/* Header */}
      <header className="bg-white px-6 py-2 shadow-md">
        <h1
          className="text-4xl font-bold text-blue-950 text-center"
          style={{ fontFamily: 'Times New Roman, Times, serif' }}
        >
          Recurring Schedule Picker
        </h1>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-sky-300 p-6 overflow-y-auto">
          <h2
            className="text-4xl font-bold text-center mb-8"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            CONTENTS
          </h2>
          <nav className="text-2xl text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            {['Recurring Picker', 'Today', 'Upcoming', 'Completed', 'Settings'].map((item) => (
              <a
                key={item}
                href="#"
                className="block w-full py-3 rounded hover:bg-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto flex justify-center">
          <div className="w-full max-w-5xl">
            <CalendarView />
          </div>
        </main>
      </div>
    </div>
  );
}
