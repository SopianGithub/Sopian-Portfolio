# 🚀 Aerospace Portfolio Website

Modern portfolio website dengan tema aerospace untuk fullstack developer, dibangun dengan Next.js 14, Supabase, dan TailwindCSS.

## ✨ Features

- 🎨 **Modern Aerospace Design** - Tema futuristik dengan animasi yang memukau
- 🔐 **Admin Panel** - Content management system untuk admin
- 📱 **Responsive Design** - Optimized untuk semua ukuran layar
- 🌙 **Dark/Light Mode** - Theme switcher dengan smooth transition
- ⚡ **Performance Optimized** - Built dengan Next.js 14 App Router
- 🔍 **SEO Friendly** - Meta tags dan structured data
- 📊 **Analytics Ready** - Siap terintegrasi dengan analytics tools

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS, Shadcn UI, Framer Motion
- **Backend**: Supabase (Database, Auth, Storage)
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd aerospace-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local dengan konfigurasi Supabase Anda
   ```

4. **Setup Supabase**
   - Buat project baru di [Supabase](https://supabase.com)
   - Copy URL dan Anon Key ke `.env.local`
   - Jalankan SQL migrations (lihat `docs/database-setup.md`)

5. **Run development server**
   ```bash
   npm run dev
   ```

   Website akan berjalan di `http://localhost:3000`

## 📁 Project Structure

```
aerospace-portfolio/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reusable components
│   │   ├── ui/             # Shadcn UI components
│   │   ├── layout/         # Layout components
│   │   ├── admin/          # Admin panel components
│   │   └── common/         # Common components
│   ├── lib/                # Utilities and configurations
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles
├── public/                 # Static assets
├── docs/                   # Documentation
└── ...config files
```

## 🔧 Configuration

### Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin
ADMIN_EMAIL=your_admin_email@example.com
```

### Database Schema

Lihat `docs/database-setup.md` untuk detail schema database.

## 📝 Usage

### Admin Panel

1. Login sebagai admin di `/admin/login`
2. Manage projects di `/admin/projects`
3. Manage blog posts di `/admin/blog`
4. Manage experiences di `/admin/experiences`

### Content Management

- **Projects**: Showcase your development projects
- **Blog**: Write technical articles and tutorials
- **Experience**: Display your work history
- **Skills**: Highlight your technical skills

## 🎨 Customization

### Themes

Edit `tailwind.config.ts` untuk mengustomisasi color palette:

```typescript
colors: {
  space: { /* Space theme colors */ },
  cosmic: { /* Cosmic theme colors */ },
}
```

### Components

Semua components menggunakan Shadcn UI dan bisa dikustomisasi di `src/components/ui/`.

## 📖 Documentation

- [Database Setup](docs/database-setup.md)
- [Deployment Guide](docs/deployment.md)
- [Customization Guide](docs/customization.md)
- [API Reference](docs/api-reference.md)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Connect repository ke Vercel
3. Add environment variables
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Shadcn UI](https://ui.shadcn.com/) - UI component library
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

Made with ❤️ for the aerospace community 🚀
