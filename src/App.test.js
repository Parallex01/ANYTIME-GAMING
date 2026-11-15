import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('navigation switches between pages while keeping the navbar available', () => {
  window.history.replaceState(null, '', window.location.pathname);
  render(<App />);

  const navigation = screen.getByRole('navigation', { name: /main navigation/i });
  const homeAnimation = screen.getByRole('region', { name: 'Home scroll animation' });
  expect(homeAnimation.previousElementSibling).toHaveClass('navbar');
  expect(homeAnimation.nextElementSibling.tagName).toBe('MAIN');
  expect(within(homeAnimation).getByRole('heading', { name: 'ANYTIME' })).toBeInTheDocument();
  expect(within(homeAnimation).getByRole('heading', { name: 'GAMING CAFE' })).toBeInTheDocument();
  expect(within(homeAnimation).getByRole('link', { name: /explore our setups/i })).toBeInTheDocument();

  fireEvent.click(within(navigation).getByRole('link', { name: 'ABOUT' }));
  expect(screen.queryByRole('region', { name: 'Home scroll animation' })).not.toBeInTheDocument();
  expect(screen.queryByRole('region', { name: 'Services scroll animation' })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /built for/i })).toBeInTheDocument();
  expect(window.location.hash).toBe('#about');
  expect(within(navigation).getByRole('link', { name: 'ABOUT' })).toHaveAttribute(
    'aria-current',
    'page'
  );

  fireEvent.click(within(navigation).getByRole('link', { name: 'SERVICES' }));
  const animation = screen.getByRole('region', { name: 'Services scroll animation' });
  expect(animation.parentElement.tagName).toBe('MAIN');
  expect(within(animation).getByRole('img', { name: 'Cinematic gaming animation frames' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /our services/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /simple pricing/i })).toBeInTheDocument();
  expect(animation.querySelectorAll('.service-image')).toHaveLength(0);
  expect(
    within(animation).getAllByRole('button', { name: /^View .* games$/i })
  ).toHaveLength(5);
  expect(screen.queryByRole('heading', { name: /built for/i })).not.toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
});

test('places the gaming image above the footer only on the home page', () => {
  window.history.replaceState(null, '', window.location.pathname);
  render(<App />);

  const image = screen.getByRole('img', { name: 'Gaming setup' });
  const footer = screen.getByRole('contentinfo');
  expect(image.nextElementSibling).toBe(footer);
  expect(screen.getByRole('heading', { name: 'ANYTIME' })).toBeInTheDocument();

  fireEvent.click(
    within(screen.getByRole('navigation', { name: /main navigation/i })).getByRole('link', {
      name: 'ABOUT',
    })
  );
  expect(screen.queryByRole('img', { name: 'Gaming setup' })).not.toBeInTheDocument();
  expect(footer).toBeInTheDocument();
});

test('opens a game preview with its description and returns to the game list', () => {
  window.history.replaceState(null, '', '#games');
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'View ASPHALT details' }));

  expect(screen.getByRole('img', { name: 'ASPHALT animated preview' })).toBeInTheDocument();
  expect(
    screen.getByText(/Race through vibrant city streets, master sharp turns/)
  ).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /back to games/i }));
  expect(screen.getByRole('button', { name: 'View ASPHALT details' })).toBeInTheDocument();
});

test('service cards navigate directly to the games page', () => {
  window.history.replaceState(null, '', window.location.pathname);
  render(<App />);

  const navigation = screen.getByRole('navigation', { name: /main navigation/i });
  fireEvent.click(within(navigation).getByRole('link', { name: 'SERVICES' }));
  fireEvent.click(screen.getByRole('button', { name: 'View PC GAMING games' }));

  expect(screen.getByRole('heading', { name: /popular games/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'View ASPHALT details' })).toBeInTheDocument();
  expect(within(navigation).getByRole('link', { name: 'GAMES' })).toHaveAttribute(
    'aria-current',
    'page'
  );
});

test('about page stats navigate to their matching pages', () => {
  window.history.replaceState(null, '', window.location.pathname);
  render(<App />);

  const navigation = screen.getByRole('navigation', { name: /main navigation/i });
  fireEvent.click(within(navigation).getByRole('link', { name: 'ABOUT' }));

  fireEvent.click(screen.getByRole('button', { name: 'Explore the game collection' }));
  expect(window.location.hash).toBe('#games');
  expect(screen.getByRole('heading', { name: /popular games/i })).toBeInTheDocument();

  fireEvent.click(within(navigation).getByRole('link', { name: 'ABOUT' }));
  fireEvent.click(screen.getByRole('button', { name: 'Explore PC and PS5 services' }));
  expect(window.location.hash).toBe('#services');
  expect(screen.getByRole('heading', { name: /our services/i })).toBeInTheDocument();

  fireEvent.click(within(navigation).getByRole('link', { name: 'ABOUT' }));
  fireEvent.click(screen.getByRole('button', { name: 'Explore VR games' }));
  expect(window.location.hash).toBe('#games');
  expect(screen.getByRole('heading', { name: /popular games/i })).toBeInTheDocument();
});

test('a pricing row opens hourly rate details and a booking date field', () => {
  window.history.replaceState(null, '', window.location.pathname);
  render(<App />);

  fireEvent.click(
    within(screen.getByRole('navigation', { name: /main navigation/i })).getByRole('link', {
      name: 'SERVICES',
    })
  );
  fireEvent.click(screen.getByRole('button', { name: 'Book PS5 GAMING' }));

  expect(screen.getByText('When would you like to book?')).toBeInTheDocument();
  expect(screen.getByLabelText('When would you like to book?')).toHaveAttribute('type', 'date');
  expect(screen.getByText('₹120', { selector: 'strong' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /request booking/i })).toBeInTheDocument();
});

test('lists 50 games and searches by game name, genre, or platform', () => {
  window.history.replaceState(null, '', '#games');
  render(<App />);

  expect(screen.getByText('50 GAMES FOUND')).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /^View .* details$/i })).toHaveLength(50);

  const search = screen.getByRole('searchbox', { name: 'SEARCH GAMES' });
  fireEvent.change(search, { target: { value: 'Racing Simulator' } });

  expect(screen.getByRole('button', { name: 'View GRAN TURISMO 7 details' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'View VALORANT details' })).not.toBeInTheDocument();
  expect(screen.getByText(/\d+ GAMES FOUND/)).toBeInTheDocument();
});
