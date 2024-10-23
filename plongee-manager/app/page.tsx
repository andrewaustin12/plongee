import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-cover bg-center" style={{backgroundImage: "url('/hero-image.jpg')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Manage Your Dive Center with Ease</h1>
          <p className="text-xl mb-8">Streamline bookings, equipment, and staff management all in one place</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Choose DiveManager Pro?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {['Effortless Booking', 'Equipment Tracking', 'Staff Management'].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                {/* Replace with actual icon */}
                <span className="text-3xl">🤿</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature}</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Transform Your Dive Center?</h2>
          <p className="text-xl mb-8">Join thousands of dive centers already using DiveManager Pro</p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="font-semibold mb-4">DiveManager Pro</h3>
            <p className="text-gray-600">Simplifying dive center operations worldwide</p>
          </div>
          {['Product', 'Company', 'Resources', 'Legal'].map((category, index) => (
            <div key={index} className="w-full md:w-1/6 mb-8 md:mb-0">
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="text-gray-600">
                <li className="mb-2">Link 1</li>
                <li className="mb-2">Link 2</li>
                <li className="mb-2">Link 3</li>
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
