import { MessageSquare, Search, Zap, Shield, Users, BarChart } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Natural language chat',
    description: 'Ask questions in plain English. Get accurate answers grounded in your document.',
  },
  {
    icon: Search,
    title: 'Semantic search',
    description: 'Powered by vector embeddings — finds the right sections even without exact keywords.',
  },
  {
    icon: Zap,
    title: 'Instant summaries',
    description: 'Get a full document summary in seconds. No more reading 50-page PDFs manually.',
  },
  {
    icon: Shield,
    title: 'Private & secure',
    description: 'Your documents are encrypted. Only you can access your files and chat history.',
  },
  {
    icon: Users,
    title: 'Team collaboration',
    description: 'Share document chats with your team. Perfect for contracts, research, and reports.',
  },
  {
    icon: BarChart,
    title: 'Data extraction',
    description: 'Extract tables, figures, and structured data from complex financial or legal documents.',
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to understand any document
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            From legal contracts to research papers — get answers instantly
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
