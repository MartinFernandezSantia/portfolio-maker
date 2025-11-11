# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features smooth animations with Framer Motion and a functional contact form.

## 🚀 Running Locally

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see your portfolio.

### Customizing Your Portfolio

Edit your personal information in `src/data/userData.ts`:
- About me section
- Projects
- Experience
- Education
- Certifications
- Social links
- Contact information

## 📧 Contact Form Setup

This portfolio uses [FormSubmit](https://formsubmit.co/) for the contact form. **Important setup steps:**

### Before Deployment:

1. Update your email if needed `src/data/userData.ts`:
```typescript
export const contactInfo = {
  email: "your-email@example.com", // Change this to your email
  // ...
};
```

### After Deployment

1. **Create first submission:**
   - Open you portfolio website
   - Fill out and submit the contact form with a test message
   - Check your email inbox for an activation email from FormSubmit
   - **Click the activation link** in the email to activate your form
   - This step is crucial - without activation, you won't receive any contact form submissions

3. **Why this matters:**
   - FormSubmit requires email verification to prevent spam
   - If you don't activate before going live, you'll miss contact form submissions
   - The activation only needs to be done once per email address

## 🌐 Deploying to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub, GitLab, or Bitbucket

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "Add New Project"

4. Import your portfolio repository

5. Configure your project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

6. Click "Deploy"

7. Your portfolio will be live at `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project and deploy

### After Deployment:

1. **Test your contact form on the live site** to ensure FormSubmit is working
2. Set up a custom domain (optional):
   - Go to your project settings in Vercel
   - Navigate to "Domains"
   - Add your custom domain and follow DNS configuration instructions

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Components:** Custom components with Radix UI
- **Forms:** FormSubmit
- **Deployment:** Vercel

## 📝 License

Feel free to use this portfolio template for your personal use.

## 🤝 Support

If you encounter any issues:
- Check that all dependencies are installed
- Ensure you're using Node.js 18 or higher
- Verify your email is correctly configured for FormSubmit
- Check the [Next.js documentation](https://nextjs.org/docs) for framework-specific issues
