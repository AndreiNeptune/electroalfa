# Electroalfa - Modern Industrial Solutions

A premium, high-performance web platform for **Electroalfa**, built with Next.js, TypeScript, and Sanity CMS. This project showcases industrial equipment, turnkey solutions, and corporate news with a focus on speed, internationalization, and user experience.

## 🏗️ Architecture

- **Framework**: Next.js 14 (App Router)
- **CMS**: Sanity (Headless)
- **Styling**: Tailwind CSS
- **State/Animations**: Framer Motion
- **Types**: TypeScript with Zod validation
- **Internationalization**: Custom i18n routing (`ro`, `en`, `de`, `fr`, `it`)

## 🚀 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)

## 🛠️ Quick Start

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/AndreiNeptune/electroalfa.git
    cd electroalfa
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Copy `.env.example` to `.env.local` and fill in your Sanity credentials.
    ```bash
    cp .env.example .env.local
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

5.  **Open the Studio**:
    Visit `http://localhost:3000/studio` to manage content.

## 📁 Project Structure

- `src/app`: Next.js App Router (pages and layouts)
- `src/components`: Reusable UI components
- `src/lib`: Core logic, Sanity client, i18n configurations
- `src/validations`: Zod schemas for data integrity
- `schemaTypes`: Sanity content schemas

---

Developed by [Andrei Neptune](https://github.com/AndreiNeptune)
