# Abhishek Bajpai - Portfolio Website 🌟

A modern, interactive portfolio website showcasing my work as an aspiring Full Stack Developer, Designer, and Filmmaker.

![Portfolio Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop)

## ✨ Features

### 🎨 Beautiful Aurora Background
- Stunning animated Aurora background using WebGL and OGL library
- Custom purple-violet-cyan gradient color scheme
- Fully responsive and performant

### 📱 Fully Responsive Sections

1. **Hero Section** - Eye-catching landing page with animated Aurora background
2. **Navigation Bar** - Glassmorphism navbar with smooth scroll and mobile menu
3. **About Me** - Professional bio with profile photo and download resume button
4. **Skills** - Categorized skill cards with animated progress bars
5. **Projects** - Filterable project gallery (ready for Supabase integration)
6. **Design Portfolio** - Image gallery with lightbox for Canva designs
7. **Films/YouTube** - Featured videos and channel subscription
8. **Contact** - Functional contact form with validation and social links
9. **Footer** - Complete footer with back-to-top button

## 🚀 Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: OGL (for Aurora background)
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel/Netlify

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/heyabhishekbajpai/Portfolio.git
cd Portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Customization

### Aurora Background Colors
Edit `src/components/Hero.jsx`:
```jsx
<Aurora 
  colorStops={['#3915ac', '#785bec', '#21a2f2']}  // Change these hex colors
  amplitude={0.40}
  blend={0.45}
  speed={1.0}
/>
```

### Color Scheme
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#3915ac',
  secondary: '#785bec',
  accent: '#21a2f2',
}
```

## 🔗 Supabase Integration (Projects Section)

The Projects section is ready for Supabase integration. To connect:

1. **Install Supabase client**
```bash
npm install @supabase/supabase-js
```

2. **Create Supabase client** (`src/lib/supabase.js`)
```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)
```

3. **Update Projects component** to fetch from Supabase instead of dummy data

## 📂 Project Structure

```
Portfolio/
├── public/
│   └── bajpai.png
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Aurora.jsx
│   │   ├── Aurora.css
│   │   ├── Contact.jsx
│   │   ├── Design.jsx
│   │   ├── Films.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🌟 Key Highlights

- ⚡ Lightning-fast performance with Vite
- 🎭 Smooth animations with Framer Motion
- 📱 Mobile-first responsive design
- ♿ Accessible components
- 🎨 Custom glassmorphism effects
- 🌈 Gradient text and modern UI
- 🔄 Smooth scroll navigation
- 💫 Interactive hover effects

## 📧 Contact

- **Email**: bajpai.connect@gmail.com
- **LinkedIn**: [heybajpai](https://www.linkedin.com/in/heybajpai/)
- **GitHub**: [heyabhishekbajpai](https://github.com/heyabhishekbajpai)
- **YouTube**: [@abhishek.bajpai](https://www.youtube.com/@abhishek.bajpai)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Aurora background inspired by React Bits
- Icons from Lucide React
- Images from Unsplash (placeholder)
- Fonts from Google Fonts (Inter)

---

**Made with ❤️ and React by Abhishek Bajpai**
