import { render, screen } from '@testing-library/react';
import App from './App';

describe('When the App loads', () => {
  beforeEach(() => render(<App />));

  test('there should be a header', () => {  
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  test('there should be a board', () => {
    const header = screen.getByTestId('board');
    expect(header).toBeInTheDocument();
  });
})
