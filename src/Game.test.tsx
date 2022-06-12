import { render, screen } from '@testing-library/react';
import Game from './Game';

describe('When the Game loads', () => {
  beforeEach(() => render(<Game />));

  test('there should be a header', () => {  
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  test('there should be a board', () => {
    const header = screen.getByTestId('board');
    expect(header).toBeInTheDocument();
  });
})