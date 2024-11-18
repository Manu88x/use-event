// src/__tests__/App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('Portfolio Elements', () => {
  test('displays a top-level heading with the text `Hi, I\'m _______`', () => {
    render(<App />);
    const topLevelHeading = screen.getByRole('heading', {
      name: /hi, i'm/i,
      exact: false,
      level: 1,
    });
    expect(topLevelHeading).toBeInTheDocument();
  });

  test('displays an image of yourself', () => {
    render(<App />);
    const image = screen.getByAltText('My profile pic');
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/350');
  });

  test('displays second-level heading with the text `About Me`', () => {
    render(<App />);
    const secondLevelHeading = screen.getByRole('heading', {
      name: /about me/i,
      level: 2,
    });
    expect(secondLevelHeading).toBeInTheDocument();
  });

  test('displays a paragraph for your biography', () => {
    render(<App />);
    const bio = screen.getByText(/lorem ipsum/i);
    expect(bio).toBeInTheDocument();
  });

  test('displays the correct links', () => {
    render(<App />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(githubLink).toHaveAttribute('href', expect.stringContaining('https://github.com'));
    expect(linkedinLink).toHaveAttribute('href', expect.stringContaining('https://linkedin.com'));
  });
});

describe('Newsletter Form - Initial State', () => {
  test('the form includes text inputs for name and email address', () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test('the form includes three checkboxes to select areas of interest', () => {
    render(<App />);
    const reactCheckbox = screen.getByLabelText(/react/i);
    const jsCheckbox = screen.getByLabelText(/javascript/i);
    const webDevCheckbox = screen.getByLabelText(/web development/i);
    expect(reactCheckbox).toBeInTheDocument();
    expect(jsCheckbox).toBeInTheDocument();
    expect(webDevCheckbox).toBeInTheDocument();
  });

  test('the checkboxes are initially unchecked', () => {
    render(<App />);
    const reactCheckbox = screen.getByLabelText(/react/i);
    const jsCheckbox = screen.getByLabelText(/javascript/i);
    const webDevCheckbox = screen.getByLabelText(/web development/i);
    expect(reactCheckbox).not.toBeChecked();
    expect(jsCheckbox).not.toBeChecked();
    expect(webDevCheckbox).not.toBeChecked();
  });
});

describe('Newsletter Form - Adding Responses', () => {
  test('the page shows information the user types into the name and email address form fields', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/thank you for signing up, john doe/i)).toBeInTheDocument();
  });

  test('checked status of checkboxes changes when user clicks them', () => {
    render(<App />);

    const reactCheckbox = screen.getByLabelText(/react/i);
    const jsCheckbox = screen.getByLabelText(/javascript/i);
    const webDevCheckbox = screen.getByLabelText(/web development/i);

    fireEvent.click(reactCheckbox);
    expect(reactCheckbox).toBeChecked();
    
    fireEvent.click(jsCheckbox);
    expect(jsCheckbox).toBeChecked();
    
    fireEvent.click(webDevCheckbox);
    expect(webDevCheckbox).toBeChecked();
  });

  test('a message is displayed when the user clicks the Submit button', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Smith' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane.smith@example.com' } });

    fireEvent.click(screen.getByLabelText(/react/i));
    fireEvent.click(screen.getByLabelText(/web development/i));

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/thank you for signing up, jane smith/i)).toBeInTheDocument();
    expect(screen.getByText(/you've selected the following interests: react, web development/i)).toBeInTheDocument();
  });
});
