# Android Web App

A responsive web application designed specifically for Android devices, following Material Design principles. This app is built with vanilla HTML, CSS, and JavaScript, and includes PWA support for a native app-like experience.

## Features

- **Responsive Design**: Optimized for all Android screen sizes
- **Material Design**: Follows Google's Material Design guidelines
- **Progressive Web App**: Can be installed on the home screen
- **Offline Support**: Works without an internet connection
- **Touch Optimized**: Designed for touch interactions
- **Fast Loading**: Optimized for performance on mobile networks

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, etc.)
- A local web server for development (optional but recommended)

### Installation

1. Clone this repository or download the files
2. Open `index.html` in a web browser

For a better development experience, you can use a local web server:

```bash
# Using Python's built-in server
python -m http.server 8000

# Or using Node.js http-server
npx http-server .
```

Then open `http://localhost:8000` in your browser.

## Project Structure

```
.
├── index.html          # Main HTML file
├── styles.css         # Styles for the application
├── app.js             # JavaScript for interactivity
├── sw.js              # Service Worker for PWA functionality
├── manifest.json      # Web App Manifest for PWA
└── README.md          # This file
```

## Building for Production

This is a static web app, so you can deploy it to any static web hosting service:

- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

## Customization

### Changing Colors

You can customize the color scheme by modifying the CSS variables in `styles.css`:

```css
:root {
    --primary: #6200ee;       /* Primary brand color */
    --primary-dark: #3700b3;  /* Darker shade of primary color */
    --secondary: #03dac6;     /* Secondary brand color */
    --background: #f5f5f5;    /* Background color */
    --surface: #ffffff;       /* Surface/card color */
    --error: #b00020;         /* Error color */
}
```

### Adding Pages

To add new pages:

1. Create a new HTML file (e.g., `about.html`)
2. Copy the basic structure from `index.html`
3. Update the content as needed
4. Add navigation links in the bottom navigation bar

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [Material Icons](https://fonts.google.com/icons)
- [Material Design Guidelines](https://material.io/design)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
