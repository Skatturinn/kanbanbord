import React from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./page.module.css";
import Paths from "@/util/paths";
import { readFilesFromDir } from '@/util/get_folders';
const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  files: any; 
}

export default function RootLayout({
  children, files
}: RootLayoutProps) {
  return (
    <div className={inter.className}>
      <Paths files={files} image="" />
      
        {children}
      
    </div>
  );
}