const testimonials = [
  {
    quote: "I uploaded 3 months of financial reports and asked DocChat to find patterns. It saved me 6 hours of analysis.",
    author: "Sarah Chen",
    role: "Financial Analyst",
    avatar: "SC",
  },
  {
    quote: "We use it for contract review. Ask it to identify risky clauses and it finds them instantly. Game changer for our legal team.",
    author: "Marcus Williams",
    role: "Corporate Lawyer",
    avatar: "MW",
  },
  {
    quote: "As a PhD student, I process dozens of research papers weekly. DocChat lets me extract key findings without reading every word.",
    author: "Dr. Aisha Patel",
    role: "Research Scientist",
    avatar: "AP",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Loved by professionals</h2>
          <p className="text-lg text-gray-500">Lawyers, researchers, analysts — they all use DocChat</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.author} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-gray-700 text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{t.author}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
