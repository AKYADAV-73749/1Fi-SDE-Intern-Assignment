export const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulating a successful API response
      resolve([
        {
          id: '1',
          name: 'iPhone 17 Pro Max',
          price: '₹1,59,900',
          image: 'https://cdn-icons-png.flaticon.com/512/65/65680.png',
          variants: ['256GB', '512GB', '1TB'],
          details: 'The ultimate iPhone. Shop using your mutual funds with 0% interest and instant approval.'
        },
        {
          id: '2',
          name: 'MacBook Pro 14"',
          price: '₹1,69,900',
          image: 'https://cdn-icons-png.flaticon.com/512/65/65680.png',
          variants: ['M3', 'M3 Pro'],
          details: 'Mind-blowing performance. Zero downpayment. Fully backed by your investments.'
        },
        {
          id: '3',
          name: 'Samsung Galaxy S25 Ultra',
          price: '₹1,34,900',
          image: 'https://cdn-icons-png.flaticon.com/512/65/65680.png',
          variants: ['256GB', '512GB'],
          details: 'Epic AI features. Keep your wealth growing while you enjoy life today.'
        }
      ]);
    }, 1500); // 1.5 second simulated network delay
  });
};

export const fetchEmiPlans = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '3m', months: 3, interest: '0%', description: 'No-cost EMI' },
        { id: '6m', months: 6, interest: '0%', description: 'No-cost EMI' },
        { id: '9m', months: 9, interest: '0%', description: 'No-cost EMI' },
        { id: '12m', months: 12, interest: '0%', description: 'No-cost EMI' },
      ]);
    }, 800);
  });
};
