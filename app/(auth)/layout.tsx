import React from 'react';
import '../globals.css';

import { Navbar } from '@/components/shared/navbar/Navbar';
import Provider from '../provider';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return { children };
}
